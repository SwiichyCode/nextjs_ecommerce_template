import * as z from "zod";

const MAX_FILE_SIZE = 10000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const formProductSchema = z.object({
  name: z
    .string()
    .min(2, { message: "The name must be at least 2 characters long" })
    .max(50, { message: "The name cannot exceed 50 characters" }),
  description: z
    .string()
    .min(2, { message: "The description must be at least 2 characters long" })
    .max(250, { message: "The description cannot exceed 50 characters" }),
  pictures: z
    .array(z.instanceof(File))
    .optional()
    .refine(
      (files) => files?.every((file) => file.size <= MAX_FILE_SIZE),
      `Max image size is 5MB.`,
    )
    .refine(
      (files) =>
        files?.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),

  price: z.coerce
    .number()
    .min(0, { message: "The price cannot be less than 0" })
    .max(1000000, { message: "The price cannot exceed 1,000,000" }),
  stock: z.coerce
    .number()
    .min(0, { message: "The stock cannot be less than 0" })
    .max(1000000, { message: "The stock cannot exceed 1,000,000" }),
  weight: z.coerce
    .number()
    .min(0, { message: "The weight cannot be less than 0" })
    .max(1000000, { message: "The weight cannot exceed 1,000,000" }),
  variants: z.any(), // type variant
});
