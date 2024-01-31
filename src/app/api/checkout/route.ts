import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { getServerAuthSession } from "@/server/auth";
import { checkoutHandler } from "@/modules/payments/checkoutHandler";
import { PRODUCT_URL } from "@/constants/urls";
import { checkoutErrorHandler } from "@/modules/payments/checkoutErrorHandler";

export const POST = async (request: Request) => {
  try {
    const user_session = await getServerAuthSession();
    if (!user_session?.user) throw new Error("User is not authenticated");

    const checkout_session = await checkoutHandler(request, user_session);

    if (!checkout_session) throw new Error("Checkout session is undefined");

    revalidatePath(PRODUCT_URL);

    return NextResponse.json({ url: checkout_session.url });
  } catch (error) {
    checkoutErrorHandler(error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return new NextResponse(JSON.stringify({ error: "Unknown error" }), {
        status: 500,
      });
    }
  }
};
