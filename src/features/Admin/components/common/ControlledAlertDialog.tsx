import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { SubmitButton } from "@/features/Auth/components/SubmitButton";

type Props = {
  title: string;
  description: string;
  open?: boolean;
  onCancel?: () => void;
  onContinue: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isPending: boolean;
  children: React.ReactNode;
};

export const ControlledAlertDialog = (props: Props) => {
  const {
    title,
    description,
    open,
    onCancel,
    onContinue,
    isPending,
    children,
  } = props;

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Annuler</AlertDialogCancel>
          <AlertDialogAction asChild>
            <SubmitButton onClick={(e) => onContinue(e)} pending={isPending}>
              Supprimer
            </SubmitButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
