import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import CartService from "@/modules/Shop/services/cartService";

import ProductList from "@/modules/Shop/components/ProductList";

// import { transformCart } from "@/modules/Shop/utils/transformCart";
import { ContextOptimisticWrapper } from "@/modules/Shop/components/ContextOptimisticWrapper";
import { Header } from "@/modules/Shop/components/Header";
import { ShoppingCart } from "@/modules/Shop/components/ShoppingCart";

export default async function ShopPage() {
  const session = await getServerAuthSession();
  const products = await db.product.findMany({
    orderBy: { id: "desc" },
  });

  // const cart = session?.user?.id
  //   ? await CartService.getCart(session.user.id)
  //   : null;

  // const currentCart = transformCart(cart, products);

  const cart = await db.cart.findMany({
    where: { userId: session?.user?.id },
    include: { cartItems: { include: { product: true } } },
  });

  return (
    <>
      {/* <ContextOptimisticWrapper session={session} cart={currentCart} /> */}
      <Header session={session} />
      <ShoppingCart session={session} cart={cart} />
      <ProductList products={products} />
    </>
  );
}
