import { Button, type buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  pending?: boolean;
}

export const SubmitButton = ({ children, pending, ...props }: Props) => {
  return (
    <Button type="submit" {...props}>
      {pending ? "Loading..." : children}
    </Button>
  );
};
