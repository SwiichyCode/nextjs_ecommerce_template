import React, { PropsWithChildren, Suspense } from "react";
import { TabsProfile } from "@/features/Shop/components/TabsProfile";

export default function ProfileLayout({ children }: PropsWithChildren) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <TabsProfile />

        <div className="py-16 sm:py-16">{children}</div>
      </div>
    </div>
  );
}
