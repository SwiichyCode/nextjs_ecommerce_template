import type { CartItemWithProduct } from "../components/ShoppingCart";
import type { ProductCart } from "../stores/useCartStore";

export const transformCartData = (
  cartItems: CartItemWithProduct[],
): ProductCart[] => {
  return cartItems.map((item) => ({
    ...item.product,
    quantity: item.quantity,
  }));
};
