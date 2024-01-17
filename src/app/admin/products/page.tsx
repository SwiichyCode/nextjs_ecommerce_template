import { Header } from "@/modules/Admin/components/Header";
import { ButtonLink } from "@/modules/Admin/components/ButtonLink";
import { ADD_PRODUCT_URL } from "@/constants/urls";
import { findProducts } from "@/modules/Admin/services/productQuery";
import { ProductProvider } from "@/modules/Admin/context/useProductContext";
import { ProductsDataTableWrapper } from "@/modules/Admin/components/ProductsDataTable/wrapper";

export default async function ProductPage() {
  const products = await findProducts();

  return (
    <>
      <Header>
        <div>
          <h1 className="text-3xl font-bold">Produits</h1>
          <p>{products.length} produits disponibles</p>
        </div>
        <ButtonLink href={ADD_PRODUCT_URL} src="/plus.svg" />
      </Header>

      <ProductProvider products={products}>
        <div className="mx-auto w-full max-w-5xl px-14">
          <ProductsDataTableWrapper />
        </div>
      </ProductProvider>
    </>
  );
}
