"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const AddProductDialog = () => {
  const [isOpenDialog, setOpenDialog] = useState(false);

  return (
    <Dialog open={isOpenDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Image src="/icons/plus.svg" width={12} height={12} alt="" />
          Ajouter un produit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:min-w-[425px] sm:max-w-[950px]">
        <DialogHeader>
          <DialogTitle>Ajoute un produit</DialogTitle>
          <DialogDescription>
            Les produits sont des objets que vous pouvez vendre sur votre
            boutique.
          </DialogDescription>
        </DialogHeader>
        {/* Your content */}
      </DialogContent>
    </Dialog>
  );
};
