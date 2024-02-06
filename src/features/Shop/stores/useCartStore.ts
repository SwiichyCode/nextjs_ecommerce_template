import type { Product } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartState = {
  open: boolean;
  close: () => void;
  toggle: () => void;
};

export const useCartState = create<CartState>((set) => ({
  open: false,
  close: () => set({ open: false }),
  toggle: () => set((state) => ({ open: !state.open })),
}));

export interface ProductCart extends Product {
  quantity: number;
}

type CartStore = {
  cart: ProductCart[];
  add: (product: Product) => void;
  remove: (product: Product) => void;
  clear: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [] as ProductCart[],
      add: (product: Product) =>
        set((state) => {
          const productExists = state.cart.find((p) => p.id === product.id);

          if (productExists) {
            // If product exists in the cart, increment its quantity
            return {
              cart: state.cart.map((p) =>
                p.id === product.id
                  ? { ...p, quantity: (p.quantity || 1) + 1 }
                  : p,
              ),
            };
          } else {
            // If product doesn't exist in the cart, add it with quantity 1
            return { cart: [...state.cart, { ...product, quantity: 1 }] };
          }
        }),
      remove: (product: Product) =>
        set((state) => ({
          cart: state.cart.filter((p) => p.id !== product.id),
        })),

      clear: () => set({ cart: [] }),
    }),
    {
      name: 'cart-store',
    },
  ),
);
