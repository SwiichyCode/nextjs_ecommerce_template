import { findProduct } from "@/modules/Admin/services/findProduct";

export default async function PreviewProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await findProduct(Number(params.id));

  return <div>page</div>;
}
