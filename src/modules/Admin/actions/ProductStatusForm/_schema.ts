import * as z from "zod";

export const formStatusSchema = z.object({
  status: z.enum(["ACTIVE", "DRAFT"]),
});
