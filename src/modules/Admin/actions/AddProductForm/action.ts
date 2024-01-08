"use server";
import type * as z from "zod";
import { actionSchema } from "./schema";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";

type Inputs = z.infer<typeof actionSchema>;

export const addProduct = async ({
  data,
  imagesUrls,
}: {
  data?: Inputs;
  imagesUrls?: string[];
}) => {
  try {
    const session = await getServerAuthSession();
    if (session && session.user.role !== "admin")
      throw new Error("Unauthorized");

    const { name, description, price, stock, weight } =
      actionSchema.parse(data);

    await db.product.create({
      data: {
        name,
        description,
        price,
        stock,
        pictures: imagesUrls,
        weight,
      },
    });

    revalidatePath("/admin/products");

    return {
      status: "success",
      message: "Produit ajouté avec succès",
    };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }
};
