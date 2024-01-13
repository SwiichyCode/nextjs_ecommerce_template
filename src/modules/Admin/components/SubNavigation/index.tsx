"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./Navigation";
import { ProductNavItems, UserNavItems } from "./data";
import { ADMIN_URL, PRODUCT_URL, USER_URL } from "@/constants/urls";

export const SubNavigation = () => {
  const pathname = usePathname();

  const handleTitleTransform = () => {
    if (pathname.startsWith(PRODUCT_URL)) return "Produits";
    if (pathname.startsWith(USER_URL)) return "Utilisateurs";
  };

  const handleNavigation = () => {
    if (pathname.startsWith(PRODUCT_URL))
      return (
        <Navigation
          navTitle="Gestion des produits"
          navItems={ProductNavItems}
        />
      );

    if (pathname.startsWith(USER_URL))
      return (
        <Navigation
          navTitle="Gestion des utilisateurs"
          navItems={UserNavItems}
        />
      );
  };

  if (pathname === ADMIN_URL) return null;

  return (
    <section className="w-60 border-r border-primary">
      <h1 className="mb-8 px-6 py-4 text-xl font-bold capitalize">
        {handleTitleTransform()}
      </h1>

      {handleNavigation()}
    </section>
  );
};
