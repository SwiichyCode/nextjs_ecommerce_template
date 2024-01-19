import { db } from "@/server/db";

export const createCheckoutSession = async (
  sessionId: string,
  userId: string,
  productIds: number[],
  quantities: number[],
) => {
  await db.checkoutSession.create({
    data: {
      sessionId,
      userId,
      productIds,
      quantities,
    },
  });
};
