import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { Product } from '@prisma/client';
import { Session } from 'next-auth';
import React from 'react';

import { useAddToCart } from '../../hooks/useAddToCart';
import { Editor } from '../Editor';

type Props = {
  session: Session | null;
  product: Product;
};

export const OrderProduct = ({ session, product }: Props) => {
  const { handleSubmit } = useAddToCart(session);

  return (
    <li key={product.id} className="p-4 sm:p-6">
      <form onSubmit={(e) => handleSubmit(e, product)}>
        <div className="flex items-center sm:items-start">
          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
            <img
              src={product.pictures[0]}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="ml-6 flex-1 text-sm">
            <div className="font-medium text-gray-900 sm:flex sm:justify-between">
              <h5>{product.name}</h5>
              <p className="mt-2 sm:mt-0">${product.price}</p>
            </div>
            <div className="hidden text-gray-500 sm:mt-2 sm:block">
              <Editor content={product.description} />
            </div>
          </div>
        </div>

        <div className="mt-6 sm:flex sm:justify-between">
          <div className="flex items-center">
            <CheckCircleIcon
              className="h-5 w-5 text-green-500"
              aria-hidden="true"
            />
            <p className="ml-2 text-sm font-medium text-gray-500">
              Delivered on{' '}
              {/* <time dateTime={order.deliveredDatetime}>
            {order.deliveredDate}
          </time> */}
            </p>
          </div>

          <div className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0">
            <div className="flex flex-1 justify-center">
              <a
                href={`/shop/${product.slug}`}
                className="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
              >
                View product
              </a>
            </div>
            <div className="flex flex-1 justify-center pl-4">
              <button
                type="submit"
                className="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
              >
                Buy again
              </button>
            </div>
          </div>
        </div>
      </form>
    </li>
  );
};
