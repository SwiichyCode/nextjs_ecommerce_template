"use server";

import { getServerAuthSession } from "@/server/auth";
import { revalidatePath } from "next/cache";
import CartService from "../services/cartService";

export const removeCartItem = async (productId: number) => {
  try {
    const session = await getServerAuthSession();
    if (!session) return;

    await CartService.removeCartItem(session.user.id, productId);

    // await CartService.removeItemFromCart(session.user.id, productId);
  } catch (error) {
    console.error(error);
  }
  revalidatePath("/shop");
};
