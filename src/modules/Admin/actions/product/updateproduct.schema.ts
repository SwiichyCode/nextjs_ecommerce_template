import * as z from "zod";
import { ProductSchema } from "./addproduct.schema";

export const updateProductActionSchema = z.object({
  ...ProductSchema.shape,
  id: z.number(),
});
