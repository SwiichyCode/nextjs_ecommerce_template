import { env } from "@/env";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { sendConfirmationEmail } from "@/modules/Shop/services/sendConfirmationEmail";
import { PRODUCT_URL } from "@/constants/urls";
import { createOrder } from "@/modules/Shop/services/createOrder";
import { removeCheckoutSession } from "@/modules/Shop/services/removeCheckoutSession";
import { findCheckoutSession } from "@/modules/Shop/services/findCheckoutSession";
import { updateProductStock } from "@/modules/Shop/services/updateProductStock";

const secret = env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature")!;
    const event = stripe.webhooks.constructEvent(body, signature, secret);

    if (event.type === "checkout.session.completed") {
      const checkout_session = await findCheckoutSession(event.data.object.id);

      if (!checkout_session) {
        throw new Error("checkout_session is not defined");
      }

      await updateProductStock(
        checkout_session.productIds,
        checkout_session.quantities,
      );

      await createOrder(
        checkout_session.userId,
        checkout_session.productIds,
        checkout_session.quantities,
      );

      const customerEmail = event.data.object.customer_details?.email;
      await sendConfirmationEmail(customerEmail!);
    }

    if (
      event.type === "checkout.session.expired" ||
      event.type === "checkout.session.async_payment_failed"
    ) {
      const checkout_session = await findCheckoutSession(event.data.object.id);

      if (!checkout_session) {
        throw new Error("checkout_session is not defined");
      }

      await removeCheckoutSession(event.data.object.id);
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
