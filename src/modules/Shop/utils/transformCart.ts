import { getQuantityOfItemInCart } from "./getQuantityOfItemInCart";
import type { Cart, Product } from "@prisma/client";

interface ProductCart extends Product {
  quantity: number;
}

export const transformCart = (cart: Cart | null, products: Product[]) => {
  const quantities = getQuantityOfItemInCart(cart);

  return products.reduce((acc: ProductCart[], product) => {
    if (cart?.productIds.includes(product.id)) {
      acc.push({
        ...product,
        quantity: quantities[product.id] ?? 0,
      });
    }

    return acc;
  }, []);
};
