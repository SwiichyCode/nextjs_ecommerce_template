"use client";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

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
  },
  {
    accessorKey: "price",
    header: "Prix",
  },
  {
    accessorKey: "stock",
    header: "En stock",
  },
  {
    accessorKey: "weight",
    header: "Poids",
  },
];
