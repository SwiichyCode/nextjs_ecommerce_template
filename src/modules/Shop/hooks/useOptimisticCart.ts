import { useOptimistic } from "react";
import type { ProductCart } from "../stores/useCartStore";

export type Action = "add" | "remove";
export type SetOptimisticType = { action: Action; product: ProductCart };
export type SetOptimisticCartFunction = (action: SetOptimisticType) => void;

export const useOptimisticCartWithReducer = (currentCart: ProductCart[]) => {
  const [optimisticCart, setOptimisticCart] = useOptimistic(
    currentCart,
    (state: ProductCart[], { action, product }: SetOptimisticType) => {
      switch (action) {
        case "add":
          return [...state, product];
        case "remove":
          return state.filter((item) => item.id !== product.id);
        default:
          return state;
      }
    },
  );

  return [optimisticCart, setOptimisticCart] as const;
};
