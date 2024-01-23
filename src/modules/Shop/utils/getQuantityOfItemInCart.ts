import type { Cart } from "@prisma/client";

export const getQuantityOfItemInCart = (cart: Cart | null) => {
  if (!cart) return {};

  return cart.productIds.reduce(
    (acc, productId) => {
      acc[productId] = (acc[productId] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
};
