"use client";

import { usePathname } from "next/navigation";

export const SubNavigation = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

  const handleTitleTransform = (title: string) => {
    switch (title) {
      case "products":
        return "produits";
    }
  };

  if (pathname === "/admin") return null;

  return (
    <section className="w-full min-w-60 border-r border-[#E4E4EB] px-6">
      <h1 className="py-4 text-xl font-bold capitalize">
        {handleTitleTransform(lastSegment!)}
      </h1>
    </section>
  );
};
