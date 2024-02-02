import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconUser } from "@/components/ui/icons/IconUser";
import { useCartState } from "../stores/useCartStore";
import { SHOP_PROFILE_URL } from "@/constants/urls";

type Props = {
  className?: string;
};

export const ProfileButton = ({ className }: Props) => {
  return (
    <Button variant={"ghost"} className={className} asChild>
      <Link href={SHOP_PROFILE_URL}>
        <IconUser width={24} height={24} />
      </Link>
    </Button>
  );
};
