"use client";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "../stores/useCartStore";
import { SHOP_URL } from "@/constants/urls";
import type { CustomerInformation, Order, Product } from "@prisma/client";

interface OrderWithCustomerInformation extends Order {
  customerInformation: CustomerInformation;
}

type Props = {
  products: Product[];
  order: OrderWithCustomerInformation | null;
};

export default function OrderSummaries({ products, order }: Props) {
  const { clear } = useCartStore();

  const subtotal = products
    .reduce((acc, product) => {
      return acc + product.price;
    }, 0)
    .toFixed(2);

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
            <h1 className="text-sm font-medium text-indigo-600">
              Payment successful
            </h1>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Thanks for ordering
            </p>
            <p className="mt-2 text-base text-gray-500">
              We appreciate your order, we’re currently processing it. So hang
              tight and we’ll send you confirmation very soon!
            </p>

            <dl className="mt-16 text-sm font-medium">
              <dt className="text-gray-900">Tracking number</dt>
              <dd className="mt-2 text-indigo-600">51547878755545848512</dd>
            </dl>

            <ul
              role="list"
              className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
            >
              {products.map((product) => (
                <li key={product.id} className="flex space-x-6 py-6">
                  <Image
                    src={product.pictures[0]!}
                    width={100}
                    height={100}
                    alt="product-image"
                    className="h-24 w-24 flex-none rounded-md bg-gray-100 object-cover object-center"
                  />
                  <div className="flex-auto space-y-1">
                    <h3 className="text-gray-900">
                      <a href={product.slug}>{product.name}</a>
                    </h3>
                    {/* <p>{product.color}</p>
                    <p>{product.size}</p> */}
                  </div>
                  <p className="flex-none font-medium text-gray-900">
                    ${product.price}
                  </p>
                </li>
              ))}
            </ul>

            <dl className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="text-gray-900">${subtotal}</dd>
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
                <dd className="text-base">${subtotal}</dd>
              </div>
            </dl>

            <dl className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
              <div>
                <dt className="font-medium text-gray-900">Shipping Address</dt>
                <dd className="mt-2">
                  <address className="not-italic">
                    <span className="block">
                      {order?.customerInformation.name}
                    </span>
                    <span className="block">
                      {order?.customerInformation.addressLine1
                        ? order?.customerInformation.addressLine1
                        : "7363 Cynthia Pass"}
                    </span>
                    <span className="block">
                      {order?.customerInformation.city
                        ? order?.customerInformation.city
                        : "Toronto"}
                      ,{" "}
                      {order?.customerInformation.state
                        ? order?.customerInformation.state
                        : "ON"}{" "}
                      {order?.customerInformation.postalCode
                        ? order?.customerInformation.postalCode
                        : "N3Y 4H8"}
                    </span>
                  </address>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">
                  Payment Information
                </dt>
                <dd className="mt-2 space-y-2 sm:flex sm:space-x-4 sm:space-y-0">
                  <div className="flex-none">
                    <Image
                      src="/icons/visa.svg"
                      width={36}
                      height={24}
                      alt="visa-card"
                    />
                    <p className="sr-only">Visa</p>
                  </div>
                  <div className="flex-auto">
                    <p className="text-gray-900">Ending with 4242</p>
                    <p>Expires 12 / 21</p>
                  </div>
                </dd>
              </div>
            </dl>

            <div className="mt-8 border-t border-gray-200 py-6 text-right">
              <Link
                href={SHOP_URL}
                onClick={clear}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
