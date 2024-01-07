import { Sidebar } from "@/modules/Admin/components/Sidebar";
import { SubNavigation } from "@/modules/Admin/components/SubNavigation";

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <div className="flex w-full">
      <div className="fixed flex h-screen">
        <Sidebar />
        <SubNavigation />
      </div>

      <main className="flex w-full flex-col bg-[#F6F6F9] pb-9">{children}</main>
    </div>
  );
}
