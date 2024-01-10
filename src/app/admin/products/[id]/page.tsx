import { db } from "@/server/db";
import { Header } from "@/modules/Admin/components/Header";
import { ButtonHistoryBack } from "@/modules/Admin/components/ButtonHistoryBack";
import { ProductForm } from "@/modules/Admin/actions/ProductForm/ProductForm";
import { ProductDeleteForm } from "@/modules/Admin/actions/ProductForm/ProductDeleteForm";
import { ProductStatusForm } from "@/modules/Admin/actions/ProductForm/ProductStatusForm";

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

  return (
    <>
      <Header>
        <div className="flex items-center gap-4">
          <ButtonHistoryBack />
          <h1 className="text-3xl font-bold">Editer votre produit</h1>
        </div>
        <ProductDeleteForm id={product!.id} />
      </Header>
      <div className="mx-auto flex w-full max-w-5xl items-start justify-between px-14">
        <ProductForm product={product} asEdit />
        <ProductStatusForm product={product} />
      </div>
    </>
  );
}
