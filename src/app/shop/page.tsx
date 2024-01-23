import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import Header from "@/modules/Shop/components/Header";
import ProductList from "@/modules/Shop/components/ProductList";
import ShoppingCart from "@/modules/Shop/components/ShoppingCart";

export default async function ShopPage() {
  const session = await getServerAuthSession();
  const products = await db.product.findMany({
    orderBy: { id: "desc" },
  });

  const cart = session?.user?.id
    ? await db.cart.findUnique({
        where: { userId: session.user.id },
      })
    : null;

  return (
    <>
      <Header session={session} cart={cart} />
      <ShoppingCart session={session} cart={cart} products={products} />
      <ProductList products={products} />
    </>
  );
}
