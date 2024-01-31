"use client";

import React, { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Form } from "@/components/ui/form";
import { ControlledTextField } from "../common/ControlledTextField";
import { SubmitButton } from "@/features/Auth/components/SubmitButton";
import { addAdmin } from "@/features/Admin/actions/user/updateuserrole.action";
import { formSchema } from "./updateuserrole.schema";
import type * as z from "zod";

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
          title: "Error",
          description: "The user could not be added as an administrator",
        });
        return;
      }

      toast({
        title: "Success",
        description: "The user has been successfully added as an administrator",
      });

      form.reset();
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Add an administrator</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="card space-y-8">
          <ControlledTextField<z.infer<typeof formSchema>>
            control={form.control}
            name="email"
            label="User's email"
            placeholder="Email"
            className="w-1/3"
            cardWrapper={false}
          />
          <SubmitButton pending={isPending}>Add</SubmitButton>
        </form>
      </Form>
    </div>
  );
};
