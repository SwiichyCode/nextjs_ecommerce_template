"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import IconWrite from "@/components/ui/icons/IconWrite";

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="border-y border-[#EAEAEF]">
      <ul className="flex flex-col items-center gap-4">
        <li className="flex py-4">
          <Link
            href="/admin/write"
            className={cn(
              "px-3 py-2",
              pathname === "/admin/write" ? "text-[#4945FF]" : "text-[#8E8EA9]",
            )}
          >
            <IconWrite width={24} height={24} fill="#4945FF" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
