import { db } from "@/server/db";
import { Header } from "@/modules/Admin/components/Header";
import { ButtonLink } from "@/modules/Admin/components/ButtonLink";
import { DataTable } from "@/modules/Admin/components/ProductsDataTable";
import { productColumns } from "@/modules/Admin/components/ProductsDataTable/columns";
import { ADD_PRODUCT_URL } from "@/constants/urls";
export default async function WritePage() {
  const products = await db.product.findMany();

  return (
    <>
      <Header>
        <div>
          <h1 className="text-3xl font-bold">Produits</h1>
          <p className="">{products.length} produits disponibles</p>
        </div>
        <ButtonLink href={ADD_PRODUCT_URL} src="/plus.svg" />
      </Header>

      <div className="mx-auto w-full max-w-5xl px-14">
        <DataTable columns={productColumns} data={products} asRowLink />
      </div>
    </>
  );
}
