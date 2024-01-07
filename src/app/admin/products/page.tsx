import { db } from "@/server/db";
import { Header } from "@/modules/Admin/components/Header";
import { AddProductForm } from "@/modules/Admin/actions/AddProductForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function WritePage() {
  const products = await db.product.findMany();

  return (
    <>
      <Header>
        <div>
          <h1 className="text-3xl font-bold">Produits</h1>
          <p className="">{products.length} produits disponibles</p>
        </div>
        <Button className="gap-2">
          <Image src="/plus.svg" width={12} height={12} alt="" />
          Ajouter un produit
        </Button>
      </Header>

      <AddProductForm />
    </>
  );
}
