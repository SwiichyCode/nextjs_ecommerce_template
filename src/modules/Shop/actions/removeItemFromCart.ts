"use server";

type RemoveItemToCart = {
  userId: string;
  productId: number;
};

export const removeItemFromCart = async ({
  userId,
  productId,
}: RemoveItemToCart) => {};
