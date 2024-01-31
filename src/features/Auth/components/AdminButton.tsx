import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";
import { Button } from "@/components/ui/button";
import { Role } from "@/constants/enum";

export const AdminButton = async () => {
  const session = await getServerAuthSession();

  if (session?.user.role !== Role.ADMIN) return null;

  return (
    <Button>
      <Link prefetch={false} href="/admin">
        Admin
      </Link>
    </Button>
  );
};
