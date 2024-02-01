import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ADMIN_URL } from "@/constants/urls";
import { webhookHandler } from "@/modules/payments/webhookHandler";
import { paymentErrorHandler } from "@/modules/payments/paymentErrorHandler";

export async function POST(request: Request) {
  try {
    const event = await webhookHandler(request);
    revalidatePath(ADMIN_URL);

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    paymentErrorHandler(error);

    return new NextResponse(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
}
