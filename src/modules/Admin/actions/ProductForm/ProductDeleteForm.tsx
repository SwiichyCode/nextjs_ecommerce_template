"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteProduct } from "./action";
import { SubmitButton } from "@/modules/Auth/components/SubmitButton";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  id: number;
};

export const ProductDeleteForm = ({ id }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      const result = await deleteProduct({
        id,
      });

      if (result?.error) {
        toast({ title: "Error", description: result?.message });
      }

      toast({
        title: "Produit supprimé",
        description: "Le produit a bien été supprimé.",
      });

      router.push("/admin/products");
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <SubmitButton variant={"destructive"} pending={isPending}>
        Supprimer le produit
      </SubmitButton>
    </form>
  );
};
