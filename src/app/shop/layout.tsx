import { getServerAuthSession } from "@/server/auth";
import CartService from "@/modules/Shop/services/cartService";
import Header from "@/modules/Shop/components/Header";

type Props = {
  children: React.ReactNode;
};
export default async function ShopLayout({ children }: Props) {
  const session = await getServerAuthSession();

  const cart = session?.user?.id
    ? await CartService.getCart(session.user.id)
    : null;

  return (
    <>
      <Header session={session} cart={cart} />
      {children}
    </>
  );
}
