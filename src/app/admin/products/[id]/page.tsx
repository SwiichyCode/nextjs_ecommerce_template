import { Header } from "@/modules/Admin/components/Header";
import { ButtonHistoryBack } from "@/modules/Admin/components/ButtonHistoryBack";
import { ProductForm } from "@/modules/Admin/actions/ProductForm";
import { ProductDeleteForm } from "@/modules/Admin/actions/ProductDeleteForm";
import { ProductStatusForm } from "@/modules/Admin/actions/ProductStatusForm";
import ProductQuery from "@/modules/Admin/services/productQuery";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await ProductQuery.findProduct({ id: params.id });

  return (
    <>
      <Header>
        <div className="flex items-center gap-4">
          <ButtonHistoryBack withArrow />
          <h1 className="text-3xl font-bold">Edit your product</h1>
        </div>
        {product && <ProductDeleteForm id={product.id} />}
      </Header>
      <div className="container flex items-start justify-between px-14">
        <ProductForm product={product} asEdit />
        <ProductStatusForm product={product} />
      </div>
    </>
  );
}
