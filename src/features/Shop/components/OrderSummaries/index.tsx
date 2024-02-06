import type { OrderWithProduct } from '@/features/Shop/types/order.type';
import Image from 'next/image';
import type Stripe from 'stripe';

import { formatPriceCents } from '../../utils/formatPrice';
import { transformOrderData } from '../../utils/transformOrderData';
import { OrderSummariesClient } from './OrderSummariesClient';
import { OrderSummariesHeading } from './OrderSummariesHeading';
import { OrderSummariesProduct } from './OrderSummariesProduct';
import { OrderSummariesRedirect } from './OrderSummariesRedirect';
import { OrderSummariesSubtotal } from './OrderSummariesSubtotal';

type Props = {
  order: OrderWithProduct;
  paymentMethod: Stripe.PaymentMethod;
};

export default async function OrderSummaries({ order, paymentMethod }: Props) {
  const currentOrder = transformOrderData(order);
  const subtotal = formatPriceCents(order.amountTotal);

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
            <OrderSummariesProduct currentOrder={currentOrder} />
            <OrderSummariesSubtotal subtotal={subtotal} />
            <OrderSummariesClient paymentMethod={paymentMethod} />
            <OrderSummariesRedirect />
          </div>
        </div>
      </div>
    </main>
  );
}
