import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getServerAuthSession } from "@/server/auth";
import { checkoutHandler } from "@/modules/payments/checkoutHandler";
import { paymentErrorHandler } from "@/modules/payments/paymentErrorHandler";
import { PRODUCT_URL } from "@/constants/urls";
import ValidationService from "@/features/Shop/services/validation.service";

export const POST = async (request: Request) => {
  try {
    const user_session = await getServerAuthSession();
    if (!user_session?.user) throw new Error("User is not authenticated");

    const checkout_session = await checkoutHandler(request, user_session);

    if (!checkout_session) throw new Error("Checkout session is undefined");

    //Extract logic outside of route
    await ValidationService.validateTotalAmountInCheckoutSession(
      checkout_session,
    );

    revalidatePath(PRODUCT_URL);

    return NextResponse.json({ url: checkout_session.url });
  } catch (error) {
    paymentErrorHandler(error);

    if (error instanceof Error) {
      // return NextResponse.json({ error: error.message }, { status: 400 });
      return new Response(error.message, { status: 400 });
    } else {
      return new NextResponse(JSON.stringify({ error: "Unknown error" }), {
        status: 500,
      });
    }
  }
};
