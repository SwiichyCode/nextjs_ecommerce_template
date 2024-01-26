"use client";

import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();
  const lastElement = pathname.split("/").pop();

  return (
    <header className="container flex items-center justify-between px-14 py-9">
      <h1 className="text-3xl font-bold capitalize">{lastElement}</h1>
    </header>
  );
};
