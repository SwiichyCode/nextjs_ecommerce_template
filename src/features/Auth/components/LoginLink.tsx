import Link from "next/link";
import { signOut } from "next-auth/react";
import { SHOP_LOGIN_URL } from "@/constants/urls";
import type { Session } from "next-auth";

type Props = {
  session: Session | null;
};

export const LoginLink = ({ session }: Props) => {
  return (
    <Link
      href={session ? "#" : SHOP_LOGIN_URL}
      onClick={session ? () => signOut() : undefined}
      className={
        "rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      }
    >
      {session ? "Log out" : "Log in"}
    </Link>
  );
};
