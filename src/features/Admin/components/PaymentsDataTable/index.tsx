"use client";
import { useEffect } from "react";
import { DataTable } from "@/features/Admin/components/ProductsDataTable";
import { usePaymentsTabsStore } from "../../stores/usePaymentsTabsStore";
import { paymentColumns } from "./columns";
import { calculatePaymentsStateLength } from "../../utils/calculatePaymentsStateLength";
import type Stripe from "stripe";

type Props = {
  payments: Stripe.PaymentIntent[];
};

export const PaymentsDataTable = ({ payments }: Props) => {
  const { tab, setLength } = usePaymentsTabsStore();

  const filteredPayments = payments.filter((payment) => {
    if (tab === "all") return true;
    return payment.status === tab;
  });

  useEffect(() => {
    const lengths = calculatePaymentsStateLength(payments);
    setLength(lengths);
  }, [payments, setLength]);

  return (
    <DataTable
      data={filteredPayments}
      columns={paymentColumns}
      asRowLink
      route={"payments"}
      withPagination
    />
  );
};
