"use server";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { adminAction } from "@/lib/safe-actions";
import { updateProductStatusActionSchema } from "../_schema";
import { PRODUCT_URL } from "@/constants/urls";

export const updateStatus = adminAction(
  updateProductStatusActionSchema,
  async (data) => {
    try {
      const { id, status } = data;

      await db.product.update({
        where: { id },
        data: {
          status,
        },
      });
    } catch (error) {
      if (error instanceof Error) return { error: error.message };
    }

    revalidatePath(PRODUCT_URL);
  },
);
