import { db } from "@/server/db";

export const findCheckoutSession = async (sessionId: string) => {
  const session = await db.checkoutSession.findUnique({
    where: {
      sessionId,
    },
  });
  return session;
};
