import { Button } from "@/components/ui/button";
import IconCart from "@/components/ui/icons/IconCart";
import { useCartState } from "../stores/useCartStore";

export const CartButton = () => {
  const { toggle } = useCartState();

  return (
    <Button variant={"ghost"} onClick={toggle}>
      <IconCart width={24} height={24} />
    </Button>
  );
};
