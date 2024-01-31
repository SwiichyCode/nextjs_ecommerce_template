import { TipTap } from "@/components/ui/tip-tap";

import type { FieldValues } from "react-hook-form";
import {
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import type { Field } from "./ControlledTextField";

export const ControlledRichTextField = <FieldsType extends FieldValues>({
  control,
  name,
  label,
}: Field<FieldsType>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="card">
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
