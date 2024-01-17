import axios from "axios";
import { ProductCart } from "../stores/useCartStore";

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

    const { data } = await axios.post("/api/checkout", {
      products,
    });

    if (!data) throw new Error("No data returned from checkout session");

    window.location.href = data.url;
  } catch (error) {
    throw error;
  }
};
