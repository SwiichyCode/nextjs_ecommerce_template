import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { ProductList } from "@/modules/Shop/components/ProductList";
import { ContextOptimisticWrapper } from "@/modules/Shop/components/ContextOptimisticWrapper";
import { transformCartData } from "@/modules/Shop/utils/transformCartData";

export default async function ShopPage() {
  const session = await getServerAuthSession();
  const products = await db.product.findMany({
    orderBy: { id: "desc" },
  });

  const cart = session
    ? await db.cart.findMany({
        where: { userId: session?.user?.id },
        include: { cartItems: { include: { product: true } } },
      })
    : [];

  const currentCart = transformCartData(cart[0]?.cartItems ?? []);

  return (
    <>
      <ContextOptimisticWrapper session={session} cart={currentCart} />
      <ProductList products={products} />
    </>
  );
}
