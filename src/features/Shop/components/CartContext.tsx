import React, { createContext, useContext } from "react";
import {
  useOptimisticCartWithReducer,
  type SetOptimisticType,
} from "../hooks/useOptimisticCart";
import type { ProductCart } from "../stores/useCartStore";

// Créer le contexte
const CartContext = createContext<
  readonly [ProductCart[], (action: SetOptimisticType) => void] | null
>(null);

// Créer le provider
export const CartProvider: React.FC<{
  cart: ProductCart[];
  children: React.ReactNode;
}> = ({ cart, children }) => {
  const optimisticCart = useOptimisticCartWithReducer(cart);
  return (
    <CartContext.Provider value={optimisticCart}>
      {children}
    </CartContext.Provider>
  );
};

// Créer le hook personnalisé pour utiliser le contexte
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
