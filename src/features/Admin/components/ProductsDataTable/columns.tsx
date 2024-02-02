"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import type { Product } from "@prisma/client";
import { ProductStatus } from "@/constants/enum";
import { PRODUCT_LENGTH_ALERT } from "@/constants";

const handleRewriteStatus = (status: ProductStatus) => {
  if (status === ProductStatus.ACTIVE) return "Actif";
  if (status === ProductStatus.DRAFT) return "Brouillon";
  return "Actif";
};

const handleStyleStatus = (status: ProductStatus) => {
  if (status === ProductStatus.ACTIVE) return "bg-green-100 text-green-800";
  if (status === ProductStatus.DRAFT) return "bg-red-100 text-red-800";
  return "bg-green-100 text-green-800";
};

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "picture",
    header: "Image",
    cell: ({ row }) => {
      const { pictures } = row.original;

      if (!pictures.length) return null;

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
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status } = row.original;

      const statusClass = cn(
        "inline-flex items-center px-2.5 py-1.5 rounded text-xs font-medium",
        handleStyleStatus(status as ProductStatus),
      );

      return (
        <span className={statusClass}>
          {handleRewriteStatus(status as ProductStatus)}
        </span>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const { price } = row.original;

      return <span>{price} €</span>;
    },
  },
  {
    accessorKey: "stock",
    header: "In stock",
    cell: ({ row }) => {
      const { stock } = row.original;

      return (
        <span className={cn(stock <= PRODUCT_LENGTH_ALERT && "text-red-500")}>
          {stock}
        </span>
      );
    },
  },
  {
    accessorKey: "weight",
    header: "Weight",
    cell: ({ row }) => {
      const { weight } = row.original;

      return <span>{weight} kg</span>;
    },
  },
];
