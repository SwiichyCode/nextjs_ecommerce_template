import { env } from "@/env";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { updateProductStock } from "@/modules/Shop/services/updateProductStock";
import { PRODUCT_URL } from "@/constants/urls";
import { createCheckoutSession } from "@/modules/Shop/services/createCheckoutSession";
import { getServerAuthSession } from "@/server/auth";
import type { Products } from "@/lib/stripe";

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
    success_url: env.NEXT_PUBLIC_STRIPE_SUCCESS_URL,
    cancel_url: env.NEXT_PUBLIC_STRIPE_CANCEL_URL,
  });

  if (!checkout_session.metadata) {
    throw new Error("session is not defined");
  }

  const product_ids: number[] = JSON.parse(
    checkout_session.metadata.product_id!,
  );
  const quantities: number[] = JSON.parse(checkout_session.metadata.quantity!);

  await updateProductStock(product_ids, quantities);
  await createCheckoutSession(
    checkout_session.id,
    user_session?.user.id!,
    product_ids,
    quantities,
  );

  revalidatePath(PRODUCT_URL);

  return NextResponse.json({ url: checkout_session.url });
};
