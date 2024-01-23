import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import CartService from "@/modules/Shop/services/cartService";
import ProductList from "@/modules/Shop/components/ProductList";
import ShoppingCart from "@/modules/Shop/components/ShoppingCart";

export default async function ShopPage() {
  const session = await getServerAuthSession();
  const products = await db.product.findMany({
    orderBy: { id: "desc" },
  });

  const cart = session?.user?.id
    ? await CartService.getCart(session.user.id)
    : null;

  return (
    <>
      <ShoppingCart session={session} cart={cart} products={products} />
      <ProductList products={products} />
    </>
  );
}
