import { db } from "@/server/db";
import { Header } from "@/modules/Admin/components/Header";
import { ButtonHistoryBack } from "@/modules/Admin/components/ButtonHistoryBack";
import { ProductForm } from "@/modules/Admin/actions/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  console.log(product);
  return (
    <>
      <Header>
        <div className="flex items-center gap-4">
          <ButtonHistoryBack />
          <h1 className="text-3xl font-bold">Editer votre produit</h1>
        </div>
      </Header>
      <ProductForm product={product} asEdit />
    </>
  );
}
