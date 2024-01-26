import { createSafeActionClient } from "next-safe-action";
import { getServerAuthSession } from "@/server/auth";
import { Role } from "@/constants/enum";

export const action = createSafeActionClient();

export class ActionError extends Error {}

export const adminAction = createSafeActionClient({
  //@ts-expect-error - Return type is not correct
  handleReturnedServerError(e) {
    if (e instanceof ActionError) {
      return e.message;
    }

    return {
      serverError: "Something went wrong",
    };
  },

  async middleware() {
    const session = await getServerAuthSession();
    if (session?.user.role !== Role.ADMIN)
      throw new ActionError("You are not a admin");

    return {
      userId: session.user.id,
    };
  },
});

export const userAction = createSafeActionClient<{
  userId: string | undefined;
}>({
  //@ts-expect-error - Return type is not correct
  handleReturnedServerError(e) {
    if (e instanceof ActionError) {
      return e.message;
    }

    return {
      serverError: "Something went wrong",
    };
  },

  async middleware() {
    const session = await getServerAuthSession();
    if (!session) throw new ActionError("Not logged in");

    const userId = session.user.id;

    return {
      userId,
    };
  },
});
