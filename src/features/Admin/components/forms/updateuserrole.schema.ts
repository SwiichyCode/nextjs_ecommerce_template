import * as z from "zod";

export const formSchema = z.object({
  email: z.string().email({ message: "L'email n'est pas valide" }),
});
