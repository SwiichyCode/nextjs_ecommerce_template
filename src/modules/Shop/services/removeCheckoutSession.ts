import { db } from "@/server/db";

export const removeCheckoutSession = async (sessionId: string) => {
  await db.checkoutSession.delete({
    where: {
      sessionId,
    },
  });
};
