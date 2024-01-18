import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { stripe } from "@/lib/stripe";
import { db } from "@/server/db";
import { env } from "@/env";
import { PRODUCT_URL } from "@/constants/urls";
import { updateProductStock } from "@/modules/Shop/services/updateProductStock";

const secret = env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature")!;
    const event = stripe.webhooks.constructEvent(body, signature, secret);

    if (event.type === "checkout.session.completed") {
      const metadata = event.data.object.metadata;

      if (!metadata) {
        throw new Error("metadata is not defined");
      }

      const product_ids: number[] = JSON.parse(metadata.product_id!);
      const quantities: number[] = JSON.parse(metadata.quantity!);

      await updateProductStock(product_ids, quantities);
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
