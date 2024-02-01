import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { env } from "@/env";

export const paymentErrorHandler = (error: unknown) => {
  switch (env.PAYMENT_SERVICE) {
    case "stripe":
      if (error instanceof Prisma.PrismaClientValidationError) {
        return new NextResponse(JSON.stringify({ error: error.message }), {
          status: 404,
        });
      }
  }
};
