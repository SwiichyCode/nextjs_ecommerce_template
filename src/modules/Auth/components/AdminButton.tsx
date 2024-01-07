import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";
import { Button } from "@/components/ui/button";

export const AdminButton = async () => {
  const session = await getServerAuthSession();

  if (session?.user.role !== "admin") return null;

  return (
    <Button>
      <Link href="/admin">Admin</Link>
    </Button>
  );
};
