"use client";
import { Header } from "@/modules/Shop/components/HeaderWithContext";
import { ShoppingCart } from "@/modules/Shop/components/ShoppingCartWithContext";
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
