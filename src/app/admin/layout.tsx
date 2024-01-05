import { Sidebar } from "@/components/modules/Admin/Sidebar";

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <main className="flex w-full flex-col items-center">{children}</main>
    </div>
  );
}
