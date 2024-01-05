import Stripe from "stripe";
import { env } from "@/env";

if (!env.NEXT_PUBLIC_STRIPE_SECRET_KEY)
  throw new Error("process.env.STRIPE_SECRET_KEY not found");

export const stripe = new Stripe(env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
  typescript: true,
});

export type Products = Stripe.Checkout.SessionCreateParams.LineItem[];
