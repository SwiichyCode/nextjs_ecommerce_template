import { db } from "@/server/db";
import CartService from "./cart.service";
import type Stripe from "stripe";

type ProductStock = {
  productIds: number[];
  quantities: number[];
};

type CreateCheckoutSessionType = ProductStock & {
  sessionId: string;
  userId: string;
  sessionUrl: string;
};

class CheckoutService {
  // createCheckoutSession.test.ts
  static async createCheckoutSession(
    checkoutSessionData: CreateCheckoutSessionType,
  ) {
    // Change checkoutSession Model && implement Products relation
    return await db.checkoutSession.create({
      data: checkoutSessionData,
    });
  }

  static async findCheckoutSession(sessionId: string) {
    if (!sessionId) {
      throw new Error("Session ID is required");
    }
    const session = await db.checkoutSession.findUnique({
      where: {
        sessionId,
      },
    });
    return session;
  }

  static async removeCheckoutSession(sessionId: string) {
    if (!sessionId) {
      throw new Error("Session ID is required");
    }

    await db.checkoutSession.delete({
      where: {
        sessionId,
      },
    });
  }

  static async replenishProductStock(
    product_ids: number[],
    quantities: number[],
  ) {
    if (!Array.isArray(product_ids) || !Array.isArray(quantities)) {
      throw new Error("Product IDs and quantities must be arrays");
    }

    if (product_ids.length !== quantities.length) {
      throw new Error("Product IDs and quantities must have the same length");
    }

    const products = await db.product.findMany({
      where: { id: { in: product_ids } },
    });

    if (products.length !== product_ids.length) {
      throw new Error("product not found");
    }

    await db.$transaction(
      product_ids.map((product_id: number, i: number) =>
        db.product.update({
          where: { id: product_id },
          data: { stock: { increment: quantities[i] } },
        }),
      ),
    );
  }

  static async updateProductStock(product_ids: number[], quantities: number[]) {
    if (!Array.isArray(product_ids) || !Array.isArray(quantities)) {
      throw new Error("Product IDs and quantities must be arrays");
    }

    if (product_ids.length !== quantities.length) {
      throw new Error("Product IDs and quantities must have the same length");
    }

    const products = await db.product.findMany({
      where: { id: { in: product_ids } },
    });

    if (products.length !== product_ids.length) {
      throw new Error("product not found");
    }

    await db.$transaction(
      product_ids.map((product_id: number, i: number) =>
        db.product.update({
          where: { id: product_id },
          data: { stock: { decrement: quantities[i] } },
        }),
      ),
    );
  }

  static async getOrder({
    sessionId, // Use session ID for success page
    paymentIntentId, // Use payment intent ID for admin payment page
  }: {
    sessionId?: string;
    paymentIntentId?: string;
  }) {
    return await db.order.findFirst({
      where: {
        sessionId: sessionId ?? undefined, // Use session ID for success page
        paymentIntentId: paymentIntentId ?? undefined, // Use payment intent ID for admin payment page
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

  static async processCheckoutSession({
    sessionId,
    paymentIntentId,
    customer_name,
    customer_address,
    amount_total,
  }: {
    sessionId: string;
    paymentIntentId: string;
    customer_name: string;
    customer_address: Stripe.Address;
    amount_total: number;
  }) {
    const checkout_session = await this.findCheckoutSession(sessionId);

    if (!checkout_session) {
      throw new Error("checkout_session is not defined");
    }

    const customer_information = await db.customerInformation.create({
      data: {
        name: customer_name,
        addressLine1: customer_address.line1! || "",
        addressLine2: customer_address.line2! || "",
        city: customer_address.city! || "",
        state: customer_address.state! || "",
        postalCode: customer_address.postal_code! || "",
        country: customer_address.country! || "",
      },
    });

    const order = await db.order.create({
      data: {
        sessionId: checkout_session.sessionId,
        userId: checkout_session.userId,
        paymentIntentId: paymentIntentId,
        customerInformationId: customer_information.id,
        amountTotal: amount_total,
      },
    });

    for (let i = 0; i < checkout_session.productIds.length; i++) {
      await db.orderItem.create({
        data: {
          orderId: order.id,
          productId: checkout_session.productIds[i]!,
          quantity: checkout_session.quantities[i]!,
        },
      });
    }

    await this.updateProductStock(
      checkout_session.productIds,
      checkout_session.quantities,
    );

    await this.removeCheckoutSession(sessionId);
    await CartService.removeCart(checkout_session.userId);
  }
}

export default CheckoutService;
