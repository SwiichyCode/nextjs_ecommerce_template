"use client";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    startTransition(async () => {
      const result = await deleteProduct({
        id,
      });

      if (result?.error) {
        toast({ title: "Error", description: result?.message });
      }

      setOpen(false);

      router.push("/admin/products");

      toast({
        title: "Produit supprimé",
        description: "Le produit a bien été supprimé.",
      });
    });
  };

  return (
    <ControlledAlertDialog
      open={open}
      title={"Supprimer le produit"}
      description={"Êtes-vous sûr de vouloir supprimer ce produit ?"}
      onContinue={onSubmit}
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
