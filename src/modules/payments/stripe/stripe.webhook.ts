import { env } from "@/env";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { v4 as uuidv4 } from "uuid";

import CheckoutService from "@/features/Shop/services/checkout.service";
import MailingService from "@/features/Shop/services/mailing.service";

const secret = env.STRIPE_WEBHOOK_SECRET;

export const StripeWebhook = async (request: Request) => {
  const body = await request.text();
  const signature = headers().get("stripe-signature")!;
  const event = stripe.webhooks.constructEvent(body, signature, secret);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const customerDetails = session.customer_details;

    if (!session.payment_intent) {
      throw new Error("Payment intent is not defined");
    }

    const idempotencyKey = await CheckoutService.getIdempotencyKey({
      sessionId: session.id,
    });

    // Check if webhook is already processing
    if (!idempotencyKey) {
      // Fix case if not a physical product
      if (customerDetails?.name && customerDetails?.address) {
        await CheckoutService.processCheckoutSession({
          sessionId: session.id, // Session ID
          paymentIntentId: session.payment_intent as string, // Payment intent ID
          idempotencyKey: uuidv4(), // Idempotency key
          customer_name: customerDetails.name, // Customer name
          customer_address: customerDetails.address, // Customer address
          amount_total: session.amount_total!, // Order total amount
        });
      }
    } else {
      throw new Error("Webhook is already processing");
    }

    // Send order confirmation email
    const customerEmail = event.data.object.customer_details?.email;
    await MailingService.sendOrderConfirmationEmail(customerEmail!);
  }

  if (
    event.type === "checkout.session.expired" ||
    event.type === "checkout.session.async_payment_failed"
  ) {
    const checkout_session = await CheckoutService.findCheckoutSession({
      sessionId: event.data.object.id,
    });

    if (!checkout_session) {
      throw new Error("checkout_session is not defined");
    }

    await CheckoutService.removeCheckoutSession({
      sessionId: checkout_session.sessionId,
    });
  }

  return event;
};
