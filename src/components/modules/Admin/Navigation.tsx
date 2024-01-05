import Image from "next/image";
import Link from "next/link";

export const Navigation = () => {
  return (
    <nav className="border-y border-[#EAEAEF]">
      <ul className="flex flex-col items-center gap-4">
        <li className="flex py-4">
          <Link href="/admin/write" className="px-3 py-2">
            <Image src="/write.svg" width={24} height={24} alt="icon write" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
