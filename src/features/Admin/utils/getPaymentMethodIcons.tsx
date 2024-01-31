import Image from "next/image";
import type { PaymentMethodOptionsType } from "../types/payment.type";

const PaymentMethodIcons = (type: PaymentMethodOptionsType) => {
  return (
    <Image
      key={type}
      src={`/icons/${type}.svg`}
      alt={type}
      width={24}
      height={24}
    />
  );
};

export const getPaymentMethodIcons = (types: string[]) => {
  return types.map((type) => {
    return PaymentMethodIcons(type as PaymentMethodOptionsType);
  });
};
