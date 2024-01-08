import { AddProductForm } from "@/modules/Admin/actions/AddProductForm";
import { Header } from "@/modules/Admin/components/Header";

export default function AddProductPage() {
  return (
    <>
      <Header>
        <h1>Ajouter un produit</h1>
      </Header>
      <AddProductForm />
    </>
  );
}
