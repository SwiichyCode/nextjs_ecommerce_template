"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminAction } from "@/lib/safe-actions";
import { deleteProductActionSchema } from "../action_schema";
import ProductQuery from "../../services/productQuery";
import { PRODUCT_URL } from "@/constants/urls";

export const deleteProduct = adminAction(
  deleteProductActionSchema,
  async (data) => {
    try {
      await ProductQuery.deleteProduct(data);
    } catch (error) {
      if (error instanceof Error) return { error: error.message };
    }

    revalidatePath(PRODUCT_URL);
    redirect(PRODUCT_URL);
  },
);
