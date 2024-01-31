import { StripeCheckout } from "./stripe/stripe";
import { Session } from "next-auth";
import { env } from "@/env";

export const checkoutHandler = async (
  request: Request,
  user_session: Session,
) => {
  switch (env.PAYMENT_SERVICE) {
    case "stripe":
      return await StripeCheckout(request, user_session);
  }
};
