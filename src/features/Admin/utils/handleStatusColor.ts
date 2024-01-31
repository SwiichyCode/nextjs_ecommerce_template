import type Stripe from "stripe";

export const handleStatusColor = (status: Stripe.PaymentIntent.Status) => {
  switch (status) {
    case "succeeded":
      return "bg-green-200 text-green-500";
    case "processing":
      return "bg-yellow-200 text-yellow-500";
    case "requires_payment_method":
      return "bg-red-200 text-red-500";
    case "requires_confirmation":
      return "bg-blue-200 text-blue-500";
    case "requires_action":
      return "bg-purple-200 text-purple-500";
    case "requires_capture":
      return "bg-pink-200 text-pink-500";
    case "canceled":
      return "bg-gray-200 text-gray-500";
    default:
      return "bg-gray-200 text-gray-500";
  }
};
