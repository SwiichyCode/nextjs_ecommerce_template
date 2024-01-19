import { useState, type ChangeEvent } from "react";
import type { ControllerRenderProps } from "react-hook-form";
import type * as z from "zod";
import type { formProductSchema } from "./_schema";

export const useFileChange = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<z.infer<typeof formProductSchema>, "pictures">,
  ) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);

      field.onChange([...files, ...newFiles]);
    }
  };

  return { files, handleFileChange };
};
