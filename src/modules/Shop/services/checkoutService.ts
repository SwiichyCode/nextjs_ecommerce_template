import { db } from "@/server/db";

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
  ) {
    await db.order.create({
      data: {
        userId,
        sessionId,
        productIds,
        quantities,
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
}

export default CheckoutService;
