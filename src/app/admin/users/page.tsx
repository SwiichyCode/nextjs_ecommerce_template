import { Header } from "@/modules/Admin/components/Header";
import { DataTable } from "@/modules/Admin/components/ProductsDataTable";
import { userColumns } from "@/modules/Admin/components/UsersDataTable/column";
import { db } from "@/server/db";

export default async function UsersPage() {
  const users = await db.user.findMany();
  console.log(users);

  return (
    <>
      <Header>
        <h1 className="text-3xl font-bold">Utilisateurs</h1>
      </Header>
      <div className="mx-auto w-full max-w-5xl px-14">
        <DataTable columns={userColumns} data={users} />
      </div>
    </>
  );
}
