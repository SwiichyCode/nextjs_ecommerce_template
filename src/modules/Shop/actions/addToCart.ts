"use server";

import { revalidatePath } from "next/cache";
import CartService from "../services/cartService";

type AddToCartType = {
  userId: string;
  productIds: number[];
  quantities: number[];
};

export const addToCart = async ({
  userId,
  productIds,
  quantities,
}: AddToCartType) => {
  try {
    await CartService.addToCart({
      userId,
      productIds,
      quantities,
    });
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }

  revalidatePath("/shop");
};
