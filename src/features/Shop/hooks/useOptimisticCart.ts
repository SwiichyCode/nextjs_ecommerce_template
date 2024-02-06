import { useOptimistic } from 'react';
import type { ProductCart } from '../stores/useCartStore';

export type Action = 'add' | 'increment' | 'decrement' | 'remove';
export type SetOptimisticType = { action: Action; product: ProductCart };
export type SetOptimisticCartFunction = (action: SetOptimisticType) => void;

export const useOptimisticCartWithReducer = (currentCart: ProductCart[]) => {
  const [optimisticCart, setOptimisticCart] = useOptimistic(
    currentCart,
    (state: ProductCart[], { action, product }: SetOptimisticType) => {
      switch (action) {
        case 'add':
          const productInCart = state.find((item) => item.id === product.id);
          if (productInCart) {
            return state.map((item) => {
              if (item.id === product.id) {
                return { ...item, quantity: item.quantity + 1 };
              }
              return item;
            });
          }
          return [...state, { ...product, quantity: 1 }];

        case 'increment':
          return state.map((item) => {
            if (item.id === product.id) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          });

        case 'decrement':
          return state.map((item) => {
            if (item.id === product.id) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          });

        case 'remove':
          return state.filter((item) => item.id !== product.id);
        default:
          return state;
      }
    },
  );

  return [optimisticCart, setOptimisticCart] as const;
};
