"use server";

import CartService from "@/features/Shop/services/cart.service";
import { revalidatePath } from "next/cache";
import { userAction } from "@/lib/safe-actions";
import { removeProductActionSchema } from "./removeproduct.schema";
import { SHOP_URL } from "@/constants/urls";

export const removeProduct = userAction(
  removeProductActionSchema,
  async ({ productId }, ctx) => {
    try {
      await CartService.removeCartItem(ctx.userId!, productId);
    } catch (error) {
      if (error instanceof Error) return { error: error.message };
    }

    revalidatePath(SHOP_URL);
  },
);
