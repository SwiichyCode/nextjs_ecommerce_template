"use client";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import type { Product } from "@prisma/client";
import { statusSchema } from "../ProductForm/_schema";
import { SubmitButton } from "@/modules/Auth/components/SubmitButton";
import { updateStatus } from "../ProductForm/_action";

type Props = {
  product: Product | null;
};

export const ProductStatusForm = ({ product }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof statusSchema>>({
    resolver: zodResolver(statusSchema),
    defaultValues: {
      status: ["ACTIVE", "DRAFT"].includes(product!.status)
        ? (product!.status as "ACTIVE" | "DRAFT")
        : undefined,
    },
  });

  const onsubmit = async (values: z.infer<typeof statusSchema>) => {
    startTransition(async () => {
      const reponse = await updateStatus({
        id: product!.id,
        status: values.status,
      });

      toast({ title: "Success", description: "Statut mis à jour" });

      if (reponse.serverError) {
        toast({ title: "Error", description: reponse.serverError });
        return;
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onsubmit)}
        className="card w-full max-w-60 space-y-8"
      >
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Statut du produit</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ACTIVE">active</SelectItem>
                  <SelectItem value="DRAFT">brouillon</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton pending={isPending}>Enregistrer</SubmitButton>
      </form>
    </Form>
  );
};
