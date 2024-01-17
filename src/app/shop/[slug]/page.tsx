import { ProductOverview } from "@/modules/Shop/components/ProductOverview";
import { db } from "@/server/db";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await db.product.findMany({
    where: { slug: params.slug },
    // include: {
    //   variants: {
    //     include: {
    //       optionValues: true,
    //     },
    //   },
    // },
  });

  console.log(product);

  return <ProductOverview product={product} />;
}
