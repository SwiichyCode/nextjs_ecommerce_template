import type { CartItemWithProduct } from "../components/ShoppingCart";
import type { ProductCart } from "../stores/useCartStore";

export const transformCartData = (
  cartItems: CartItemWithProduct[],
): ProductCart[] => {
  return cartItems.map((item) => ({
    id: item.product.id,
    name: item.product.name,
    description: item.product.description,
    pictures: item.product.pictures,
    price: item.product.price,
    stock: item.product.stock,
    weight: item.product.weight,
    status: item.product.status,
    slug: item.product.slug,
    createdAt: item.product.createdAt,
    quantity: item.quantity, // assuming CartItemWithProduct has a quantity property
  }));
};
