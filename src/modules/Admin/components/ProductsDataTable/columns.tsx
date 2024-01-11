"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import type { Product } from "@prisma/client";

const handleRewriteStatus = (status: string) => {
  if (status === "active") return "Actif";
  if (status === "draft") return "Brouillon";
  return "Actif";
};

const handleStyleStatus = (status: string) => {
  if (status === "active") return "bg-green-100 text-green-800";
  if (status === "draft") return "bg-red-100 text-red-800";
  return "bg-green-100 text-green-800";
};

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "picture",
    header: "Image",
    cell: ({ row }) => {
      const { pictures } = row.original;

      return (
        <Image
          className="h-10 w-10 rounded object-cover"
          src={pictures[0]!}
          width={40}
          height={40}
          alt=""
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const { status } = row.original;

      const statusClass = cn(
        "inline-flex items-center px-2.5 py-1.5 rounded text-xs font-medium",
        handleStyleStatus(status),
      );

      return <span className={statusClass}>{handleRewriteStatus(status)}</span>;
    },
  },
  {
    accessorKey: "price",
    header: "Prix",
    cell: ({ row }) => {
      const { price } = row.original;

      return <span>{price} €</span>;
    },
  },
  {
    accessorKey: "stock",
    header: "En stock",
  },
  {
    accessorKey: "weight",
    header: "Poids",
    cell: ({ row }) => {
      const { weight } = row.original;

      return <span>{weight} kg</span>;
    },
  },
];
