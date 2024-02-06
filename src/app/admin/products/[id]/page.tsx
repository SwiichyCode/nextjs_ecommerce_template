import { ProductForm } from '@/features/Admin/components/forms/product.form';
import { ProductStatusForm } from '@/features/Admin/components/forms/updateproductstatus.form';
import ProductService from '@/features/Admin/services/productService';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await ProductService.findProduct({ id: params.id });

  return (
    <>
      {/* <Header>
        <div className="flex items-center gap-4">
          <ButtonHistoryBack withArrow />
          <h1 className="text-3xl font-bold">Edit your product</h1>
        </div>
        {product && <ProductDeleteForm id={product.id} />}
      </Header> */}
      <div className="container flex items-start justify-between px-14">
        <ProductForm product={product} asEdit />
        <ProductStatusForm product={product} />
      </div>
    </>
  );
}
