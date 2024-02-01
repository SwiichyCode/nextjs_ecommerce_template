import { env } from "@/env";
import { StripeWebhook } from "./stripe/stripe.webhook";

export const webhookHandler = async (request: Request) => {
  switch (env.PAYMENT_SERVICE) {
    case "stripe":
      return await StripeWebhook(request);
  }
};
