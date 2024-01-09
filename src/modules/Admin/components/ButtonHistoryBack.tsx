"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export const ButtonHistoryBack = () => {
  const router = useRouter();

  return <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />;
};
