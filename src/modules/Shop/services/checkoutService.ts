import { db } from "@/server/db";
import Stripe from "stripe";

type ProductStock = {
  productIds: number[];
  quantities: number[];
};

type CreateCheckoutSessionType = ProductStock & {
  sessionId: string;
  userId: string;
  sessionUrl: string;
};

type CreateOrderType = ProductStock & {
  sessionId: string;
  userId: string;
  customerInformationId: number;
};

class CheckoutService {
  static async createCheckoutSession(
    checkoutSessionData: CreateCheckoutSessionType,
  ) {
    await db.checkoutSession.create({
      data: checkoutSessionData,
    });
  }

  static async createOrder(orderData: CreateOrderType) {
    await db.order.create({
      data: orderData,
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

  static async getOrderInformations(sessionId: string) {
    const order = await db.order.findFirst({
      where: {
        sessionId: sessionId,
      },

      include: {
        customerInformation: true,
      },
    });

    const products = await db.product.findMany({
      where: {
        id: {
          in: order?.productIds.map((product) => product),
        },
      },
    });

    return { products, order };
  }

  static async processCheckoutSession({
    sessionId,
    customer_name,
    customer_address,
  }: {
    sessionId: string;
    customer_name: string;
    customer_address: Stripe.Address;
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

    const order = {
      sessionId: checkout_session.sessionId,
      userId: checkout_session.userId,
      productIds: checkout_session.productIds,
      quantities: checkout_session.quantities,
      customerInformationId: customer_information.id,
    };

    await this.createOrder(order);

    await this.updateProductStock(
      checkout_session.productIds,
      checkout_session.quantities,
    );

    await this.removeCheckoutSession(sessionId);
  }
}

export default CheckoutService;
