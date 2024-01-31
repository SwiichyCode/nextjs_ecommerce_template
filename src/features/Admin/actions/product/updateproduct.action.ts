"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminAction } from "@/lib/safe-actions";
import { updateProductActionSchema } from "./updateproduct.schema";
import ProductService from "@/features/Admin/services/productService";
import { PRODUCT_URL } from "@/constants/urls";

export const updateProduct = adminAction(
  updateProductActionSchema,
  async (data) => {
    try {
      await ProductService.updateProduct(data);
    } catch (error) {
      if (error instanceof Error) return { error: error.message };
    }

    revalidatePath(PRODUCT_URL);
    redirect(PRODUCT_URL);
  },
);
