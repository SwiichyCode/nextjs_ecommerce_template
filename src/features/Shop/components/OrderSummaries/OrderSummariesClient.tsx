import type { CreditCard } from '@/features/Shop/types/order.type';
import type Stripe from 'stripe';

import { PaymentMethodCard } from '../PaymentMethodCard';

type Props = {
  paymentMethod: Stripe.PaymentMethod;
};

export const OrderSummariesClient = ({ paymentMethod }: Props) => {
  return (
    <dl className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
      <div>
        <dt className="font-medium text-gray-900">Shipping Address</dt>
        <dd className="mt-2">
          <address className="not-italic">
            <span className="block">{paymentMethod.billing_details.name}</span>
            <span className="block">
              {paymentMethod.billing_details.address?.line1
                ? paymentMethod.billing_details.address?.line1
                : '7363 Cynthia Pass'}
            </span>
            <span className="block">
              {paymentMethod.billing_details.address?.city
                ? paymentMethod.billing_details.address?.city
                : 'Toronto'}
              ,{' '}
              {paymentMethod.billing_details.address?.state
                ? paymentMethod.billing_details.address?.state
                : 'ON'}{' '}
              {paymentMethod.billing_details.address?.postal_code
                ? paymentMethod.billing_details.address?.postal_code
                : 'N3Y 4H8'}
            </span>
          </address>
        </dd>
      </div>
      <div>
        <dt className="font-medium text-gray-900">Payment Information</dt>
        <dd className="mt-2 space-y-2 sm:flex sm:space-x-4 sm:space-y-0">
          {paymentMethod.card && (
            <>
              <PaymentMethodCard
                card={paymentMethod.card.brand as CreditCard}
              />
              <div className="flex-auto">
                <p className="text-gray-900">
                  Ending with {paymentMethod.card.last4}
                </p>
                <p>
                  Expires{' '}
                  {paymentMethod.card.exp_month.toString().padStart(2, '0')} /
                  {paymentMethod.card.exp_year.toString().slice(-2)}
                </p>
              </div>
            </>
          )}
        </dd>
      </div>
    </dl>
  );
};
