import { ButtonHistoryBack } from "@/modules/Admin/components/ButtonHistoryBack";
import { Header } from "@/modules/Admin/components/Header";
import { ProductForm } from "@/modules/Admin/actions/ProductForm/ProductForm";

export default function AddProductPage() {
  return (
    <>
      <Header>
        <div className="flex items-center gap-4">
          <ButtonHistoryBack withArrow />
          <h1 className="text-3xl font-bold">Ajouter un produit</h1>
        </div>
      </Header>
      <div className="mx-auto flex w-full max-w-5xl items-start justify-between px-14">
        <ProductForm />
      </div>
    </>
  );
}
