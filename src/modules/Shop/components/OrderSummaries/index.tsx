import Image from "next/image";
import { OrderSummariesRedirect } from "./OrderSummariesRedirect";
import { OrderSummariesClient } from "./OrderSummariesClient";
import { OrderSummariesSubtotal } from "./OrderSummariesSubtotal";
import { OrderSummariesProduct } from "./OrderSummariesProduct";
import { OrderSummariesHeading } from "./OrderSummariesHeading";
import CheckoutService from "../../services/checkoutService";
import type { CustomerInformation, Order, Product } from "@prisma/client";

export interface OrderWithCustomerInformation extends Order {
  customerInformation: CustomerInformation;
}

type Props = {
  products: Product[];
  order: OrderWithCustomerInformation | null;
};

export default async function OrderSummaries({ products, order }: Props) {
  const subtotal = await CheckoutService.summariesSubtotal(
    order?.productIds ?? [],
    order?.quantities ?? [],
  );
  return (
    <main className="max-h-screen overflow-y-scroll">
      <div className="h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
        <Image
          src="/images/confirmation-page-06-hero.jpg"
          width={1900}
          height={1900}
          alt="TODO"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div>
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-12 xl:gap-x-24">
          <div className="lg:col-start-2">
            <OrderSummariesHeading />
            <OrderSummariesProduct products={products} />
            <OrderSummariesSubtotal subtotal={subtotal} />
            <OrderSummariesClient order={order} />
            <OrderSummariesRedirect />
          </div>
        </div>
      </div>
    </main>
  );
}
