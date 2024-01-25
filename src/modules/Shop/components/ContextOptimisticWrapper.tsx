"use client";
import { Header } from "@/modules/Shop/components/Header";
import { ShoppingCart } from "@/modules/Shop/components/ShoppingCart";
import type { Session } from "next-auth";
import type { ProductCart } from "../stores/useCartStore";
import { CartProvider } from "./CartContext";

type Props = {
  session: Session | null;
  cart: ProductCart[];
};

export const ContextOptimisticWrapper = ({ session, cart }: Props) => {
  return (
    <CartProvider cart={cart}>
      <Header session={session} />
      <ShoppingCart session={session} />
    </CartProvider>
  );
};
