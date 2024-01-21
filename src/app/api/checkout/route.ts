import { env } from "@/env";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { PRODUCT_URL } from "@/constants/urls";
import { getServerAuthSession } from "@/server/auth";
import type { Products } from "@/lib/stripe";
import CheckoutService from "@/modules/Shop/services/checkoutService";

export const POST = async (request: Request) => {
  const { products } = (await request.json()) as { products: Products };

  const user_session = await getServerAuthSession();

  const checkout_session = await stripe.checkout.sessions.create({
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
    expires_at: Math.floor(Date.now() / 1000) + 60 * 30,

    success_url:
      env.NEXT_PUBLIC_STRIPE_SUCCESS_URL + "?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: env.NEXT_PUBLIC_STRIPE_CANCEL_URL,
  });

  if (!checkout_session.metadata) {
    throw new Error("session is not defined");
  }

  if (!user_session?.user) throw new Error("user is not defined");

  const checkout_data = {
    sessionId: checkout_session.id,
    userId: user_session.user.id,
    sessionUrl: checkout_session.url!,
    productIds: JSON.parse(checkout_session.metadata.product_id!),
    quantities: JSON.parse(checkout_session.metadata.quantity!),
  };

  await CheckoutService.createCheckoutSession(checkout_data);

  revalidatePath(PRODUCT_URL);

  return NextResponse.json({ url: checkout_session.url });
};
