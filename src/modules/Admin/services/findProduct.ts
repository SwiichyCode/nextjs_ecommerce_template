import { db } from "@/server/db";

export const findProduct = async (id: number) => {
  const product = await db.product.findUnique({
    where: { id },
  });

  return product;
};
