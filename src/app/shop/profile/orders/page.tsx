import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { OrderHistory } from "@/features/Shop/components/OrderHistory";

export default async function OrdersPage() {
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
  return <OrderHistory session={session} orders={orders} />;
}
