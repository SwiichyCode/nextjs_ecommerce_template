import React from "react";

type Props = {
  children: React.ReactNode;
};

export const Header = ({ children }: Props) => {
  return (
    <header className="container flex items-center justify-between px-14 py-9">
      {children}
    </header>
  );
};
