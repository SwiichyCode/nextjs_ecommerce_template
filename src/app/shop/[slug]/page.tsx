import { ProductOverview } from "@/features/Shop/components/ProductOverview";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const session = await getServerAuthSession();
  const product = await db.product.findFirst({
    where: { slug: params.slug },
  });

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductOverview session={session} product={product} />;
}
