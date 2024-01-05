import { getServerAuthSession } from "@/server/auth";

export default async function AdminPage() {
  const session = await getServerAuthSession();

  if (session?.user.role !== "admin") return <div>Not authorized</div>;

  return (
    <div className="h-screen w-full items-center justify-center">
      <form></form>
    </div>
  );
}
