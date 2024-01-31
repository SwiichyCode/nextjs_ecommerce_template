"use client";
import type Stripe from "stripe";
import type { ColumnDef } from "@tanstack/react-table";
import { cn, formatNumber } from "@/lib/utils";
import { getPaymentMethodIcons } from "../../utils/getPaymentMethodIcons";
import { formatCurrency } from "../../utils/formatCurrency";
import { handleStatusColor } from "../../utils/handleStatusColor";

// PaymentIntent.Status

export const paymentColumns: ColumnDef<Stripe.PaymentIntent>[] = [
  {
    accessorKey: "amount",
    header: "Amount",

    cell: ({ row }) => {
      const { amount, currency, status } = row.original;
      const uppercaseCurrency = currency.toLocaleUpperCase();

      return (
        <div className="mr-4 flex items-center space-x-4">
          <span>
            {formatNumber(amount)} {formatCurrency(uppercaseCurrency)}
          </span>

          <span className="font-light">{uppercaseCurrency}</span>

          <div
            className={cn(handleStatusColor(status), "mr-4 bg-opacity-30 p-1")}
          >
            <span className="text-xs capitalize">{status}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "payment_method_types",
    header: "Payment Method",
    cell: ({ row }) => {
      const { payment_method_types } = row.original;
      const paymentMethodIcons = getPaymentMethodIcons(payment_method_types);

      return <div>{paymentMethodIcons}</div>;
    },
  },
  {
    accessorKey: "id",
    header: "Description",
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => {
      const { created } = row.original;

      return <span>{new Date(created * 1000).toLocaleString()}</span>;
    },
  },
];
