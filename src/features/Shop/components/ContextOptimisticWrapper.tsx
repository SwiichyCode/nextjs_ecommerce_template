"use client";
import { Header } from "@/features/Shop/components/Header";
import { ShoppingCart } from "@/features/Shop/components/ShoppingCart";
import type { Session } from "next-auth";
import type { ProductCart } from "../stores/useCartStore";
import { CartProvider } from "./CartContext";
import React from "react";

type Props = {
  session: Session | null;
  cart: ProductCart[];
  children: React.ReactNode;
};

export const ContextOptimisticWrapper = ({
  session,
  cart,
  children,
}: Props) => {
  return (
    <CartProvider cart={cart}>
      <Header session={session} />
      <ShoppingCart session={session} />
      {children}
    </CartProvider>
  );
};
