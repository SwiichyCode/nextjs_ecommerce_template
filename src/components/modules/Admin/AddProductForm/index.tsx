"use client";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/SubmitButton";
import { useToast } from "@/components/ui/use-toast";
import { formSchema } from "./schema";
import { addProduct } from "./action";
import { TipTap } from "@/components/ui/tip-tap";

type Props = {
  setOpenDialog?: (open: boolean) => void;
};

export const AddProductForm = ({ setOpenDialog }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "test",
      description: "test",
      richtext: "test",
      pictures: [],
      price: 499,
      stock: 50,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    // startTransition(async () => {
    //   const result = await addProduct(values);
    //   if (result?.error) {
    //     toast({ title: "Error", description: result?.message });
    //   }
    //   toast({
    //     title: "Success",
    //     description: result?.message,
    //   });
    //   !isPending && setOpenDialog(false);
    // });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-5xl  px-14"
      >
        <div className="w-full max-w-xl space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="rounded border border-[#EAEAEF] bg-white px-6 py-6 shadow-sm">
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
              <FormItem className="rounded border border-[#EAEAEF] bg-white px-6 py-6 shadow-sm">
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
            name="richtext"
            render={({ field }) => (
              <FormItem className="rounded border border-[#EAEAEF] bg-white px-6 py-6 shadow-sm">
                <FormLabel>Description détaillé du produit</FormLabel>
                <FormControl>
                  <TipTap description={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pictures"
            render={({ field }) => (
              <FormItem className="rounded border border-[#EAEAEF] bg-white px-6 py-6 shadow-sm">
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
              <FormItem className="rounded border border-[#EAEAEF] bg-white px-6 py-6 shadow-sm">
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
              <FormItem className="rounded border border-[#EAEAEF] bg-white px-6 py-6 shadow-sm">
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
        </div>
      </form>
    </Form>
  );
};
