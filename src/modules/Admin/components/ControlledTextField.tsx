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

export interface FormInputControllerProps<FieldsType extends FieldValues> {
  name: Path<FieldsType>;
  defaultValue?: FieldsType[Path<FieldsType>];
  rules?: RegisterOptions;
  error?: FieldError;
  control: Control<FieldsType>;
  type?: string;
  onChange?: (value: unknown) => void;
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
}: Field<FieldsType>) => {
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <FormItem className="rounded border border-[#EAEAEF] bg-white px-6 py-6 shadow-sm">
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
