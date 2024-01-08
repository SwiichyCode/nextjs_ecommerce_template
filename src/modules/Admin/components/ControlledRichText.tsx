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
import { TipTap } from "@/components/ui/tip-tap";
import { Field } from "./ControlledTextField";

export const ControlledRichTextField = <FieldsType extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: Field<FieldsType>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="rounded border border-[#EAEAEF] bg-white px-6 py-6 shadow-sm">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <TipTap description={field.value} onChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
