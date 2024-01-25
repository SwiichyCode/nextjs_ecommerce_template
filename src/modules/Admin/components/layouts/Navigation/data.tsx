import IconCart from "@/components/ui/icons/IconCart";
import { IconUser } from "@/components/ui/icons/IconUser";
import { PRODUCT_URL, USER_URL } from "@/constants/urls";

export const NavItems = [
  {
    href: PRODUCT_URL,
    // label: "Products",
    icon: <IconCart width={24} height={24} />,
  },
  {
    href: USER_URL,
    // label: "Users",
    icon: <IconUser width={24} height={24} />,
  },
];
