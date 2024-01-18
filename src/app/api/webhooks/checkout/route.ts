import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { db } from "@/server/db";
import { env } from "@/env";

const secret = env.STRIPE_WEBHOOK_SECRET!;

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

      let product_ids: number[] = JSON.parse(metadata.product_id!);
      let quantities: number[] = JSON.parse(metadata.quantity!);

      if (!Array.isArray(product_ids)) {
        product_ids = [product_ids];
      }

      if (!Array.isArray(quantities)) {
        quantities = [quantities];
      }

      const products = await db.product.findMany({
        where: { id: { in: product_ids } },
      });

      if (products.length !== product_ids.length) {
        throw new Error("product not found");
      }

      await Promise.all(
        product_ids.map((product_id: number, i: number) =>
          db.product.update({
            where: { id: product_id },
            data: { stock: { decrement: quantities[i] } },
          }),
        ),
      );
    }

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
