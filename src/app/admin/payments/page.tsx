import { stripe } from "@/lib/stripe";
import { PaymentsDataTable } from "@/modules/Admin/components/PaymentsDataTable";
import { PaymentsTabs } from "@/modules/Admin/components/PaymentsTabs";

export default async function PaymentsPage() {
  const payments = await stripe.paymentIntents.list({
    limit: 100,
  });

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-14">
      <PaymentsTabs />
      <PaymentsDataTable payments={payments.data} />
    </div>
  );
}
