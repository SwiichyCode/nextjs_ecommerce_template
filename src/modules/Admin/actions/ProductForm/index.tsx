"use client";
import { useTransition, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import type * as z from "zod";

import { uploadImagesWithVercelBlob } from "./uploadImagesWithVercelBlob";
import { uploadImagesWithCloudinary } from "./uploadImagesWithCloudinary";
import { useImageChange } from "./useImageChange";
import { useFileChange } from "./useFileChange";

import { Form } from "@/components/ui/form";
import { SubmitButton } from "@/modules/Auth/components/SubmitButton";
import { useToast } from "@/components/ui/use-toast";
import { formSchema } from "./_schema";
import { addProduct, updateProduct } from "./_action";
import { ControlledFileField } from "../../components/ControlledFileField";
import { ControlledRichTextField } from "../../components/ControlledRichText";
import { Button } from "@/components/ui/button";
import { ProductCardPreview } from "../../components/ProductCardPreview";
import type { Product, Variant, OptionValue } from "@prisma/client";

import { FormField } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { TrashIcon } from "@heroicons/react/24/outline";
import { InputForm } from "@/components/ui/input-form";
import { cn } from "@/lib/utils";

import { productContext } from "../../context/useProductContext";

type VariantWithOptionValues = Variant & {
  optionValues: OptionValue[];
};

type ProductWithVariants = Product & {
  variants: VariantWithOptionValues[];
};

type Props = {
  product?: ProductWithVariants | null;
  asEdit?: boolean;
};

const defaultValues = {
  name: "test",
  description: "test",
  pictures: [],
  price: 0,
  stock: 0,
  weight: 0,
  variants: [
    {
      name: "",
      // optionValues: [
      //   {
      //     name: undefined,
      //     price: undefined,
      //     stock: undefined,
      //   },
      // ],
    },
  ],
};

export const ProductForm = ({ product, asEdit }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const context = useContext(productContext);

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

            variants: product.variants.map((variant) => ({
              ...variant,
              optionValues: variant.optionValues, // Add optionValues here
            })),
          }
        : defaultValues,
  });

  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const values = form.getValues();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      // This exemple using cloudinary storage to upload files

      const response = await uploadImagesWithCloudinary(files);
      const imageUrls = response.map((res) => res.data.secure_url);

      const updateImagesUrls = [...selectedImages, ...imageUrls].filter(
        (url) => !url.startsWith("blob"),
      );

      const addProductValues = {
        name: values.name,
        description: values.description,
        pictures: updateImagesUrls,
        price: values.price,
        stock: values.stock,
        weight: values.weight,
        variants: values.variants,
      };

      if (asEdit && product) {
        const updateProductValues = {
          ...addProductValues,
          id: product.id,
        };

        await updateProduct(updateProductValues);
      } else {
        // context?.setOptimisticProduct(addProductValues);
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

  const NestedFieldArray = ({ index }: { index: number }) => {
    const {
      fields: valueFields,
      append,
      remove,
    } = useFieldArray({
      control: form.control,
      name: `variants.${index}.optionValues`,
    });

    return (
      <ul className="space-y-4">
        {valueFields.map((field, k) => (
          <li key={field.id}>
            <div className="flex items-center justify-between space-x-4">
              <InputForm
                control={form.control}
                name={`variants.${index}.optionValues.${k}.name`}
                label={k === 0 ? "Valeurs des options" : ""}
                placeholder="S, M, L, ..."
                className={cn("w-full max-w-[442px]", k != 0 && "space-y-0")}
              />

              {k != 0 && (
                <Button
                  type="button"
                  onClick={() => remove(k)}
                  variant={"ghost"}
                >
                  <TrashIcon className="h-5 w-5" />
                </Button>
              )}
            </div>
          </li>
        ))}

        <Button
          type="button"
          onClick={() => append({ name: "" })}
          variant={"ghost"}
        >
          Ajouter une valeur
        </Button>

        {valueFields.map((field, k) => (
          <li key={field.id} className="flex space-x-8">
            <InputForm
              control={form.control}
              name={`variants.${index}.optionValues.${k}.price`}
              label={k === 0 ? "Prix" : ""}
              placeholder="0.00"
              className="w-full"
            />

            <InputForm
              control={form.control}
              name={`variants.${index}.optionValues.${k}.stock`}
              label={k === 0 ? "Stock" : ""}
              placeholder="0"
              className="w-full"
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xl">
        <div className="space-y-8">
          <InputForm
            control={form.control}
            name="name"
            label="Nom du produit"
            placeholder="Shirt, Mug, ..."
            className="card"
          />

          <ControlledRichTextField<z.infer<typeof formSchema>>
            control={form.control}
            name="description"
            label="Description"
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
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

          <InputForm
            control={form.control}
            name="price"
            label="Tarifs"
            placeholder="0.00"
            className="card"
          />

          <InputForm
            control={form.control}
            name="stock"
            label="Quantité disponible"
            placeholder="0"
            type="number"
            className="card"
          />

          <InputForm
            control={form.control}
            name="weight"
            label="Poids du produit (kg)"
            placeholder="2.500"
            className="card"
          />

          <div className="card space-y-4">
            <Label>Variantes</Label>
            <FormField
              control={form.control}
              name="variants"
              render={() => (
                <>
                  <ul className="space-y-4">
                    {fields.map((field, index) => (
                      <li key={field.id} className="border-grey-200 space-y-4">
                        <div className="space-y-4 border-b border-slate-200 pb-4 pl-4">
                          <div className="flex items-end justify-between space-x-4">
                            <InputForm
                              control={form.control}
                              name={`variants.${index}.name`}
                              label="Nom de la variante"
                              placeholder="Size, Color, ..."
                              className="w-full"
                            />
                            <Button
                              type="button"
                              onClick={() => remove(index)}
                              variant={"ghost"}
                            >
                              <TrashIcon className="h-5 w-5" />
                            </Button>
                          </div>

                          <NestedFieldArray index={index} />
                        </div>
                      </li>
                    ))}

                    {fields.length <= 2 && (
                      <Button
                        type="button"
                        variant={"ghost"}
                        onClick={() => {
                          append({
                            name: "",
                            optionValues: [],
                          });
                        }}
                      >
                        Ajouter une variante
                      </Button>
                    )}
                  </ul>
                </>
              )}
            />
          </div>

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
