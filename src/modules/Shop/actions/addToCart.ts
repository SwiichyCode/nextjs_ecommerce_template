"use server";

import { revalidatePath } from "next/cache";
import CartService from "../services/cartService";

type AddToCartType = {
  userId: string;
  products: { productId: number; quantity: number }[];
};

export const addToCart = async ({ userId, products }: AddToCartType) => {
  try {
    await CartService.addToCart({
      userId,
      products,
    });
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }

  revalidatePath("/shop");
};
