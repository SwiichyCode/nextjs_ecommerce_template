"use client";
import { useTransition, useState } from "react";
import { deleteProduct } from "@/features/Admin/actions/product/deleteproduct.action";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ControlledAlertDialog } from "../common/ControlledAlertDialog";

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
        title: "Product deleted",
        description: "The product has been successfully deleted.",
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
      title={"Delete the product"}
      description={"Are you sure you want to delete this product?"}
      onContinue={onSubmit}
      onCancel={() => setOpen(false)}
      isPending={isPending}
    >
      <Button
        type="button"
        variant={"destructive"}
        onClick={() => setOpen(true)}
      >
        Delete the product
      </Button>
    </ControlledAlertDialog>
  );
};
