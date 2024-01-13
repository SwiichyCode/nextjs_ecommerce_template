"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/server/db";
import { adminAction } from "@/lib/safe-actions";
import { updateUserRoleActionSchema } from "./_schema";
import { USER_URL } from "@/constants/urls";

export const addAdmin = adminAction(
  updateUserRoleActionSchema,
  async (data) => {
    try {
      const { email } = data;

      // TEMP QUERY
      const isUserAlreadyAdmin = await db.user.findFirst({
        where: { email, role: "admin" },
      });

      await db.user.update({
        where: { email },
        data: {
          role: isUserAlreadyAdmin ? "user" : "admin",
        },
      });
    } catch (error) {
      if (error instanceof Error) return { error: error.message };
    }

    revalidatePath(USER_URL);
  },
);
