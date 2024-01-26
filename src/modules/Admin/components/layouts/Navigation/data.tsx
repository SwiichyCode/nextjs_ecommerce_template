import IconCart from "@/components/ui/icons/IconCart";
import { IconUser } from "@/components/ui/icons/IconUser";
import IconWrite from "@/components/ui/icons/IconWrite";
import { PRODUCT_URL, USER_URL, PAYMENT_URL } from "@/constants/urls";

export const NavItems = [
  {
    href: PRODUCT_URL,
    icon: <IconWrite width={24} height={24} />,
  },
  {
    href: USER_URL,
    icon: <IconUser width={24} height={24} />,
  },
  {
    href: PAYMENT_URL,
    icon: <IconCart width={24} height={24} />,
  },
];
