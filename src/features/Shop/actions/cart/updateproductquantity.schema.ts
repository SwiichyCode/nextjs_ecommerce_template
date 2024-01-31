import * as z from "zod";

export const updateProductQuantityActionSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
});
