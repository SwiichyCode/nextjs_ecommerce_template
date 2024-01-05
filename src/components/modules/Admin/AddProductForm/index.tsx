"use client";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { formSchema } from "./schema";
import { addProduct } from "./action";
import { SubmitButton } from "@/components/SubmitButton";

type Props = {
  setOpenDialog: (open: boolean) => void;
};

export const AddProductForm = ({ setOpenDialog }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "test",
      description: "test",
      pictures: [],
      price: 499,
      stock: 50,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransition(async () => {
      const result = await addProduct(values);

      if (result?.error) {
        toast({ title: "Error", description: result?.message });
      }

      toast({
        title: "Success",
        description: result?.message,
      });

      !isPending && setOpenDialog(false);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du produit</FormLabel>
              <FormControl>
                <Input placeholder="Goodies..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description du produit</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Entrez la description du produit ici..."
                  className="h-32 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pictures"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image du produit</FormLabel>
              <FormControl>
                <Input type="file" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prix du produit</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="29.99"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantité disponible</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="545"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton pending={isPending}>Submit</SubmitButton>
      </form>
    </Form>
  );
};
