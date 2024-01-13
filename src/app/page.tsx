import { getServerAuthSession } from "@/server/auth";
import { AdminButton } from "@/modules/Auth/components/AdminButton";
import { LoginButton } from "@/modules/Auth/components/LoginButton";
import { LogoutButton } from "@/modules/Auth/components/LogoutButton";
import { CheckoutButton } from "@/modules/Auth/components/CheckoutButton";

import { Header } from "@/modules/Landing/Header";
import { Hero } from "@/modules/Landing/Hero";
import { SecondaryFeatures } from "@/modules/Landing/SecondaryFeatures";
import { Footer } from "@/modules/Landing/Footer";

export default async function HomePage() {
  const session = await getServerAuthSession();

  console.log(session);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <SecondaryFeatures />
      </main>
      <Footer />
      {/* <CheckoutButton />
      <AdminButton />
      <LoginButton />
      {session && <LogoutButton />} */}
    </>
  );
}
