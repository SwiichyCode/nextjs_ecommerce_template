"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavItems } from "./data";

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="border-y border-primary">
      <ul className="flex flex-col items-center py-4">
        {NavItems.map(({ href, icon }, index) => (
          <li key={index} className="flex py-2">
            <Link
              href={href}
              className={cn(
                "p-3",
                pathname.startsWith(href)
                  ? "rounded bg-[#F0F0FF] text-tertiary"
                  : "text-[#8E8EA9]",
              )}
            >
              {icon}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
