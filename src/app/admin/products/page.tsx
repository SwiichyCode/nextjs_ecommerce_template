import { ProductProvider } from "@/features/Admin/context/useProductContext";
import { ProductsDataTableWrapper } from "@/features/Admin/components/ProductsDataTable/wrapper";
import ProductService from "@/features/Admin/services/productService";

export const revalidate = 10;

export default async function ProductPage() {
  const products = await ProductService.updatedProducts();

  {
    /*<p>{products.length} available products</p>*/
  }

  return (
    <ProductProvider products={products}>
      <div className="mx-auto w-full max-w-5xl px-14">
        <ProductsDataTableWrapper />
      </div>
    </ProductProvider>
  );
}
