import { db } from "@/server/db";
import { env } from "@/env";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { replenishProductStock } from "@/modules/Shop/services/replenishProductStock";
import { sendConfirmationEmail } from "@/modules/Shop/services/sendConfirmationEmail";
import { PRODUCT_URL } from "@/constants/urls";
import { createOrder } from "@/modules/Shop/services/createOrder";
import { removeCheckoutSession } from "@/modules/Shop/services/removeCheckoutSession";

const secret = env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature")!;
    const event = stripe.webhooks.constructEvent(body, signature, secret);

    if (event.type === "checkout.session.completed") {
      const currentSessionId = event.data.object.id;
      const session = await db.checkoutSession.findUnique({
        where: { sessionId: currentSessionId },
      });

      if (!session) {
        throw new Error("session is not defined");
      }

      await createOrder(session.userId, session.productIds, session.quantities);

      const customerEmail = event.data.object.customer_details?.email;
      await sendConfirmationEmail(customerEmail!);
    }

    if (
      event.type === "checkout.session.expired" ||
      event.type === "checkout.session.async_payment_failed"
    ) {
      const currentSessionId = event.data.object.id;

      const session = await db.checkoutSession.findUnique({
        where: { sessionId: currentSessionId },
      });

      if (!session) {
        throw new Error("session is not defined");
      }

      await replenishProductStock(session.productIds, session.quantities);
      await removeCheckoutSession(currentSessionId);
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
