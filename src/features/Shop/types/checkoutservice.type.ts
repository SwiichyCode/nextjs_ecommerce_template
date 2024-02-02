import Stripe from "stripe";

interface productStockType {
  productIds: number[];
  quantities: number[];
}

export interface createCheckoutSessionType extends productStockType {
  sessionId: string;
  userId: string;
  sessionUrl: string;
}

export type findCheckoutSessionType = {
  sessionId: string;
};

export type removeCheckoutSessionType = {
  sessionId: string;
};

export interface updateProductStockType extends productStockType {}

export type getOrderType = {
  sessionId?: string;
  paymentIntentId?: string;
};

export type createOrderType = {
  sessionId: string;
  userId: string;
  orderNumber: string;
  idempotencyKey?: string;
  paymentIntentId: string;
  customerInformationId: number;
  amountTotal: number;
};

export type createOrderItemType = {
  orderId: number;
  productId: number;
  quantity: number;
};

export type createCustomerInformationType = {
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type processCheckoutSessionType = {
  sessionId: string;
  paymentIntentId: string;
  idempotencyKey?: string;
  customer_name: string;
  customer_address: Stripe.Address;
  amount_total: number;
};
