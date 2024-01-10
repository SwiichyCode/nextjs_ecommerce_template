import { ChangeEvent, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { formSchema } from "./schema";
import type * as z from "zod";

export const useFileChange = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<z.infer<typeof formSchema>, "pictures">,
  ) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);

      field.onChange([...files, ...newFiles]);
    }
  };

  return { files, handleFileChange };
};
