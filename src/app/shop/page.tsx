import { db } from "@/server/db";
import { ProductList } from "@/features/Shop/components/ProductList";

export default async function ShopPage() {
  const products = await db.product.findMany({
    orderBy: { id: "desc" },
  });

  return <ProductList products={products} />;
}
