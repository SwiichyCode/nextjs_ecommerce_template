import Link from "next/link";
import { Button } from "@/components/ui/button";

export const LoginButton = () => {
  return (
    <Button>
      <Link href="api/auth/signin">Login</Link>
    </Button>
  );
};
