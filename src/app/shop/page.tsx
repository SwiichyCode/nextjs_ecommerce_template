import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { ProductList } from "@/modules/Shop/components/ProductList";
import { ContextOptimisticWrapper } from "@/modules/Shop/components/ContextOptimisticWrapper";
import { transformCartData } from "@/modules/Shop/utils/transformCartData";
import CheckoutService from "@/modules/Shop/services/checkout.service";

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
  const a = await CheckoutService.getIdempotencyKey({
    sessionId:
      "cs_test_a1OsywgEvXdjsMLZYUtND6M1rIoj2jN5G0baG2Ob753GbHL9TWviA9KDS6",
  });

  console.log(a);

  return (
    <>
      <ContextOptimisticWrapper session={session} cart={currentCart} />
      <ProductList products={products} />
    </>
  );
}
