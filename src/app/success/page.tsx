import OrderSummaries from "@/modules/Shop/components/OrderSummaries";
import CheckoutService from "@/modules/Shop/services/checkoutService";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const { products, order } = await CheckoutService.getOrderInformations(
    searchParams?.session_id as string,
  );

  return <OrderSummaries products={products} order={order} />;
}
