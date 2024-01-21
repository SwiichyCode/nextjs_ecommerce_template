import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { PRODUCT_URL } from "@/constants/urls";
import { getServerAuthSession } from "@/server/auth";
import { createCheckoutSession } from "@/modules/Shop/services/createCheckoutSession";
import CheckoutService from "@/modules/Shop/services/checkoutService";
import type { Products } from "@/lib/stripe";
import { Prisma } from "@prisma/client";

export const POST = async (request: Request) => {
  try {
    const { products } = (await request.json()) as { products: Products };
    const user_session = await getServerAuthSession();

    if (!user_session?.user) throw new Error("user is not defined");

    const checkout_session = await createCheckoutSession(products);

    if (!checkout_session.metadata) {
      throw new Error("session metadata is not defined");
    }

    const checkout_data = {
      sessionId: checkout_session.id,
      userId: user_session.user.id,
      sessionUrl: checkout_session.url!,
      productIds: JSON.parse(checkout_session.metadata.product_id!),
      quantities: JSON.parse(checkout_session.metadata.quantity!),
    };

    await CheckoutService.createCheckoutSession(checkout_data);

    revalidatePath(PRODUCT_URL);

    return NextResponse.json({ url: checkout_session.url });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
};
