import { env } from "@/env";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import type { Products } from "@/lib/stripe";

export const POST = async (request: Request) => {
  const { products } = (await request.json()) as { products: Products };

  const session = await stripe.checkout.sessions.create({
    line_items: products,
    mode: "payment",
    payment_method_types: ["card", "paypal"],
    metadata: {
      product_id: JSON.stringify(
        products.map(
          (product) => product.price_data?.product_data?.metadata?.product_id,
        ),
      ),
      quantity: JSON.stringify(
        products.map(
          (product) => product.price_data?.product_data?.metadata?.quantity,
        ),
      ),
    },

    success_url: env.NEXT_PUBLIC_STRIPE_SUCCESS_URL,
    cancel_url: env.NEXT_PUBLIC_STRIPE_CANCEL_URL,
  });

  return NextResponse.json({ url: session.url });
};
