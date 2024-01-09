import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavItemProps } from "./data";

type Props = {
  item: NavItemProps;
};

export const NavItem = ({ item }: Props) => {
  const pathname = usePathname();

  return (
    <li className="w-full cursor-pointer hover:bg-[#F0F0FF]">
      <div
        className={cn(
          "flex w-full items-center justify-between px-8 text-sm text-[#32324D] hover:bg-[#F0F0FF]",
          pathname === item.path && "bg-[#F0F0FF] text-[#4945FF]",
        )}
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "h-1 w-1 rounded-full bg-[#666687]",
              pathname === item.path && "bg-[#4945FF]",
            )}
          />
          <Link
            href={item.path}
            className="flex items-center py-2 font-semibold"
          >
            {item.name}
          </Link>
        </div>
        {pathname === item.path && (
          <div className="ml-2 h-2 w-2 rounded-full bg-[#4945FF]" />
        )}
      </div>
    </li>
  );
};
