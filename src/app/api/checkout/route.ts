import { env } from "@/env";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { products } = await request.json();

  const session = await stripe.checkout.sessions.create({
    line_items: products,
    mode: "payment",
    payment_method_types: ["card", "paypal"],
    success_url: `${env.NEXTAUTH_URL}/success`,
    cancel_url: `${env.NEXTAUTH_URL}`,
  });

  return NextResponse.json({ url: session.url });
};
