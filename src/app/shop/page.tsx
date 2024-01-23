import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import CartService from "@/modules/Shop/services/cartService";

import ProductList from "@/modules/Shop/components/ProductList";

import { transformCart } from "@/modules/Shop/utils/transformCart";
import { ContextOptimisticWrapper } from "@/modules/Shop/components/ContextOptimisticWrapper";

export default async function ShopPage() {
  const session = await getServerAuthSession();
  const products = await db.product.findMany({
    orderBy: { id: "desc" },
  });

  const cart = session?.user?.id
    ? await CartService.getCart(session.user.id)
    : null;

  const currentCart = transformCart(cart, products);

  return (
    <>
      <ContextOptimisticWrapper session={session} cart={currentCart} />
      <ProductList products={products} />
    </>
  );
}
