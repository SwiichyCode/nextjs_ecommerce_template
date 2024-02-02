import { db } from "@/server/db";
import type { z } from "zod";
import type {
  productActionSchema,
  updateProductActionSchema,
  deleteProductActionSchema,
  updateProductStatusActionSchema,
} from "../actions/action_schema";
import type { Product } from "@prisma/client";

type ResolvedType<T> = T extends Promise<infer R> ? R : never;

class ProductService {
  static async findProducts() {
    const products = await db.product.findMany();
    return products;
  }

  static async findProduct(params: { id: string }) {
    const product = await db.product.findUnique({
      where: { id: Number(params.id) },
      include: {
        variants: {
          include: {
            optionValues: true,
          },
        },
      },
    });

    return product;
  }

  static async updatedProducts() {
    const products = await db.product.findMany();
    const checkoutSessions = await db.checkoutSession.findMany();

    const updatedProducts: Product[] = products.map((product) => {
      const sessionsForProduct = checkoutSessions.filter((session) =>
        session.productIds.includes(product.id),
      );
      const totalQuantityOrdered = sessionsForProduct.reduce(
        (total, session) =>
          total + session.quantities[session.productIds.indexOf(product.id)]!,
        0,
      );
      return { ...product, stock: product.stock - totalQuantityOrdered };
    });

    return { products, updatedProducts };
  }

  static async createProduct(data: z.infer<typeof productActionSchema>) {
    if (!data) return;

    const { name, description, pictures, price, stock, weight } = data;
    const slug = data.name.toLowerCase().replace(/\s/g, "-");

    await db.product.create({
      data: {
        name,
        description,
        price,
        stock,
        pictures,
        weight,
        variants: {
          create: data.variants.map((variant) => {
            const { name, optionValues } = variant;

            return {
              name,
              optionValues: {
                create: optionValues.map((optionValue) => {
                  const { name, price, stock } = optionValue;

                  return {
                    name,
                    price: price,
                    stock: stock,
                  };
                }),
              },
            };
          }),
        },
        slug,
      },
    });
  }

  static async updateProduct(data: z.infer<typeof updateProductActionSchema>) {
    if (!data) return;

    const { id, name, description, pictures, price, stock, weight } = data;

    await db.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        stock,
        pictures,
        weight,

        variants: {
          deleteMany: {},
          create: data.variants.map((variant) => {
            const { name, optionValues } = variant;

            return {
              name,
              optionValues: {
                create: optionValues.map((optionValue) => {
                  const { name, price, stock } = optionValue;

                  return {
                    name,
                    price: price,
                    stock: stock,
                  };
                }),
              },
            };
          }),
        },
      },
    });
  }

  static async updateProductStatus(
    data: z.infer<typeof updateProductStatusActionSchema>,
  ) {
    if (!data) return;

    const { id, status } = data;

    await db.product.update({
      where: { id },
      data: {
        status,
      },
    });
  }

  static async deleteProduct(data: z.infer<typeof deleteProductActionSchema>) {
    if (!data) return;

    const { id } = data;

    await db.product.delete({ where: { id } });
  }
}

export type ProductWithVariants = ResolvedType<
  ReturnType<typeof ProductService.findProduct>
>;

export default ProductService;
