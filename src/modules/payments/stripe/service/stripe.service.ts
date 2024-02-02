import axios from "axios";
import request from "axios";
import { stripe, type Products } from "@/lib/stripe";
import type { ProductCart } from "../../../../features/Shop/stores/useCartStore";
import { API_CHECKOUT_URL } from "@/constants/urls";
import { env } from "@/env";

type CheckoutProduct = {
  price_data: {
    product_data: {
      name: string;
      images: (string | undefined)[];
      metadata: {
        product_id: number;
        quantity: number;
      };
    };
    currency: string;
    unit_amount: number;
  };
  quantity: number;
};

type CheckoutResponse = {
  url: string;
};

export class StripeService {
  static async getPaymentIntent(paymentIntentId: string) {
    return await stripe.paymentIntents.retrieve(paymentIntentId);
  }

  static async getPaymentMethod(paymentIntentId: string) {
    const paymentIntent = await this.getPaymentIntent(paymentIntentId);
    return await stripe.paymentMethods.retrieve(
      paymentIntent.payment_method as string,
    );
  }

  static async handleCheckoutSession(cart: ProductCart[]) {
    try {
      const products: CheckoutProduct[] = cart.map((product) => ({
        price_data: {
          product_data: {
            name: product.name,
            images: [product.pictures[0]],
            metadata: {
              product_id: product.id,
              quantity: product.quantity,
            },
          },
          currency: "eur",
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      }));

      const { data } = await axios.post<CheckoutResponse>(API_CHECKOUT_URL, {
        products,
      });

      if (!data) throw new Error("No data returned from checkout session");

      window.location.href = data.url;
      return { data };
    } catch (err) {
      if (request.isAxiosError(err)) {
        return { error: err.response?.data };
      }
    }
  }

  static async createCheckoutSession(products: Products) {
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
        env.NEXT_PUBLIC_STRIPE_SUCCESS_URL +
        "?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: env.NEXT_PUBLIC_STRIPE_CANCEL_URL,
    });
  }
}

export default StripeService;
