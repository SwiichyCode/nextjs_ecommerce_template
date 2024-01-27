import type Stripe from "stripe";

type Lengths = {
  all: number;
  succeeded: number;
  canceled: number;
};

export const calculatePaymentsStateLength = (
  payments: Stripe.PaymentIntent[],
): Lengths => {
  const lengths: Lengths = { all: 0, succeeded: 0, canceled: 0 };

  payments.forEach((payment) => {
    lengths.all++;
    if (payment.status === "succeeded") lengths.succeeded++;
    if (payment.status === "canceled") lengths.canceled++;
  });

  return lengths;
};
