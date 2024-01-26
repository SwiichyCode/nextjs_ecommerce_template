import { PRODUCT_URL, ADD_PRODUCT_URL } from "@/constants/urls";

export interface NavItemProps {
  name: string;
  path: string;
}

export const ProductNavItems = [
  {
    name: "Your products",
    path: PRODUCT_URL,
  },
  {
    name: "Add a product",
    path: ADD_PRODUCT_URL,
  },
];

export const UserNavItems = [
  {
    name: "Your users",
    path: "/admin/users",
  },
];

export const PaymentNavItems = [
  {
    name: "Your payments",
    path: "/admin/payments",
  },
];
