import { NavItem } from "./NavItem";
import type { NavItemProps } from "./data";

interface Props {
  navItems: NavItemProps[];
  navTitle: string;
}

export const Navigation = ({ navItems, navTitle }: Props) => {
  return (
    <nav>
      <h2 className="px-6 py-2 text-sm font-bold uppercase text-[#666687]">
        {navTitle}
      </h2>

      <ul>
        {navItems.map((item) => (
          <NavItem key={item.name} item={item} />
        ))}
      </ul>
    </nav>
  );
};
