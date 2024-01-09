import { Header } from "@/modules/Admin/components/Header";
import { ButtonHistoryBack } from "@/modules/Admin/components/ButtonHistoryBack";
import { AddProductForm } from "@/modules/Admin/actions/AddProductForm";

export default function EditProductPage() {
  return (
    <>
      <Header>
        <div className="flex items-center gap-4">
          <ButtonHistoryBack />
          <h1 className="text-3xl font-bold">Editer votre produit</h1>
        </div>
      </Header>
      <AddProductForm />
    </>
  );
}
