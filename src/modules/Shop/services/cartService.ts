import { db } from "@/server/db";

type AddToCartType = {
  userId: string;
  productIds: number[];
};

class CartService {
  static async addToCart({ userId, productIds }: AddToCartType) {
    await db.cart.upsert({
      where: { userId: userId },
      update: {
        productIds: {
          push: productIds,
        },
      },
      create: {
        userId: userId,
        productIds: productIds,
      },
    });
  }

  static async getCart(userId: string) {
    return await db.cart.findUnique({
      where: {
        userId,
      },
    });
  }

  // static async removeItemFromCart(userId: string, productId: number) {}

  static async removeItemFromCart(userId: string, productId: number) {
    const cart = await db.cart.findUnique({
      where: {
        userId,
      },
    });

    if (!cart) return;

    const productIds = cart.productIds.filter((id) => id !== productId);

    await db.cart.update({
      where: {
        userId,
      },
      data: {
        productIds,
      },
    });
  }

  static async removeCart(userId: string) {
    await db.cart.delete({
      where: {
        userId,
      },
    });
  }
}

export default CartService;
