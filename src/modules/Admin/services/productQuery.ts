import { db } from "@/server/db";

interface Product {
  name: string;
  description: string;
  pictures: string[];
  price: number;
  stock: number;
  weight: number;
  slug: string;
}

export const findProducts = async () => {
  const products = await db.product.findMany();
  return products;
};

export const findProduct = async (id: number) => {
  const product = await db.product.findUnique({
    where: { id },
  });

  return product;
};

export const createProduct = async (data: Product) => {
  const product = await db.product.create({
    data,
  });

  return product;
};
