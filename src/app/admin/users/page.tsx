import { RoleForm } from "@/modules/Admin/actions/UserForm/RoleForm";
import { Header } from "@/modules/Admin/components/Header";
import { DataTable } from "@/modules/Admin/components/ProductsDataTable";
import { userColumns } from "@/modules/Admin/components/UsersDataTable/column";
import { db } from "@/server/db";

export default async function UsersPage() {
  const users = await db.user.findMany();

  return (
    <>
      <Header>
        <div>
          <h1 className="text-3xl font-bold">Utilisateurs</h1>
          <p>{users.length} utilisateurs inscrits</p>
        </div>
      </Header>
      <div className="mx-auto w-full max-w-5xl space-y-8 px-14">
        <RoleForm />
        <DataTable columns={userColumns} data={users} />
      </div>
    </>
  );
}