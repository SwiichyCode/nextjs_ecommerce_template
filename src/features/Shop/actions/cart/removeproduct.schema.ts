import * as z from "zod";

export const removeProductActionSchema = z.object({
  productId: z.number(),
});
