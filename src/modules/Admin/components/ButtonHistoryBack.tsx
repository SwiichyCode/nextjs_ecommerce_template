"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  withArrow?: boolean;
  children?: React.ReactNode;
};

export const ButtonHistoryBack = ({ withArrow, children }: Props) => {
  const router = useRouter();

  return (
    <Button variant={withArrow ? "ghost" : "default"}>
      {withArrow ? (
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
      ) : (
        children
      )}
    </Button>
  );
};
