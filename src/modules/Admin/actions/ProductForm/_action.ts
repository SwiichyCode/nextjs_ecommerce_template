"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminAction } from "@/lib/safe-actions";
import {
  productActionSchema,
  updateProductActionSchema,
} from "../action_schema";
import ProductQuery from "@/modules/Admin/services/productQuery";
import { PRODUCT_URL } from "@/constants/urls";

export const addProduct = adminAction(productActionSchema, async (data) => {
  try {
    await ProductQuery.createProduct(data);
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }

  revalidatePath(PRODUCT_URL);
  redirect(PRODUCT_URL);
});

export const updateProduct = adminAction(
  updateProductActionSchema,
  async (data) => {
    try {
      await ProductQuery.updateProduct(data);
    } catch (error) {
      if (error instanceof Error) return { error: error.message };
    }

    revalidatePath(PRODUCT_URL);
    redirect(PRODUCT_URL);
  },
);
