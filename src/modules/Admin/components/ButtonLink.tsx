import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  href: string;
  src?: string;
};

export const ButtonLink = ({ href, src }: Props) => {
  return (
    <Button className="gap-2" asChild>
      <Link href={href}>
        {src && <Image src={src} width={12} height={12} alt="" />}
        Add a product
      </Link>
    </Button>
  );
};
