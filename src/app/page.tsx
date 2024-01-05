import { getServerAuthSession } from "@/server/auth";
import { LoginButton } from "@/components/LoginButton";
import { LogoutButton } from "@/components/LogoutButton";
import { CheckoutButton } from "@/components/CheckoutButton";

export default async function HomePage() {
  const session = await getServerAuthSession();

  return (
    <main>
      <CheckoutButton />
      <LoginButton />
      {session && <LogoutButton />}
    </main>
  );
}
