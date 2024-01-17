import axios from "axios";
import type { ProductCart } from "../stores/useCartStore";
import { API_CHECKOUT_URL } from "@/constants/urls";

type CheckoutProduct = {
  price_data: {
    product_data: {
      name: string;
      images: (string | undefined)[];
    };
    currency: string;
    unit_amount: number;
  };
  quantity: number;
};

type CheckoutResponse = {
  url: string;
};

export const checkoutSession = async (cart: ProductCart[]) => {
  try {
    const products: CheckoutProduct[] = cart.map((product) => ({
      price_data: {
        product_data: {
          name: product.name,
          images: [product.pictures[0]],
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
  } catch (error) {
    throw error;
  }
};
