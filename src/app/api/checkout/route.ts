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
    success_url: `https://${env.NEXTAUTH_URL}/success`,
    cancel_url: `https://${env.NEXTAUTH_URL}`,
  });

  return NextResponse.json({ url: session.url });
};
