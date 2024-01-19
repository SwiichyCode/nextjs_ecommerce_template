import {
  PRODUCT_URL,
  ADD_PRODUCT_URL,
  // IMAGES_OPTIMIZATION_URL,
} from "@/constants/urls";

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
  // {
  //   name: "Optimisation d'images",
  //   path: IMAGES_OPTIMIZATION_URL,
  // },
];

export const UserNavItems = [
  {
    name: "Your users",
    path: "/admin/users",
  },
];
