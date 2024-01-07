import Image from "next/image";
import Link from "next/link";

export const AdminLogo = () => {
  return (
    <div className="py-4">
      <Link href="/admin">
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
