"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/server/db";
import { adminAction } from "@/lib/safe-actions";
import { updateUserRoleActionSchema } from "./updateuserrole.schema";
import { USER_URL } from "@/constants/urls";
import { Role } from "@/constants/enum";

export const addAdmin = adminAction(
  updateUserRoleActionSchema,
  async (data) => {
    try {
      const { email } = data;

      // TEMP QUERY
      const isUserAlreadyAdmin = await db.user.findFirst({
        where: { email, role: Role.ADMIN },
      });

      await db.user.update({
        where: { email },
        data: {
          role: isUserAlreadyAdmin ? Role.USER : Role.ADMIN,
        },
      });
    } catch (error) {
      if (error instanceof Error) return { error: error.message };
    }

    revalidatePath(USER_URL);
  },
);
