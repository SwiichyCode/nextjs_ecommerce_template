import * as z from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Le nom doit comporter au moins 2 caractères" })
    .max(50, { message: "Le nom ne peut pas dépasser 50 caractères" }),
  description: z
    .string()
    .min(2, { message: "La description doit comporter au moins 2 caractères" })
    .max(50, { message: "La description ne peut pas dépasser 50 caractères" }),
  picture: z.string().optional(),
  price: z
    .number()
    .min(0, { message: "Le prix ne peut pas être inférieur à 0" })
    .max(1000000, { message: "Le prix ne peut pas dépasser 1 000 000" }),
  stock: z
    .number()
    .min(0, { message: "Le stock ne peut pas être inférieur à 0" })
    .max(1000000, { message: "Le stock ne peut pas dépasser 1 000 000" }),
});
