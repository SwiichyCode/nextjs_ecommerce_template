import { db } from "@/server/db";
import CartService from "./cart.service";
import type {
  createCheckoutSessionType,
  removeCheckoutSessionType,
  createCustomerInformationType,
  createOrderItemType,
  createOrderType,
  findCheckoutSessionType,
  getOrderType,
  processCheckoutSessionType,
  updateProductStockType,
} from "../types/checkoutservice.type";
import { xor } from "@/lib/utils";
import { generateRandomOrderNumber } from "../utils/generateRandomString";

class CheckoutService {
  static async createCheckoutSession(data: createCheckoutSessionType) {
    return await db.checkoutSession.create({
      data,
    });
  }

  static async findCheckoutSession(data: findCheckoutSessionType) {
    if (!data.sessionId) {
      throw new Error("Session ID is required");
    }
    const session = await db.checkoutSession.findUnique({
      where: {
        sessionId: data.sessionId,
      },
    });
    return session;
  }

  static async removeCheckoutSession(data: removeCheckoutSessionType) {
    if (!data.sessionId) {
      throw new Error("Session ID is required");
    }

    await db.checkoutSession.delete({
      where: {
        sessionId: data.sessionId,
      },
    });
  }

  static async updateProductStock(data: updateProductStockType) {
    if (!Array.isArray(data.productIds) || !Array.isArray(data.quantities)) {
      throw new Error("Product IDs and quantities must be arrays");
    }

    if (data.productIds.length !== data.quantities.length) {
      throw new Error("Product IDs and quantities must have the same length");
    }

    const products = await db.product.findMany({
      where: { id: { in: data.productIds } },
    });

    if (products.length !== data.productIds.length) {
      throw new Error("product not found");
    }

    await db.$transaction(
      data.productIds.map((product_id: number, i: number) =>
        db.product.update({
          where: { id: product_id },
          data: { stock: { decrement: data.quantities[i] } },
        }),
      ),
    );
  }

  static getOrder(data: getOrderType) {
    if (
      !xor(data.sessionId === undefined, data.paymentIntentId === undefined)
    ) {
      throw new Error("Either sessionId or paymentIntentId is required");
    }

    return db.order.findFirst({
      where: {
        sessionId: data.sessionId, // Use session ID for success page
        paymentIntentId: data.paymentIntentId, // Use payment intent ID for webhook
      },
      include: {
        orderItem: {
          include: {
            product: true,
          },
        },
        customerInformation: true,
      },
    });
  }

  static async createOrder(data: createOrderType) {
    return await db.order.create({
      data,
    });
  }

  static async createOrderItem(data: createOrderItemType) {
    return await db.orderItem.create({
      data,
    });
  }

  static async createCustomerInformation(data: createCustomerInformationType) {
    return await db.customerInformation.create({
      data,
    });
  }

  static async getIdempotencyKey(data: { sessionId: string }) {
    try {
      const { idempotencyKey } = await db.order.findFirstOrThrow({
        where: {
          sessionId: data.sessionId,
        },

        select: {
          idempotencyKey: true,
        },
      });

      return idempotencyKey;
    } catch (error) {
      console.log(error);
    }
  }

  static async processCheckoutSession(data: processCheckoutSessionType) {
    const checkout_session = await this.findCheckoutSession({
      sessionId: data.sessionId,
    });

    if (!checkout_session) {
      throw new Error("checkout_session is not defined");
    }

    const customer_information = await this.createCustomerInformation({
      name: data.customer_name,
      addressLine1: data.customer_address.line1! || "",
      addressLine2: data.customer_address.line2! || "",
      city: data.customer_address.city! || "",
      state: data.customer_address.state! || "",
      postalCode: data.customer_address.postal_code! || "",
      country: data.customer_address.country! || "",
    });

    const order = await this.createOrder({
      sessionId: checkout_session.sessionId,
      userId: checkout_session.userId,
      orderNumber: generateRandomOrderNumber(8),
      paymentIntentId: data.paymentIntentId,
      idempotencyKey: data.idempotencyKey,
      customerInformationId: customer_information.id,
      amountTotal: data.amount_total,
    });

    for (let i = 0; i < checkout_session.productIds.length; i++) {
      await this.createOrderItem({
        orderId: order.id,
        productId: checkout_session.productIds[i]!,
        quantity: checkout_session.quantities[i]!,
      });
    }

    await this.updateProductStock({
      productIds: checkout_session.productIds,
      quantities: checkout_session.quantities,
    });

    await this.removeCheckoutSession({
      sessionId: data.sessionId,
    });

    await CartService.removeCart(checkout_session.userId);
  }
}

export default CheckoutService;
