"use client";

import React, { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "./_schema";
import type * as z from "zod";

import { useToast } from "@/components/ui/use-toast";
import { Form } from "@/components/ui/form";
import { ControlledTextField } from "../../components/ControlledTextField";
import { SubmitButton } from "@/modules/Auth/components/SubmitButton";
import { addAdmin } from "./_action";

export const RoleForm = () => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const values = {
        email: data.email,
      };

      const response = await addAdmin(values);

      if (response.data?.error) {
        toast({
          title: "Erreur",
          description:
            "L'utilisateur n'a pas pu être ajouté en tant qu'administrateur",
        });
        return;
      }

      toast({
        title: "Succès",
        description:
          "L'utilisateur a bien été ajouté en tant qu'administrateur",
      });

      form.reset();
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Ajouter un administrateur</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="card space-y-8">
          <ControlledTextField<z.infer<typeof formSchema>>
            control={form.control}
            name="email"
            label="Email de l'utilisateur"
            placeholder="Email"
            className="w-1/3"
            cardWrapper={false}
          />
          <SubmitButton pending={isPending}>Ajouter</SubmitButton>
        </form>
      </Form>
    </div>
  );
};
