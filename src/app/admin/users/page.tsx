import { RoleForm } from '@/features/Admin/components/forms/updateuserrole.form';
import { DataTable } from '@/features/Admin/components/ProductsDataTable';
import { userColumns } from '@/features/Admin/components/UsersDataTable/column';
import { db } from '@/server/db';

export default async function UsersPage() {
  const users = await db.user.findMany();

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-14">
      <RoleForm />
      <DataTable columns={userColumns} data={users} />
    </div>
  );
}
