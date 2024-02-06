'use client';

import { SHOP_URL } from '@/constants/urls';
import Link from 'next/link';

import { useCartStore } from '../../stores/useCartStore';

export const OrderSummariesRedirect = () => {
  const { clear } = useCartStore();

  return (
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
  );
};
