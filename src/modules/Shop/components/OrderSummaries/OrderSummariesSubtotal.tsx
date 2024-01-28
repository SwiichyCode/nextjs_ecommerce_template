type Props = {
  subtotal: string;
};

export const OrderSummariesSubtotal = ({ subtotal }: Props) => {
  return (
    <dl className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
      <div className="flex justify-between">
        <dt>Subtotal</dt>
        <dd className="text-gray-900">{subtotal}</dd>
      </div>

      {/* <div className="flex justify-between">
        <dt>Shipping</dt>
        <dd className="text-gray-900">$8.00</dd>
      </div>

      <div className="flex justify-between">
        <dt>Taxes</dt>
        <dd className="text-gray-900">$6.40</dd>
      </div> */}

      <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
        <dt className="text-base">Total</dt>
        <dd className="text-base">{subtotal}</dd>
      </div>
    </dl>
  );
};
