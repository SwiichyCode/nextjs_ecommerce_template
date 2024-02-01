import { env } from "@/env";
import { Session } from "next-auth";
import { StripeCheckout } from "./stripe/stripe.checkout";

export const checkoutHandler = async (
  request: Request,
  user_session: Session,
) => {
  switch (env.PAYMENT_SERVICE) {
    case "stripe":
      return await StripeCheckout(request, user_session);
  }
};
