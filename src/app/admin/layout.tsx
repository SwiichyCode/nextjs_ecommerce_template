import { Sidebar } from "@/modules/Admin/components/Sidebar";
import { SubNavigation } from "@/modules/Admin/components/SubNavigation";

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <div className="text-primary flex">
      <div className="flex h-screen">
        <Sidebar />
        <SubNavigation />
      </div>

      <main className="bg-primary flex h-screen w-full flex-col overflow-scroll pb-9">
        {children}
      </main>
    </div>
  );
}
