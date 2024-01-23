import { useOptimistic } from "react";
import type { ProductCart } from "../stores/useCartStore";

export const useOptimisticCart = (currentCart: ProductCart[]) => {
  const [optimisticCart, setOptimisticCart] = useOptimistic(
    currentCart,
    (state: ProductCart[], newCart: ProductCart[]) => {
      const newCartIds = newCart.map((item) => item.id);

      return newCartIds.length > state.map((item) => item.id).length
        ? newCart
        : state.filter((item) => newCartIds.includes(item.id));
    },
  );

  return [optimisticCart, setOptimisticCart] as const;
};
