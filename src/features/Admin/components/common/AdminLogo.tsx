import { SHOP_URL } from '@/constants/urls';
import Image from 'next/image';
import Link from 'next/link';

export const AdminLogo = () => {
  return (
    <div className="py-4">
      <Link href={SHOP_URL}>
        <Image
          src="/icons/strapi.svg"
          width={40}
          height={40}
          alt="logo"
          className="m-auto"
        />
      </Link>
    </div>
  );
};
