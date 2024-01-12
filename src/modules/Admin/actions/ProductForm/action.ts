"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminAction } from "@/lib/safe-actions";
import { db } from "@/server/db";

import { createProduct } from "../../services/productQuery";
import {
  addProductActionSchema,
  deleteProductActionSchema,
  updateProductActionSchema,
  updateProductStatusActionSchema,
} from "./schema";
import { PRODUCT_URL } from "@/constants/urls";

export const addProduct = adminAction(addProductActionSchema, async (data) => {
  try {
    const { name, description, pictures, price, stock, weight } = data;

    await createProduct({
      name,
      description,
      price,
      stock,
      pictures,
      weight,
    });
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
      const { id, name, description, pictures, price, stock, weight } = data;

      await db.product.update({
        where: { id },
        data: {
          name,
          description,
          price,
          stock,
          pictures,
          weight,
        },
      });
    } catch (error) {
      if (error instanceof Error) return { error: error.message };
    }

    revalidatePath(PRODUCT_URL);
    redirect(PRODUCT_URL);
  },
);

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
