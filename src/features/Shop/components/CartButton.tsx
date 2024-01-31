import { Button } from "@/components/ui/button";
import IconCart from "@/components/ui/icons/IconCart";
import { useCartState } from "../stores/useCartStore";

type Props = {
  cartCount: number;
};

export const CartButton = ({ cartCount }: Props) => {
  const { toggle } = useCartState();

  return (
    <Button variant={"ghost"} onClick={toggle} className="relative">
      <IconCart width={24} height={24} />
      {cartCount > 0 && (
        <span className="absolute right-0 top-0 inline-flex -translate-y-1/4 translate-x-1/4 transform items-center justify-center rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-medium text-white">
          {cartCount}
        </span>
      )}
    </Button>
  );
};
