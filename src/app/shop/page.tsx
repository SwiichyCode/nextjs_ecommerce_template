import { getServerAuthSession } from "@/server/auth";
import Header from "@/modules/Shop/Header";
import ProductList from "@/modules/Shop/ProductList";

export default async function ShopPage() {
  const session = await getServerAuthSession();

  return (
    <>
      <Header session={session} />
      <ProductList />
    </>
  );
}
