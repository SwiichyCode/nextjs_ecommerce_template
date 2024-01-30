import { db } from "@/server/db";
import type { z } from "zod";
import type { addProductActionSchema } from "../actions/cart/addproduct.schema";

class CartService {
  static async addToCart(data: z.infer<typeof addProductActionSchema>) {
    const { userId, products } = data;

    return db.$transaction(async (transaction) => {
      const cart = await transaction.cart.upsert({
        where: { userId: userId },
        update: {},
        create: {
          userId: userId,
        },
      });

      const productUpdates = products.map(async (product) => {
        const existingProduct = await transaction.cartItem.findFirst({
          where: {
            cartId: cart.id,
            productId: product.productId,
          },
        });

        if (existingProduct) {
          return transaction.cartItem.update({
            where: {
              id: existingProduct.id,
            },
            data: {
              quantity: existingProduct.quantity + product.quantity,
            },
          });
        } else {
          return transaction.cartItem.create({
            data: {
              quantity: product.quantity,
              productId: product.productId,
              cartId: cart.id,
            },
          });
        }
      });

      return Promise.all(productUpdates);
    });
  }

  static async updateCartItemQuantity(
    userId: string,
    productId: number,
    quantity: number,
  ) {
    await db.cartItem.updateMany({
      where: {
        cart: {
          userId,
        },
        productId,
      },
      data: {
        quantity,
      },
    });
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
