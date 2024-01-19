import { db } from "@/server/db";

export const createOrder = async (
  userId: string,
  productIds: number[],
  quantities: number[],
) => {
  await db.order.create({
    data: {
      userId,
      productIds,
      quantities,
    },
  });
};
