import { stripe } from "@/lib/stripe";
import { paymentColumns } from "@/modules/Admin/components/PaymentsDataTable/columns";
import { DataTable } from "@/modules/Admin/components/ProductsDataTable";
import { Header } from "@/modules/Admin/components/layouts/Header";

export default async function PaymentsPage() {
  const payments = await stripe.paymentIntents.list({
    limit: 100,
  });

  return (
    <>
      <Header>
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>
        </div>
      </Header>
      <div className="mx-auto w-full max-w-5xl space-y-8 px-14">
        <DataTable
          data={payments.data}
          columns={paymentColumns}
          asRowLink
          route={"payments"}
          withPagination
        />
      </div>
    </>
  );
}
