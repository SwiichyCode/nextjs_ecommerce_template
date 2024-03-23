export type PaymentMethodOptionsType =
  | 'acss_debit'
  | 'affirm'
  | 'afterpay_clearpay'
  | 'alipay'
  | 'au_becs_debit'
  | 'bacs_debit'
  | 'bancontact'
  | 'blik'
  | 'boleto'
  | 'card'
  | 'card_present'
  | 'cashapp'
  | 'customer_balance'
  | 'eps'
  | 'fpx'
  | 'giropay'
  | 'grabpay'
  | 'ideal'
  | 'interac_present'
  | 'klarna'
  | 'konbini'
  | 'link'
  | 'oxxo'
  | 'p24'
  | 'paynow'
  | 'paypal'
  | 'pix'
  | 'promptpay'
  | 'revolut_pay'
  | 'sepa_debit'
  | 'sofort'
  | 'us_bank_account'
  | 'wechat_pay'
  | 'zip';

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELED = 'canceled',
}
