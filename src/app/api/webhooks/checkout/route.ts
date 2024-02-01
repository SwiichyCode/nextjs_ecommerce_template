import { env } from "@/env";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { ADMIN_URL, PRODUCT_URL } from "@/constants/urls";
import CheckoutService from "@/features/Shop/services/checkout.service";
import MailingService from "@/features/Shop/services/mailing.service";
import { Prisma } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { webhookHandler } from "@/modules/payments/webhookHandler";
import { paymentErrorHandler } from "@/modules/payments/paymentErrorHandler";

// const secret = env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: Request) {
  try {
    const event = await webhookHandler(request);
    revalidatePath(ADMIN_URL);

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    paymentErrorHandler(error);

    return new NextResponse(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
}
