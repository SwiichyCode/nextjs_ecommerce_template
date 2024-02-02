import React, { PropsWithChildren } from "react";
import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { ContextOptimisticWrapper } from "@/features/Shop/components/ContextOptimisticWrapper";
import { transformCartData } from "@/features/Shop/utils/transformCartData";

export default async function ShopLayout({ children }: PropsWithChildren) {
  const session = await getServerAuthSession();

  const cart = session
    ? await db.cart.findMany({
        where: { userId: session?.user?.id },
        include: { cartItems: { include: { product: true } } },
      })
    : [];

  const currentCart = transformCartData(cart[0]?.cartItems ?? []);

  return (
    <>
      <ContextOptimisticWrapper session={session} cart={currentCart}>
        {children}
      </ContextOptimisticWrapper>
    </>
  );
}
