"use client";

import { usePathname } from "next/navigation";
import { ButtonHistoryBack } from "@/modules/Admin/components/common/ButtonHistoryBack";
import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const pathname = usePathname();
  const lastElement = pathname.split("/").pop();

  const TitleWrapper = ({ children }: PropsWithChildren) => {
    return <div className="flex items-center gap-4">{children}</div>;
  };

  type TitleProps = {
    children: React.ReactNode;
    className?: string;
  };

  const Title = ({ className, children }: TitleProps) => {
    return <h1 className={cn("text-3xl font-bold", className)}>{children}</h1>;
  };

  const handleChildren = () => {
    switch (lastElement) {
      case "add":
        return (
          <TitleWrapper>
            <ButtonHistoryBack withArrow />
            <Title>Add a product</Title>
          </TitleWrapper>
        );
      case "edit":
        return (
          <TitleWrapper>
            <ButtonHistoryBack withArrow />
            <Title>Edit your product</Title>
          </TitleWrapper>
        );
      default:
        return <Title className="capitalize">{lastElement}</Title>;
    }
  };

  return (
    <header className="container flex items-center justify-between px-14 py-9">
      {handleChildren()}
    </header>
  );
};
