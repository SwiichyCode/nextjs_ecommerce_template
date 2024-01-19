import * as z from "zod";

const OptionValueSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  stock: z.number(),
  variantId: z.number(),
});

const VariantSchema = z.object({
  id: z.number(),
  name: z.string(),
  productId: z.number(),
  optionValues: z.array(OptionValueSchema), // Add this line
});

export const ProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  pictures: z.array(z.string()),
  price: z.number(),
  stock: z.number(),
  weight: z.number(),
  variants: z.array(VariantSchema),
});

export const productActionSchema = z.object({
  ...ProductSchema.shape, // Spread all fields from ProductSchema
});

export const updateProductActionSchema = z.object({
  ...ProductSchema.shape,
  id: z.number(),
});

export const deleteProductActionSchema = z.object({
  id: z.number(),
});

export const updateProductStatusActionSchema = z.object({
  id: z.number(),
  status: z.enum(["ACTIVE", "DRAFT"]),
});
