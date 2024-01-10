import Link from "next/link";
import Image from "next/image";
import { ADMIN_URL } from "@/constants/urls";

export const AdminLogo = () => {
  return (
    <div className="py-4">
      <Link href={ADMIN_URL}>
        <Image
          src="/strapi.svg"
          width={40}
          height={40}
          alt="logo"
          className="m-auto"
        />
      </Link>
    </div>
  );
};
