"use server";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminAction } from "@/lib/safe-actions";
import { deleteProductActionSchema } from "../_schema";
import { PRODUCT_URL } from "@/constants/urls";

export const deleteProduct = adminAction(
  deleteProductActionSchema,
  async (data) => {
    try {
      const { id } = data;
      await db.product.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Error) return { error: error.message };
    }

    revalidatePath(PRODUCT_URL);
    redirect(PRODUCT_URL);
  },
);
