import type { OrderWithProduct } from "@/features/Shop/types/order.type";

export const transformOrderData = (order: OrderWithProduct) => {
  return order.orderItem.map((item) => ({
    ...item.product,
    quantity: item.quantity,
  }));
};
