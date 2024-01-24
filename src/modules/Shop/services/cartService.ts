import { db } from "@/server/db";

type AddToCartType = {
  userId: string;
  products: { productId: number; quantity: number }[];
};

class CartService {
  static async addToCart({ userId, products }: AddToCartType) {
    const cart = await db.cart.upsert({
      where: { userId: userId },
      update: {},
      create: {
        userId: userId,
      },
    });

    for (const product of products) {
      await db.cartItem.create({
        data: {
          quantity: product.quantity,
          productId: product.productId,
          cartId: cart.id,
        },
      });
    }
  }

  static async removeCartItem(userId: string, productId: number) {
    await db.cartItem.deleteMany({
      where: {
        cart: {
          userId,
        },
        productId,
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
