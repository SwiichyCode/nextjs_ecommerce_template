"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminAction } from "@/lib/safe-actions";
import { db } from "@/server/db";
import {
  addProductActionSchema,
  deleteProductActionSchema,
  updateProductActionSchema,
  updateProductStatusActionSchema,
} from "./_schema";
import { PRODUCT_URL } from "@/constants/urls";

type Variant = {
  name: string;
  values: {
    name: string;
    price: string;
    stock: string;
  }[];
};

export const addProduct = adminAction(addProductActionSchema, async (data) => {
  try {
    const { name, description, pictures, price, stock, weight } = data;

    const variants: Variant[] = data.variants;

    await db.product.create({
      data: {
        name,
        description,
        price,
        stock,
        pictures,
        weight,
        variants: {
          create: variants.map((variant) => {
            const { name, values } = variant;

            return {
              name,
              optionValues: {
                create: values.map((value) => {
                  const { name, price, stock } = value;

                  return {
                    value: name,
                    price: parseInt(price),
                    stock: parseInt(stock),
                  };
                }),
              },
            };
          }),
        },
      },
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
