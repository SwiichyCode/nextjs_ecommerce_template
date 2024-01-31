"use server";

import ProductService from "@/features/Admin/services/productService";

export const isProductAvailable = async (productId: number) => {
  const product = await ProductService.updatedProducts();
  const currentProduct = product.find((p) => p.id === productId);

  if (!currentProduct) {
    throw new Error("product is not defined");
  }

  const isAvailable = currentProduct.stock > 0;

  return isAvailable;
};
