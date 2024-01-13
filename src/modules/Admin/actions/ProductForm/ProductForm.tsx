"use client";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { uploadFiles } from "../../services/uploadFiles";
import { useImageChange } from "./useImageChange";
import { useFileChange } from "./useFileChange";

import { Form } from "@/components/ui/form";
import { SubmitButton } from "@/modules/Auth/components/SubmitButton";
import { useToast } from "@/components/ui/use-toast";
import { formSchema } from "./_schema";
import { addProduct, updateProduct } from "./_action";
import { ControlledTextField } from "../../components/ControlledTextField";
import { ControlledFileField } from "../../components/ControlledFileField";
import { ControlledRichTextField } from "../../components/ControlledRichText";
import { Button } from "@/components/ui/button";
import { ProductCardPreview } from "../../components/ProductCardPreview";
import type { Product } from "@prisma/client";

type Props = {
  product?: Product | null;
  asEdit?: boolean;
};

const defaultValues = {
  name: "",
  description: "",
  pictures: [],
  price: 0,
  stock: 0,
  weight: 0,
};

export const ProductForm = ({ product, asEdit }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const { selectedImages, setSelectedImages, handleImageChange, removeImage } =
    useImageChange(product?.pictures);
  const { files, handleFileChange } = useFileChange();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      asEdit && product
        ? {
            name: product.name,
            description: product.description,
            pictures: [],
            price: product.price,
            stock: product.stock,
            weight: product.weight,
          }
        : defaultValues,
  });

  const values = form.getValues();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const imagesUrls = await uploadFiles(files);

      const updateImagesUrls = [...selectedImages, ...imagesUrls].filter(
        (url) => !url.startsWith("blob"),
      );

      const addProductValues = {
        name: values.name,
        description: values.description,
        pictures: updateImagesUrls,
        price: values.price,
        stock: values.stock,
        weight: values.weight,
      };

      if (asEdit && product) {
        const updateProductValues = {
          ...addProductValues,
          id: product.id,
        };

        await updateProduct(updateProductValues);
      } else {
        await addProduct(addProductValues);
      }

      // try to catch error from response action

      toast({
        title: asEdit ? "Produit modifié" : "Produit ajouté",
        description: asEdit
          ? "Produit modifié avec succés"
          : "Produit ajouté  avec succés",
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xl">
        <div className="space-y-8">
          <ControlledTextField<z.infer<typeof formSchema>>
            control={form.control}
            name="name"
            label="Nom du produit"
            placeholder="Goodies..."
          />

          <ControlledRichTextField<z.infer<typeof formSchema>>
            control={form.control}
            name="description"
            label="Description du produit"
            placeholder="Goodies..."
          />

          <ControlledFileField<z.infer<typeof formSchema>>
            direction="horizontal"
            control={form.control}
            name="pictures"
            handleImageChange={handleImageChange}
            handleFileChange={handleFileChange}
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            removeImage={removeImage}
          />

          <ControlledTextField<z.infer<typeof formSchema>>
            control={form.control}
            name="price"
            type="number"
            label="Prix du produit"
            placeholder="29.99"
          />

          <ControlledTextField<z.infer<typeof formSchema>>
            control={form.control}
            name="stock"
            type="number"
            label="Quantité disponible"
            placeholder="545"
          />

          <ControlledTextField<z.infer<typeof formSchema>>
            control={form.control}
            name="weight"
            type="number"
            label="Poids du produit (kg)"
            placeholder="2.500"
          />

          <div className="flex items-center justify-end space-x-4">
            <Button type="button" onClick={() => router.back()}>
              Annuler
            </Button>
            <Button type="button" onClick={() => setOpen(true)}>
              Prévisualiser
            </Button>
            <ProductCardPreview
              open={open}
              setOpen={setOpen}
              values={values}
              selectedImages={selectedImages}
            />
            <SubmitButton pending={isPending}>
              {asEdit ? "Modifier le produit" : "Ajouter le produit"}
            </SubmitButton>
          </div>
        </div>
      </form>
    </Form>
  );
};
