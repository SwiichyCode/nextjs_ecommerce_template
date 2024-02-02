import StripeService from "@/modules/payments/stripe/service/stripe.service";
import CheckoutService from "@/features/Shop/services/checkout.service";
import ValidationService from "@/features/Shop/services/validation.service";
import type { Products } from "@/lib/stripe";
import { Session } from "next-auth";

export const StripeCheckout = async (
  request: Request,
  user_session: Session,
) => {
  const { products } = (await request.json()) as { products: Products };

  await ValidationService.checkValidityOfStockBeforeCheckout(products);

  const checkout_session = await StripeService.createCheckoutSession(products);

  if (!checkout_session.metadata) {
    throw new Error("Undefined session metadata");
  }

  const checkout_data = {
    sessionId: checkout_session.id,
    userId: user_session?.user.id,
    sessionUrl: checkout_session.url!,
    productIds: JSON.parse(checkout_session.metadata.product_id!),
    quantities: JSON.parse(checkout_session.metadata.quantity!),
  };

  await CheckoutService.createCheckoutSession(checkout_data);

  return checkout_session;
};
