import Image from "next/image";
import type { OrderWithCustomerInformation } from "@/modules/Shop/types/order.type";

type Props = {
  order: OrderWithCustomerInformation | null;
};

export const OrderSummariesClient = ({ order }: Props) => {
  return (
    <dl className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
      <div>
        <dt className="font-medium text-gray-900">Shipping Address</dt>
        <dd className="mt-2">
          <address className="not-italic">
            <span className="block">{order?.customerInformation.name}</span>
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
        <dt className="font-medium text-gray-900">Payment Information</dt>
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
  );
};
