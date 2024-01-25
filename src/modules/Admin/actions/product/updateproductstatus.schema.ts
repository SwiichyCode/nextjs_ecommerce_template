import * as z from "zod";

export const updateProductStatusActionSchema = z.object({
  id: z.number(),
  status: z.enum(["ACTIVE", "DRAFT"]),
});
