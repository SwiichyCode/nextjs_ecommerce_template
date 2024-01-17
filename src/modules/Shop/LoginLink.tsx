import Link from "next/link";
import { SHOP_LOGIN_URL } from "@/constants/urls";
import type { Session } from "next-auth";

type Props = {
  session: Session | null;
};

export const LoginLink = async ({ session }: Props) => {
  return (
    <Link
      href={session ? "/api/auth/signout" : SHOP_LOGIN_URL}
      className="ml-auto rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {session ? "Log out" : "Log in"}
    </Link>
  );
};
