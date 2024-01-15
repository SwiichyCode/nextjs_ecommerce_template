"use client";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import type { Product, Variant, OptionValue } from "@prisma/client";

import { FormField } from "@/components/ui/form";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Label } from "@/components/ui/label";

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
  price: 500,
  stock: 500,
  weight: 1500,
  variants: [
    {
      name: "Size",
      optionValues: [
        {
          name: "Medium",
          price: 500,
          stock: 500,
        },
      ],
    },
  ],
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

            variants: product.variants.map((variant) => ({
              ...variant,
              optionValues: variant.optionValues, // Add optionValues here
            })),
          }
        : defaultValues,
  });

  const { fields, remove } = useFieldArray({
    control: form.control,
    name: "variants",
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
        variants: values.variants,
      };

      console.log(values);

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
      <ul className=" space-y-4">
        {valueFields.map((field, k) => (
          <li key={field.id}>
            <div className="space-y-4">
              <ControlledTextField<z.infer<typeof formSchema>>
                control={form.control}
                name={`variants.${index}.optionValues.${k}.name`}
                label={k === 0 ? "Option values" : undefined}
                placeholder="Size, Color, ..."
                className="w-full"
                cardWrapper={false}
              >
                {k != 0 && (
                  <Button
                    type="button"
                    onClick={() => remove(k)}
                    variant={"ghost"}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </Button>
                )}
              </ControlledTextField>
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
            <ControlledTextField<z.infer<typeof formSchema>>
              control={form.control}
              name={`variants.${index}.optionValues.${k}.price`}
              label={k === 0 ? "Prix" : undefined}
              placeholder="0.00"
              className="w-full"
              cardWrapper={false}
            />
            <ControlledTextField<z.infer<typeof formSchema>>
              control={form.control}
              name={`variants.${index}.optionValues.${k}.stock`}
              label={k === 0 ? "Stock" : undefined}
              placeholder="0"
              className="w-full"
              cardWrapper={false}
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
          <ControlledTextField<z.infer<typeof formSchema>>
            control={form.control}
            name="name"
            label="Nom du produit"
            placeholder="Shirt, Mug, ..."
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

          <ControlledTextField<z.infer<typeof formSchema>>
            control={form.control}
            name="price"
            type="number"
            label="Tarifs"
            placeholder="0.00"
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
          <FormField
            control={form.control}
            name="variants"
            render={({ field }) => (
              <>
                <ul>
                  {fields.map((field, index) => (
                    <li key={field.id} className="card space-y-4">
                      <Label>Variantes</Label>
                      <div className="space-y-4 pl-4">
                        <ControlledTextField<z.infer<typeof formSchema>>
                          control={form.control}
                          name={`variants.${index}.name`}
                          label="Option name"
                          placeholder="Size, Color, ..."
                          className="w-full"
                          cardWrapper={false}
                        >
                          <Button
                            type="button"
                            onClick={() => remove(index)}
                            variant={"ghost"}
                          >
                            <TrashIcon className="h-5 w-5" />
                          </Button>
                        </ControlledTextField>

                        <NestedFieldArray index={index} />
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
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
