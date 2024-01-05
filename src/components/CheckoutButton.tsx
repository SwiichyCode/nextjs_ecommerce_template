"use client";
import { Button } from "@/components/ui/button";

export const CheckoutButton = () => {
  const handleCheckout = async () => {
    try {
      await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: [
            {
              price_data: {
                product_data: {
                  name: "T-shirt",
                },

                currency: "eur",
                unit_amount: 500 * 100,
              },
              quantity: 1,
            },
          ],
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.url);
          if (res.url) {
            window.location.href = res.url;
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return <Button onClick={() => handleCheckout()}>Checkout</Button>;
};
