import { db } from "@/server/db";
import Stripe from "stripe";

class CheckoutService {
  static async createCheckoutSession(
    sessionId: string,
    userId: string,
    sessionUrl: string,
    productIds: number[],
    quantities: number[],
  ) {
    await db.checkoutSession.create({
      data: {
        sessionId,
        userId,
        sessionUrl,
        productIds,
        quantities,
      },
    });
  }

  static async createOrder(
    userId: string,
    sessionId: string,
    productIds: number[],
    quantities: number[],
    customerInformationId: number,
  ) {
    await db.order.create({
      data: {
        userId,
        sessionId,
        productIds,
        quantities,
        customerInformationId,
      },
    });
  }

  static async findCheckoutSession(sessionId: string) {
    const session = await db.checkoutSession.findUnique({
      where: {
        sessionId,
      },
    });
    return session;
  }

  static async removeCheckoutSession(sessionId: string) {
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
    if (!Array.isArray(product_ids)) {
      product_ids = [product_ids];
    }

    if (!Array.isArray(quantities)) {
      quantities = [quantities];
    }

    const products = await db.product.findMany({
      where: { id: { in: product_ids } },
    });

    if (products.length !== product_ids.length) {
      throw new Error("product not found");
    }

    await Promise.all(
      product_ids.map((product_id: number, i: number) =>
        db.product.update({
          where: { id: product_id },
          data: { stock: { increment: quantities[i] } },
        }),
      ),
    );
  }

  static async updateProductStock(product_ids: number[], quantities: number[]) {
    if (!Array.isArray(product_ids)) {
      product_ids = [product_ids];
    }

    if (!Array.isArray(quantities)) {
      quantities = [quantities];
    }

    const products = await db.product.findMany({
      where: { id: { in: product_ids } },
    });

    if (products.length !== product_ids.length) {
      throw new Error("product not found");
    }

    await Promise.all(
      product_ids.map((product_id: number, i: number) =>
        db.product.update({
          where: { id: product_id },
          data: { stock: { decrement: quantities[i] } },
        }),
      ),
    );
  }

  static async getProductsFromOrder(sessionId: string) {
    const order = await db.order.findFirst({
      where: {
        sessionId: sessionId,
      },
    });

    const products = await db.product.findMany({
      where: {
        id: {
          in: order?.productIds.map((product) => product),
        },
      },
    });

    return products;
  }

  static async processCheckoutSession({
    sessionId,
    customer_name,
    customer_address,
  }: {
    sessionId: string;
    customer_name: string;
    customer_address?: Stripe.Address;
  }) {
    const checkout_session = await this.findCheckoutSession(sessionId);

    if (!checkout_session) {
      throw new Error("checkout_session is not defined");
    }

    const customer_information = await db.customerInformation.create({
      data: {
        name: customer_name,
        addressLine1: customer_address?.line1!,
        addressLine2: customer_address?.line2!,
        city: customer_address?.city!,
        state: customer_address?.state!,
        postalCode: customer_address?.postal_code!,
        country: customer_address?.country!,
      },
    });

    await this.createOrder(
      checkout_session.userId,
      checkout_session.sessionId,
      checkout_session.productIds,
      checkout_session.quantities,
      customer_information.id,
    );

    await this.updateProductStock(
      checkout_session.productIds,
      checkout_session.quantities,
    );

    await this.removeCheckoutSession(sessionId);
  }
}

export default CheckoutService;
