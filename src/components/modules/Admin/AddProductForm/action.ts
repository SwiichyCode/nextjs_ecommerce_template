"use server";
import * as z from "zod";
import { formSchema } from "./schema";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";

type Inputs = z.infer<typeof formSchema>;

export const addProduct = async (data: Inputs) => {
  try {
    const session = await getServerAuthSession();
    if (session?.user.role !== "admin") throw new Error("Unauthorized");

    const { name, description, price, stock, pictures } =
      formSchema.parse(data);

    await db.product.create({
      data: {
        name,
        description,
        price,
        stock,
        pictures,
      },
    });

    revalidatePath("/admin");

    return {
      status: "success",
      message: "Produit ajouté avec succès",
    };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }
};
