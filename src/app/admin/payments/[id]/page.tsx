import { stripe } from "@/lib/stripe";

//pm_1ObbPdCD0pd84tGOSjqUuQvG

export default async function PaymentPage({
  params,
}: {
  params: { id: string };
}) {
  const paymentIntent = await stripe.paymentIntents.retrieve(params.id);
  const paymentMethod = await stripe.paymentMethods.retrieve(
    paymentIntent.payment_method as string,
  );

  console.log(paymentIntent);
  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-14">PaymentPage</div>
  );
}
