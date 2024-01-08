import { getServerAuthSession } from "@/server/auth";
import { AdminButton } from "@/modules/Auth/components/AdminButton";
import { LoginButton } from "@/modules/Auth/components/LoginButton";
import { LogoutButton } from "@/modules/Auth/components/LogoutButton";
import { CheckoutButton } from "@/modules/Auth/components/CheckoutButton";
import Image from "next/image";

export default async function HomePage() {
  const session = await getServerAuthSession();

  return (
    <main>
      <CheckoutButton />
      <AdminButton />
      <LoginButton />
      {session && <LogoutButton />}

      <Image
        src="https://k4jlln3aspazn4y4.public.blob.vercel-storage.com/blue_diamond-XP6q9a4ppIeexwDLsj36Ixh2kDeftZ.jpg"
        alt="logo"
        width="100"
        height="100"
      />
    </main>
  );
}
