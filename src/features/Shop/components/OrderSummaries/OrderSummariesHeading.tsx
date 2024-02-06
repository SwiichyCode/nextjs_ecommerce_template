import React from 'react';

export const OrderSummariesHeading = () => {
  return (
    <>
      <h1 className="text-sm font-medium text-indigo-600">
        Payment successful
      </h1>
      <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Thanks for ordering
      </p>
      <p className="mt-2 text-base text-gray-500">
        We appreciate your order, we’re currently processing it. So hang tight
        and we’ll send you confirmation very soon!
      </p>
      <dl className="mt-16 text-sm font-medium">
        <dt className="text-gray-900">Tracking number</dt>
        <dd className="mt-2 text-indigo-600">51547878755545848512</dd>
      </dl>
    </>
  );
};
