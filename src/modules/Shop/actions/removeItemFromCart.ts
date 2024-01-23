"use server";

import { getServerAuthSession } from "@/server/auth";
import { revalidatePath } from "next/cache";
import CartService from "../services/cartService";

type RemoveItemToCart = {
  productId: number;
};

export const removeItemFromCart = async ({ productId }: RemoveItemToCart) => {
  try {
    const session = await getServerAuthSession();
    if (!session) return;

    await CartService.removeItemFromCart(session.user.id, productId);
  } catch (error) {
    console.error(error);
  }
  revalidatePath("/shop");
};
