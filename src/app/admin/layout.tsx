import { Sidebar } from "@/modules/Admin/components/layouts/Sidebar";
import { SubNavigation } from "@/modules/Admin/components/layouts/SubNavigation";

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <div className="flex text-primary">
      <div className="flex h-screen">
        <Sidebar />
        <SubNavigation />
      </div>

      <main className="flex h-screen w-full flex-col overflow-scroll bg-primary pb-9">
        {children}
      </main>
    </div>
  );
}
