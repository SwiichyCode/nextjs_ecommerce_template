import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddProductForm } from "./AddProductForm";

export const AddProductDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Image src="/plus.svg" width={12} height={12} alt="" />
          Ajouter un produit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajoute un produit</DialogTitle>
          <DialogDescription>
            Les produits sont des objets que vous pouvez vendre sur votre
            boutique.
          </DialogDescription>
        </DialogHeader>
        <AddProductForm />
      </DialogContent>
    </Dialog>
  );
};
