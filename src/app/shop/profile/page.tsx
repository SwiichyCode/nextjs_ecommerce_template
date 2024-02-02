import { OrderHistory } from "@/features/Shop/components/OrderHistory";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";

export default async function ShopProfile() {
  const session = await getServerAuthSession();

  const orders = await db.order.findMany({
    where: { userId: session?.user.id },
    orderBy: { id: "desc" },

    include: {
      orderItem: {
        include: {
          product: true,
        },
      },
    },
  });

  return <OrderHistory orders={orders} />;
}
