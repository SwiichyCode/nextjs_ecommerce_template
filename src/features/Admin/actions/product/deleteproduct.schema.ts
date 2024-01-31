import * as z from "zod";

export const deleteProductActionSchema = z.object({
  id: z.number(),
});
