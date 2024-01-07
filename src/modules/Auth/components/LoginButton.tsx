import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";
import { Button } from "@/components/ui/button";

export const LoginButton = async () => {
  const session = await getServerAuthSession();

  if (session) return null;

  return (
    <Button>
      <Link href="api/auth/signin">Login</Link>
    </Button>
  );
};
