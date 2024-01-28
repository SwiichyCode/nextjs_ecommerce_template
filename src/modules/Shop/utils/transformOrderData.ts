import type { OrderWithProduct } from "@/modules/Shop/types/order.type";

export const transformOrderData = (order: OrderWithProduct) => {
  return order.orderItem.map((item) => ({
    ...item.product,
    quantity: item.quantity,
  }));
};
