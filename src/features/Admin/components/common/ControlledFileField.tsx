import type {
  Control,
  FieldValues,
  Path,
  ControllerRenderProps,
} from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DragAndDrop } from "../DragAndDropList";
import { FileCard } from "../FileCard";

interface FileFieldProps<FieldsType extends FieldValues> {
  direction?: "horizontal" | "vertical";
  control: Control<FieldsType>;
  name: Path<FieldsType>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FieldsType, any>,
  ) => void;
  selectedImages: any[];
  setSelectedImages: (items: any[]) => void;
  removeImage: (url: string) => void;
}

export const ControlledFileField = <FieldsType extends FieldValues>({
  direction = "vertical",
  control,
  name,
  handleImageChange,
  handleFileChange,
  selectedImages,
  setSelectedImages,
  removeImage,
}: FileFieldProps<FieldsType>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="card">
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
          <FormDescription>
            Always try to optimize your images before sending them.
          </FormDescription>
          <FormMessage />

          <DragAndDrop
            direction={direction}
            items={selectedImages}
            setItems={setSelectedImages}
            className="flex flex-wrap"
          >
            {(item, provided, index) => (
              <FileCard
                item={item}
                provided={provided}
                index={index}
                removeImage={removeImage}
              />
            )}
          </DragAndDrop>
        </FormItem>
      )}
    />
  );
};
