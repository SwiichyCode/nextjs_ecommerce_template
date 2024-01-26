import * as z from "zod";

export const addProductActionSchema = z.object({
  userId: z.string(),
  products: z.array(
    z.object({
      productId: z.number(),
      quantity: z.number(),
    }),
  ),
});
