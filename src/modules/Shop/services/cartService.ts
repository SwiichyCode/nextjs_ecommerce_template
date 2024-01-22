import { db } from "@/server/db";

type AddToCartType = {
  userId: string;
  productIds: number[];
  quantities: number[];
};

class CartService {
  static async addToCart({ userId, productIds, quantities }: AddToCartType) {
    return await db.cart.create({
      data: {
        userId,
        productIds,
        quantities,
      },
    });
  }

  static async removeItemFromCart(userId: string, productId: number) {}
}

export default CartService;
