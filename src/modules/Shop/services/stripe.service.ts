import { stripe } from "@/lib/stripe";

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
}
