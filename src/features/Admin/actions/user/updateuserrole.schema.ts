import * as z from "zod";

export const updateUserRoleActionSchema = z.object({
  email: z.string().email({ message: "L'email n'est pas valide" }),
});
