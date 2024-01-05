import { Button } from "@/components/ui/button";
import { Header } from "@/components/modules/Admin/Header";
import { AddProductDialog } from "@/components/modules/Admin/AddProductDialog";

export default function WritePage() {
  return (
    <>
      <Header>
        <div>
          <h1 className="text-3xl font-bold">Produits</h1>
          <p className="">0 produits disponibles</p>
        </div>
        <AddProductDialog />
      </Header>
    </>
  );
}
