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
    <li className="hover:bg-secondary w-full cursor-pointer">
      <div
        className={cn(
          "hover:bg-secondary flex w-full items-center justify-between px-8 text-sm",
          pathname === item.path && "bg-secondary text-tertiary",
        )}
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "bg-quarternary h-1 w-1 rounded-full",
              pathname === item.path && "bg-tertiary",
            )}
          />
          <Link
            href={item.path}
            className="block w-32 items-center overflow-hidden truncate py-2 font-semibold"
          >
            {item.name}
          </Link>
        </div>
        {pathname === item.path && (
          <div className="bg-tertiary ml-2 h-2 w-2 rounded-full" />
        )}
      </div>
    </li>
  );
};
