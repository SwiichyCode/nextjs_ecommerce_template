import { PRODUCT_URL, ADD_PRODUCT_URL } from "@/constants/urls";

export interface NavItemProps {
  name: string;
  path: string;
}

export const ProductNavItems = [
  {
    name: "Vos produits",
    path: PRODUCT_URL,
  },
  {
    name: "Ajouter un produit",
    path: ADD_PRODUCT_URL,
  },
];
