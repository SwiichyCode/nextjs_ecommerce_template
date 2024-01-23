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

  // static async removeItemFromCart(userId: string, productId: number) {}
}

export default CartService;
