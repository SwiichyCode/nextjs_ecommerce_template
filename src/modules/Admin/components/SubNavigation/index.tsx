"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./Navigation";
import { ProductNavItems } from "./data";
import { ADMIN_URL, PRODUCT_URL } from "@/constants/urls";

export const SubNavigation = () => {
  const pathname = usePathname();

  const handleTitleTransform = () => {
    if (pathname.startsWith(PRODUCT_URL)) return "Produits";
  };

  const handleNavigation = () => {
    if (pathname.startsWith(PRODUCT_URL))
      return (
        <Navigation
          navTitle="Gestion des produits"
          navItems={ProductNavItems}
        />
      );
  };

  if (pathname === ADMIN_URL) return null;

  return (
    <section className="border-primary w-60 border-r">
      <h1 className="mb-8 px-6 py-4 text-xl font-bold capitalize">
        {handleTitleTransform()}
      </h1>

      {handleNavigation()}
    </section>
  );
};
