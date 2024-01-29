import OrderSummaries from "@/modules/Shop/components/OrderSummaries";
import CheckoutService from "@/modules/Shop/services/checkout.service";
import { StripeService } from "@/modules/Shop/services/stripe.service";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const order = await CheckoutService.getOrder({
    sessionId: searchParams.session_id,
  });

  if (!order) {
    return <div>Order not found</div>;
  }

  const paymentMethod = await StripeService.getPaymentMethod(
    order.paymentIntentId,
  );

  return <OrderSummaries order={order} paymentMethod={paymentMethod} />;
}
