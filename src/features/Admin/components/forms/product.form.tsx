"use client";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import type * as z from "zod";

import ImageService from "../../services/imageService";
import { useImageChange } from "../../hooks/useimagechange.hook";
import { useFileChange } from "../../hooks/usefilechange.hook";

import { Form } from "@/components/ui/form";
import { SubmitButton } from "@/features/Auth/components/SubmitButton";
import { useToast } from "@/components/ui/use-toast";
import { formProductSchema } from "./product.schema";
import { addProduct } from "../../actions/product/addproduct.action";
import { updateProduct } from "../../actions/product/updateproduct.action";
import { ControlledFileField } from "../common/ControlledFileField";
import { ControlledRichTextField } from "../common/ControlledRichText";
import { Button } from "@/components/ui/button";
import { ProductCardPreview } from "../ProductCardPreview";

import { FormField } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { TrashIcon } from "@heroicons/react/24/outline";
import { InputForm } from "@/components/ui/input-form";
import { cn } from "@/lib/utils";

import type { CloudinaryResponse } from "@/lib/types";
import type { ProductWithVariants } from "../../services/productService";

type Props = {
  product?: ProductWithVariants;
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

  const { selectedImages, setSelectedImages, handleImageChange, removeImage } =
    useImageChange(product?.pictures);
  const { files, handleFileChange } = useFileChange();

  const form = useForm<z.infer<typeof formProductSchema>>({
    resolver: zodResolver(formProductSchema),
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

  const onSubmit = async (values: z.infer<typeof formProductSchema>) => {
    startTransition(async () => {
      // This exemple using cloudinary storage to upload files

      const response = await ImageService.uploadImagesWithCloudinary(files);
      const imageUrls = response.map(
        (res: { data: CloudinaryResponse }) => res.data.secure_url,
      );

      const updateImagesUrls = [...selectedImages, ...imageUrls].filter(
        (url: string) => !url.startsWith("blob"),
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
        title: asEdit ? "Product modified" : "Product added",
        description: asEdit
          ? "Product successfully modified"
          : "Product successfully added",
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
                label={k === 0 ? "Option values" : ""}
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
          Add a value
        </Button>

        {valueFields.map((field, k) => (
          <li key={field.id} className="flex space-x-8">
            <InputForm
              control={form.control}
              name={`variants.${index}.optionValues.${k}.price`}
              label={k === 0 ? "Price" : ""}
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
            label="Name"
            placeholder="Shirt, Mug, ..."
            className="card"
          />

          <ControlledRichTextField<z.infer<typeof formProductSchema>>
            control={form.control}
            name="description"
            label="Description"
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />

          <ControlledFileField<z.infer<typeof formProductSchema>>
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
            label="Price"
            placeholder="0.00"
            className="card"
          />

          <InputForm
            control={form.control}
            name="stock"
            label="Available quantity"
            placeholder="0"
            type="number"
            className="card"
          />

          <InputForm
            control={form.control}
            name="weight"
            label="Product weight (kg)"
            placeholder="2.500"
            className="card"
          />

          <div className="card space-y-4">
            <Label>Variants</Label>
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
                              label="Name"
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
                        Add a variant
                      </Button>
                    )}
                  </ul>
                </>
              )}
            />
          </div>

          <div className="flex items-center justify-end space-x-4">
            <Button type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="button" onClick={() => setOpen(true)}>
              Preview
            </Button>
            <ProductCardPreview
              open={open}
              setOpen={setOpen}
              values={values}
              selectedImages={selectedImages}
            />
            <SubmitButton pending={isPending}>
              {asEdit ? "Modify the product" : "Add the product"}
            </SubmitButton>
          </div>
        </div>
      </form>
    </Form>
  );
};
