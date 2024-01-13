import {
  type Control,
  type FieldError,
  type Path,
  type RegisterOptions,
  type FieldValues,
} from "react-hook-form";
import {
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface FormInputControllerProps<FieldsType extends FieldValues> {
  name: Path<FieldsType>;
  defaultValue?: FieldsType[Path<FieldsType>];
  rules?: RegisterOptions;
  error?: FieldError;
  control: Control<FieldsType>;
  type?: string;
  onChange?: (value: unknown) => void;
  cardWrapper?: boolean;
  className?: string;
}

export interface Field<FieldsType extends FieldValues>
  extends FormInputControllerProps<FieldsType> {
  label?: string;
  placeholder?: string;
}

export const ControlledTextField = <FieldsType extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  defaultValue,
  onChange,
  cardWrapper = true,
  className,
}: Field<FieldsType>) => {
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={cn(cardWrapper && "card", className)}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              id={name as string}
              type={type}
              onChange={
                onChange ??
                ((e) =>
                  field.onChange(
                    type === "number" ? Number(e.target.value) : e.target.value,
                  ))
              }
            />
          </FormControl>
          <FormMessage>{error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};
