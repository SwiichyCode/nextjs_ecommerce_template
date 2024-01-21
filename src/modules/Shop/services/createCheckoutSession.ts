import { stripe, type Products } from "@/lib/stripe";
import { env } from "@/env";

export const createCheckoutSession = async (products: Products) => {
  return await stripe.checkout.sessions.create({
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
};
