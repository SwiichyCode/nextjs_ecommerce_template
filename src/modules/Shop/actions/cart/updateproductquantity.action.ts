"use server";
import { revalidatePath } from "next/cache";
import CartService from "../../services/cart.service";
import { userAction } from "@/lib/safe-actions";
import { updateProductQuantityActionSchema } from "./updateproductquantity.schema";

export const updateProductQuantity = userAction(
  updateProductQuantityActionSchema,
  async ({ productId, quantity }, ctx) => {
    try {
      await CartService.updateCartItemQuantity(
        ctx.userId!,
        productId,
        quantity,
      );
    } catch (error) {
      if (error instanceof Error) return { error: error.message };
    } finally {
      revalidatePath("/shop");
    }
  },
);
