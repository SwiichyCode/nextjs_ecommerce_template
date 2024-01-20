import { env } from "@/env";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { PRODUCT_URL } from "@/constants/urls";
import CheckoutService from "@/modules/Shop/services/checkoutService";
import MailingService from "@/modules/Shop/services/mailingService";

const secret = env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature")!;
    const event = stripe.webhooks.constructEvent(body, signature, secret);

    if (event.type === "checkout.session.completed") {
      await CheckoutService.processCheckoutSession(event.data.object.id);

      const customerEmail = event.data.object.customer_details?.email;
      await MailingService.sendOrderConfirmationEmail(customerEmail!);
    }

    if (
      event.type === "checkout.session.expired" ||
      event.type === "checkout.session.async_payment_failed"
    ) {
      const checkout_session = await CheckoutService.findCheckoutSession(
        event.data.object.id,
      );

      if (!checkout_session) {
        throw new Error("checkout_session is not defined");
      }

      await CheckoutService.removeCheckoutSession(event.data.object.id);
    }

    revalidatePath(PRODUCT_URL);

    return NextResponse.json({ result: event, ok: true });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        message: "something went wrong",
        ok: false,
      },
      { status: 500 },
    );
  }
}
