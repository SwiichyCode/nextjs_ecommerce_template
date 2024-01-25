"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./Navigation";
import { ProductNavItems, UserNavItems } from "./data";
import { ADMIN_URL, PRODUCT_URL, USER_URL } from "@/constants/urls";

export const SubNavigation = () => {
  const pathname = usePathname();

  const handleTitleTransform = () => {
    if (pathname.startsWith(PRODUCT_URL)) return "Products";
    if (pathname.startsWith(USER_URL)) return "Users";
  };

  const handleNavigation = () => {
    if (pathname.startsWith(PRODUCT_URL))
      return (
        <Navigation navTitle="Product management" navItems={ProductNavItems} />
      );

    if (pathname.startsWith(USER_URL))
      return <Navigation navTitle="User management" navItems={UserNavItems} />;
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
