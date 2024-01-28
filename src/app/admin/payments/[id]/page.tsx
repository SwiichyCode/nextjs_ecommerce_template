import { stripe } from "@/lib/stripe";
import CheckoutService from "@/modules/Shop/services/checkoutService";

// TODO
// 1. Implement products object in order same as in cart

// {
//     id: 1,
//     userId: 'clrwt3stj0000pzvkc8f71bau',
//     sessionId: 'cs_test_a1YVWue90B1x6emx0qppGc26ZrZHKLakPT0jxV0MiSPsLZaWRTD9jXafsl',
//     paymentIntentId: 'pi_3OdN7YCD0pd84tGO1ysDyoUl',
//     productIds: [ 1 ],
//     quantities: [ 1 ],
//     status: 'PROCESSING',
//     createdAt: 2024-01-28T01:25:18.891Z,
//     updatedAt: 2024-01-28T01:25:18.891Z,
//     customerInformationId: 1
// }

export default async function PaymentPage({
  params,
}: {
  params: { id: string };
}) {
  const { products, order } = await CheckoutService.getOrderInformations({
    paymentIntentId: params.id,
  });
  const paymentIntent = await stripe.paymentIntents.retrieve(params.id);
  const paymentMethod = await stripe.paymentMethods.retrieve(
    paymentIntent.payment_method as string,
  );

  console.log(products, order);

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-14">PaymentPage</div>
  );
}
