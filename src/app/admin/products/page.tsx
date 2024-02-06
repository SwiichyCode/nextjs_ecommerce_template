import ProductService from '@/features/Admin/services/productService';
import { DataTable } from '@/features/Admin/components/ProductsDataTable';
import { productColumns } from '@/features/Admin/components/ProductsDataTable/columns';
export const revalidate = 10;

export default async function ProductPage() {
  const { products } = await ProductService.updatedProducts();

  return (
    <div className="mx-auto w-full max-w-5xl px-14">
      <DataTable columns={productColumns} data={products} route={'products'} asRowLink />
    </div>
  );
}
