import { getServerAuthSession } from "@/server/auth";
import { AdminButton } from "@/modules/Auth/components/AdminButton";
import { LoginButton } from "@/modules/Auth/components/LoginButton";
import { LogoutButton } from "@/modules/Auth/components/LogoutButton";
import { CheckoutButton } from "@/modules/Auth/components/CheckoutButton";

export default async function HomePage() {
  const session = await getServerAuthSession();

  return (
    <main>
      <CheckoutButton />
      <AdminButton />
      <LoginButton />
      {session && <LogoutButton />}
    </main>
  );
}
