import { env } from "@/env";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { PRODUCT_URL } from "@/constants/urls";
import CheckoutService from "@/modules/Shop/services/checkout.service";
import MailingService from "@/modules/Shop/services/mailing.service";
import { Prisma } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

// stripe webhook lock event
// stripe webhook idempotency key

const secret = env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature")!;
    const event = stripe.webhooks.constructEvent(body, signature, secret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const customerDetails = session.customer_details;

      if (!session.payment_intent) {
        throw new Error("Payment intent is not defined");
      }

      // if (event.pending_webhooks > 1) {
      //   throw new Error("Webhook is already processing");
      // }

      const idempotency_key = await CheckoutService.getIdempotencyKey({
        sessionId: session.id,
      });

      if (idempotency_key.idempotencyKey) {
        throw new Error("Idempotency key is already defined");
      }

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

    revalidatePath(PRODUCT_URL);

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 404,
      });
    }
    return new NextResponse(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
}
