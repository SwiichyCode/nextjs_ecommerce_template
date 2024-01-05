import { db } from "@/server/db";
import { Header } from "@/components/modules/Admin/Header";
import { AddProductDialog } from "@/components/modules/Admin/AddProductDialog";

export default async function WritePage() {
  const products = await db.product.findMany();

  return (
    <>
      <Header>
        <div>
          <h1 className="text-3xl font-bold">Produits</h1>
          <p className="">{products.length} produits disponibles</p>
        </div>
        <AddProductDialog />
      </Header>
    </>
  );
}
