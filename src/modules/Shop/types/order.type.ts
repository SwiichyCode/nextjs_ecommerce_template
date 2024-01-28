import type { CustomerInformation, Order, Product } from "@prisma/client";

export interface OrderWithCustomerInformation extends Order {
  customerInformation: CustomerInformation;
}

export interface OrderWithProduct extends OrderWithCustomerInformation {
  orderItem: {
    product: Product;
    quantity: number;
  }[];
}

export interface OrderProduct extends Product {
  quantity: number;
}
