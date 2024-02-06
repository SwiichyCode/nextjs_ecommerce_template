'use client';

import { Menu } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Prisma } from '@prisma/client';
import { Session } from 'next-auth';

import { formatPriceCents } from '../../utils/formatPrice';
import { OrderProduct } from './OrderProduct';

export const revalidate = 10;

type OrderWithOrderItems = Prisma.OrderGetPayload<{
  include: { orderItem: { include: { product: true } } };
}>;

type Props = {
  session: Session | null;
  orders: OrderWithOrderItems[];
};

export const OrderHistory = ({ session, orders }: Props) => {
  return (
    <>
      <div className=" max-w-7xl sm:px-2 lg:px-8">
        <div className=" max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Order history
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Check the status of recent orders, manage returns, and discover
            similar products.
          </p>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="sr-only">Recent orders</h2>
        <div className=" max-w-7xl sm:px-2 lg:px-8">
          <div className=" max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
              >
                <h3 className="sr-only">
                  Order placed on{' '}
                  <time dateTime={order.createdAt.toLocaleDateString('en-EN')}>
                    {order.createdAt.toLocaleTimeString('en-EN')}
                  </time>
                </h3>

                <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                  <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                    <div>
                      <dt className="font-medium text-gray-900">
                        Order number
                      </dt>
                      <dd className="mt-1 text-gray-500">
                        {order.orderNumber}
                      </dd>
                    </div>
                    <div className="hidden sm:block">
                      <dt className="font-medium text-gray-900">Date placed</dt>
                      <dd className="mt-1 text-gray-500">
                        <time
                          dateTime={order.createdAt.toLocaleDateString('en-EN')}
                        >
                          {order.createdAt.toLocaleTimeString('en-EN')}
                        </time>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-900">
                        Total amount
                      </dt>
                      <dd className="mt-1 font-medium text-gray-900">
                        {formatPriceCents(order.amountTotal)}
                      </dd>
                    </div>
                  </dl>

                  <Menu
                    as="div"
                    className="relative flex justify-end lg:hidden"
                  >
                    <div className="flex items-center">
                      <Menu.Button className="-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500">
                        <EllipsisVerticalIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
                  </Menu>

                  <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span>View Order</span>
                      <span className="sr-only">{order.orderNumber}</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span>View Invoice</span>
                      <span className="sr-only">
                        for order {order.orderNumber}
                      </span>
                    </a>
                  </div>
                </div>

                {/* Products */}
                <h4 className="sr-only">Items</h4>
                <ul role="list" className="divide-y divide-gray-200">
                  {order.orderItem.map(({ product }) => (
                    <OrderProduct session={session} product={product} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
