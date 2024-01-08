"use client";
import { useState, useTransition, type ChangeEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import type { PutBlobResult } from "@vercel/blob";

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
import { SubmitButton } from "@/modules/Auth/components/SubmitButton";
import { useToast } from "@/components/ui/use-toast";
import { formSchema } from "./schema";
import { addProduct } from "./action";
import { TipTap } from "@/components/ui/tip-tap";
import { DragAndDrop } from "@/modules/Admin/components/DragAndDropList";
import { FileCard } from "../../components/FileCard";

export const AddProductForm = () => {
  const [isPending, startTransition] = useTransition();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "test",
      description: "test",
      pictures: undefined,
      price: 499,
      stock: 50,
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file),
      );

      // store file array in state
      setSelectedImages((prevImages) => prevImages.concat(filesArray));
    }
  };

  const file = form.watch("pictures");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    console.log(file);

    // startTransition(async () => {
    //   const result = await addProduct(values);
    //   if (result?.error) {
    //     toast({ title: "Error", description: result?.message });
    //   }
    //   toast({
    //     title: "Success",
    //     description: result?.message,
    //   });

    // });

    const response = await fetch(
      `/api/products/image/upload?filename=${file.name}`,
      {
        method: "POST",
        body: file,
      },
    );

    const newBlob = (await response.json()) as PutBlobResult;
    console.log(newBlob);
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
                  <Input
                    type="file"
                    {...field}
                    value={undefined}
                    onChange={(e) => {
                      handleImageChange(e);
                      if (e.target.files) {
                        field.onChange(e.target.files[0]);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />

                <DragAndDrop
                  items={selectedImages}
                  setItems={setSelectedImages}
                >
                  {(item, provided) => (
                    <FileCard item={item} provided={provided} />
                  )}
                </DragAndDrop>
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
