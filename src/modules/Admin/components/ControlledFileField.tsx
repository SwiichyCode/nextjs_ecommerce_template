import {
  type Control,
  type FieldValues,
  type Path,
  ControllerRenderProps,
} from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DragAndDrop } from "./DragAndDropList";
import { FileCard } from "./FileCard";

interface FileFieldProps<FieldsType extends FieldValues> {
  control: Control<FieldsType>;
  name: Path<FieldsType>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FieldsType, any>,
  ) => void;
  selectedImages: any[];
  setSelectedImages: (items: any[]) => void;
}

export const ControlledFileField = <FieldsType extends FieldValues>({
  control,
  name,
  handleImageChange,
  handleFileChange,
  selectedImages,
  setSelectedImages,
}: FileFieldProps<FieldsType>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="rounded border border-[#EAEAEF] bg-white px-6 py-6 shadow-sm">
          <FormLabel>Media</FormLabel>
          <FormControl>
            <Input
              type="file"
              {...field}
              value={undefined}
              multiple={true}
              onChange={(e) => {
                handleImageChange(e);
                handleFileChange(e, field);
              }}
            />
          </FormControl>
          <FormMessage />

          <DragAndDrop items={selectedImages} setItems={setSelectedImages}>
            {(item, provided) => <FileCard item={item} provided={provided} />}
          </DragAndDrop>
        </FormItem>
      )}
    />
  );
};
