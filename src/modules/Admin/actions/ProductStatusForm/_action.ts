"use server";
import { revalidatePath } from "next/cache";
import { adminAction } from "@/lib/safe-actions";
import { updateProductStatusActionSchema } from "../action_schema";
import ProductQuery from "../../services/productQuery";
import { PRODUCT_URL } from "@/constants/urls";

export const updateStatus = adminAction(
  updateProductStatusActionSchema,
  async (data) => {
    try {
      await ProductQuery.updateProductStatus(data);
    } catch (error) {
      if (error instanceof Error) return { error: error.message };
    }

    revalidatePath(PRODUCT_URL);
  },
);
