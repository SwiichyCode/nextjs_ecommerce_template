"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import IconCart from "@/components/ui/icons/IconCart";
import { PRODUCT_URL } from "@/constants/urls";

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="border-primary border-y">
      <ul className="flex flex-col items-center gap-4">
        <li className="flex py-4">
          <Link
            href={PRODUCT_URL}
            className={cn(
              "px-3 py-2",
              pathname.startsWith(PRODUCT_URL)
                ? "text-tertiary"
                : "text-primary",
            )}
          >
            <IconCart width={24} height={24} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
