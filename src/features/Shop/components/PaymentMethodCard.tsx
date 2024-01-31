import Image from "next/image";
import type { CreditCard } from "../types/order.type";

type Props = {
  card: CreditCard;
};

// Add more card icons to the public/icons directory based on the cards accepted by your checkout session

export const PaymentMethodCard = ({ card }: Props) => {
  const renderCardIcon = () => {
    return (
      <div className="flex-none">
        <Image
          src={`/icons/${card}.svg`}
          width={36}
          height={24}
          alt={`${card}-icon`}
        />
        <p className="sr-only">{card}</p>
      </div>
    );
  };
  return renderCardIcon();
};
