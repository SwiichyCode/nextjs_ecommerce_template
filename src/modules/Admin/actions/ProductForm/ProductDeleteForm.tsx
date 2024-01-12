"use client";
import { useTransition, useState } from "react";

import { deleteProduct } from "./action";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ControlledAlertDialog } from "../../components/ControlledAlertDialog";

type Props = {
  id: number;
};

export const ProductDeleteForm = ({ id }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    startTransition(async () => {
      const response = await deleteProduct({
        id,
      });

      toast({
        title: "Produit supprimé",
        description: "Le produit a bien été supprimé.",
      });

      if (response.serverError) {
        toast({ title: "Error", description: response.serverError });
        return;
      }

      setOpen(false);
    });
  };

  return (
    <ControlledAlertDialog
      open={open}
      title={"Supprimer le produit"}
      description={"Êtes-vous sûr de vouloir supprimer ce produit ?"}
      onContinue={onSubmit}
      onCancel={() => setOpen(false)}
      isPending={isPending}
    >
      <Button
        type="button"
        variant={"destructive"}
        onClick={() => setOpen(true)}
      >
        Supprimer le produit
      </Button>
    </ControlledAlertDialog>
  );
};
