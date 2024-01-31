import OrderSummaries from "@/features/Shop/components/OrderSummaries";
import CheckoutService from "@/features/Shop/services/checkout.service";
import { StripeService } from "@/modules/payments/stripe/service/stripe.service";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  if (!searchParams.session_id) {
    return <div>Invalid session id</div>;
  }

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
