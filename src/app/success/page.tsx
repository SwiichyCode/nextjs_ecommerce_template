import OrderSummaries from "@/modules/Shop/components/OrderSummaries";
import CheckoutService from "@/modules/Shop/services/checkoutService";
import { db } from "@/server/db";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const order = await db.order.findFirst({
    where: {
      sessionId: searchParams?.session_id as string,
    },
  });

  console.log(order);

  return <OrderSummaries />;
}
