import Image from 'next/image';

import type { OrderProduct } from '../../types/order.type';

type Props = {
  currentOrder: OrderProduct[];
};

export const OrderSummariesProduct = ({ currentOrder }: Props) => {
  return (
    <ul
      role="list"
      className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
    >
      {currentOrder.map(({ id, pictures, slug, name, price, quantity }) => (
        <li key={id} className="flex space-x-6 py-6">
          <Image
            src={pictures[0]!}
            width={100}
            height={100}
            alt="product-image"
            className="h-24 w-24 flex-none rounded-md bg-gray-100 object-cover object-center"
          />
          <div className="flex-auto space-y-1">
            <h3 className="text-gray-900">
              <a href={slug}>{name}</a>
              <span className="ml-4 text-gray-500">x{quantity}</span>
            </h3>
          </div>
          <p className="flex-none font-medium text-gray-900">
            ${price * quantity}
          </p>
        </li>
      ))}
    </ul>
  );
};
