import { Sidebar } from "@/modules/Admin/components/layouts/Sidebar";
import { SubNavigation } from "@/modules/Admin/components/layouts/SubNavigation";
import { Suspense } from "react";
import Loading from "./loading";
import { Header } from "@/modules/Admin/components/layouts/Header";

type Props = {
  children: React.ReactNode;
  params: any;
};

export default function AdminLayout({ children }: Props) {
  return (
    <div className="flex text-primary">
      <div className="flex h-screen">
        <Sidebar />
        <SubNavigation />
      </div>

      <main className="flex h-screen w-full flex-col overflow-scroll bg-primary pb-9">
        <Header />

        {children}
      </main>
    </div>
  );
}
