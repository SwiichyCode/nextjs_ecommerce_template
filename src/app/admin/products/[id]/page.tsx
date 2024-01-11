import { Header } from "@/modules/Admin/components/Header";
import { ButtonHistoryBack } from "@/modules/Admin/components/ButtonHistoryBack";
import { ProductForm } from "@/modules/Admin/actions/ProductForm/ProductForm";
import { ProductDeleteForm } from "@/modules/Admin/actions/ProductForm/ProductDeleteForm";
import { ProductStatusForm } from "@/modules/Admin/actions/ProductForm/ProductStatusForm";
import { findProduct } from "@/modules/Admin/services/findProduct";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await findProduct(Number(params.id));

  return (
    <>
      <Header>
        <div className="flex items-center gap-4">
          <ButtonHistoryBack withArrow />
          <h1 className="text-3xl font-bold">Editer votre produit</h1>
        </div>
        <ProductDeleteForm id={product!.id} />
      </Header>
      <div className="container flex items-start justify-between px-14">
        <ProductForm product={product} asEdit />
        <ProductStatusForm product={product} />
      </div>
    </>
  );
}
