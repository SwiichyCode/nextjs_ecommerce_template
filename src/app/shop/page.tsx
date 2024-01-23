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
  const cart = await db.cart.findFirst({
    where: { userId: session?.user?.id },
  });

  return (
    <>
      <Header session={session} />
      <ShoppingCart session={session} cart={cart} products={products} />
      <ProductList products={products} />
    </>
  );
}
