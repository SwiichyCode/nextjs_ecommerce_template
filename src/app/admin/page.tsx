import { getServerAuthSession } from "@/server/auth";
import { Role } from "@/constants/enum";

export default async function AdminPage() {
  const session = await getServerAuthSession();

  // This page is only accessible to users with the "admin" role.
  // If you want a user to access this page, you need to assign them the "admin" role in the database.
  // You can preview your database by running the command "npx prisma studio" in your terminal.

  if (session?.user.role !== Role.ADMIN) return <div>Not authorized</div>;

  return <div className="h-screen w-full items-center justify-center"></div>;
}
