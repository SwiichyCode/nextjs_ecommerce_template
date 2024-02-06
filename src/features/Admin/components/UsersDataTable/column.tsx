'use client';

import { cn } from '@/lib/utils';
import type { User } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';

const handleStyleRole = (role: string) => {
  if (role === 'dev') return 'bg-blue-100 text-blue-800';
  if (role === 'admin') return 'bg-green-100 text-green-800';
  if (role === 'user') return 'bg-red-100 text-red-800';
  return 'bg-green-100 text-green-800';
};

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const { role } = row.original;

      const roleClass = cn(
        'inline-flex items-center px-2.5 py-1.5 rounded text-xs font-medium',
        handleStyleRole(role),
      );

      return <span className={roleClass}>{role}</span>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created on',
    cell: ({ row }) => {
      const { createdAt } = row.original;

      return (
        <span>
          {createdAt.toLocaleDateString('en-EN')} à{' '}
          {createdAt.toLocaleTimeString('en-EN')}
        </span>
      );
    },
  },
];
