"use client";

import type { ResponseData } from "@/lib/types";
import { useCartStore } from "@/modules/Shop/stores/useCartStore";

export const CheckoutButton = () => {
  const { cart } = useCartStore();

  const handleCheckout = async () => {
    try {
      await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: cart.map((product) => ({
            price_data: {
              product_data: {
                name: product.name,
                images: [product.pictures[0]],
              },
              currency: "eur",
              unit_amount: product.price * 100,
            },
            quantity: product.quantity,
          })),
        }),
      })
        .then((res) => res.json())
        .then((res: ResponseData) => {
          if (res.url) {
            window.location.href = res.url;
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
    >
      Checkout
    </button>
  );
};
