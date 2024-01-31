import { Sidebar } from "@/features/Admin/components/layouts/Sidebar";
import { SubNavigation } from "@/features/Admin/components/layouts/SubNavigation";
import { Header } from "@/features/Admin/components/layouts/Header";

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
