"use server";

import { db } from "@/server/db";

export const isProductAvailable = async (productId: number) => {
  try {
    const product = await db.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("product is not defined");
    }

    const isAvailable = product.stock > 0;

    return isAvailable;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
};
