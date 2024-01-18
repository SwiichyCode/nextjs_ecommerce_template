import { db } from "@/server/db";

export const replenishProductStock = async (
  product_ids: number[],
  quantities: number[],
) => {
  if (!Array.isArray(product_ids)) {
    product_ids = [product_ids];
  }

  if (!Array.isArray(quantities)) {
    quantities = [quantities];
  }

  const products = await db.product.findMany({
    where: { id: { in: product_ids } },
  });

  if (products.length !== product_ids.length) {
    throw new Error("product not found");
  }

  await Promise.all(
    product_ids.map((product_id: number, i: number) =>
      db.product.update({
        where: { id: product_id },
        data: { stock: { increment: quantities[i] } },
      }),
    ),
  );
};
