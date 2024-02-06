import { SHOP_URL } from '@/constants/urls';
import type { Product } from '@prisma/client';
import Image from 'next/image';

type Props = {
  products: Product[];
};

export const ProductList = ({ products }: Props) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map(({ id, pictures, name, price, slug }) => (
            <a key={id} href={`${SHOP_URL}/${slug}`} className="group">
              <div className="aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 w-full overflow-hidden rounded-lg bg-gray-200">
                <Image
                  src={pictures[0]!}
                  width={500}
                  height={500}
                  alt=""
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{price}$</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
