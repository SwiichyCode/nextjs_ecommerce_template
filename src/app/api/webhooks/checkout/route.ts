import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { stripe } from "@/lib/stripe";
import { env } from "@/env";
import { PRODUCT_URL } from "@/constants/urls";
import { db } from "@/server/db";
import { replenishProductStock } from "@/modules/Shop/services/replenishProductStock";
import sgMail from "@sendgrid/mail";

const secret = env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature")!;
    const event = stripe.webhooks.constructEvent(body, signature, secret);

    if (event.type === "checkout.session.completed") {
      const customerEmail = event.data.object.customer_details?.email;

      if (!customerEmail) {
        throw new Error("customer email is not defined");
      }

      sgMail.setApiKey(env.SENDGRID_API_KEY);

      const sendGridMail = {
        to: customerEmail,
        from: "adlpromail@gmail.com",
        templateId: "d-02f898f01b25485dae091e2be668b10f",

        // Impletement dynamic template data
      };

      await sgMail.send(sendGridMail);
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
