"use server";
import type * as z from "zod";
import { actionSchema } from "./schema";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { PRODUCT_URL } from "@/constants/urls";

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

    revalidatePath(PRODUCT_URL);

    return {
      status: "success",
      message: "Produit ajouté avec succès",
    };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }
};

export const updateProduct = async ({
  id,
  data,
  imagesUrls,
}: {
  id: number;
  data?: Inputs;
  imagesUrls?: string[];
}) => {
  try {
    const session = await getServerAuthSession();
    if (session && session.user.role !== "admin")
      throw new Error("Unauthorized");

    const { name, description, price, stock, weight } =
      actionSchema.parse(data);

    await db.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        stock,
        pictures: imagesUrls,
        weight,
      },
    });

    revalidatePath(PRODUCT_URL);

    return {
      status: "success",
      message: "Produit modifié avec succès",
    };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }
};

export const deleteProduct = async ({ id }: { id: number }) => {
  try {
    const session = await getServerAuthSession();
    if (session && session.user.role !== "admin")
      throw new Error("Unauthorized");

    await db.product.delete({ where: { id } });

    revalidatePath(PRODUCT_URL);

    return {
      status: "success",
      message: "Produit supprimé avec succès",
    };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }
};

export const updateStatus = async ({
  id,
  status,
}: {
  id: number;
  status: "active" | "draft";
}) => {
  try {
    const session = await getServerAuthSession();
    if (session && session.user.role !== "admin")
      throw new Error("Unauthorized");

    await db.product.update({
      where: { id },
      data: {
        status,
      },
    });

    revalidatePath(PRODUCT_URL);

    return {
      status: "success",
      message: "Statut modifié avec succès",
    };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }
};
