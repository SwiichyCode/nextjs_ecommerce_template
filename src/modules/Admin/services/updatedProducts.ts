import { db } from "@/server/db";
import { Product } from "@prisma/client";

export const updatedProducts = async () => {
  const products = await db.product.findMany();
  const checkoutSessions = await db.checkoutSession.findMany();

  const updatedProducts: Product[] = products.map((product) => {
    const sessionsForProduct = checkoutSessions.filter((session) =>
      session.productIds.includes(product.id),
    );
    const totalQuantityOrdered = sessionsForProduct.reduce(
      (total, session) =>
        total + session.quantities[session.productIds.indexOf(product.id)]!,
      0,
    );
    return { ...product, stock: product.stock - totalQuantityOrdered };
  });

  return updatedProducts;
};
