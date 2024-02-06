import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";

export default async function ShopProfile() {
  const session = await getServerAuthSession();

  const user = await db.user.findUnique({
    where: { id: session?.user.id },
    include: {
      orders: {
        include: {
          customerInformation: true,
        },
      },
    },
  });

  const customerInformation = user?.orders[0]?.customerInformation;

  return (
    <>
      <div className=" max-w-7xl sm:px-2 lg:px-8">
        <div className=" max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Your account details
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage your account details and track your orders.
          </p>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="sr-only">Account details</h2>
        <div className="max-w-7xl sm:px-2 lg:px-8">
          <div className="max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
            <div className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
              <div className="space-y-4 p-4 sm:p-6">
                <h3 className="text-base font-semibold text-gray-900">
                  Account details
                </h3>

                <dl className="grid gap-y-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                  <div>
                    <dt className="font-medium text-gray-900">Name</dt>
                    <dd className="mt-1 text-gray-500">{user?.name}</dd>
                  </div>
                  <div className="">
                    <dt className="font-medium text-gray-900">Email</dt>
                    <dd className="mt-1 text-gray-500">{user?.email}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-900">Phone</dt>
                    <dd className="mt-1 text-gray-500">0614713466</dd>
                  </div>
                </dl>
              </div>
              <div className="space-y-4 p-4 sm:p-6">
                <h3 className="text-base font-semibold text-gray-900">
                  Customer details
                </h3>
                <dl>
                  <div className="grid gap-y-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                    <div>
                      <dt className="font-medium text-gray-900">Name</dt>
                      <dd className="mt-1 text-gray-500">
                        {customerInformation?.name}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-900">Country</dt>
                      <dd className="mt-1 text-gray-500">
                        {customerInformation?.country}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-900">City</dt>
                      <dd className="mt-1 text-gray-500">
                        {customerInformation?.city}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-900">Address</dt>
                      <dd className="mt-1 text-gray-500">
                        {customerInformation?.addressLine1}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-900">Postal Code</dt>
                      <dd className="mt-1 text-gray-500">
                        {customerInformation?.postalCode}
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
