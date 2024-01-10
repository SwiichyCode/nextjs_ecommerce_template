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

// import { ChangeEvent, useState } from "react";
// import { ControllerRenderProps } from "react-hook-form";
// import { formSchema } from "./schema";
// import type * as z from "zod";
// import imageCompression, { Options } from "browser-image-compression";

// export const useFileChange = () => {
//   const [files, setFiles] = useState<File[]>([]);

//   const handleFileChange = async (
//     e: ChangeEvent<HTMLInputElement>,
//     field: ControllerRenderProps<z.infer<typeof formSchema>, "pictures">,
//   ) => {
//     if (e.target.files) {
//       const newFiles = Array.from(e.target.files);

//       // Compress each file
//       const compressedFiles = await Promise.all(
//         newFiles.map(async (file) => {
//           const options: Options = {
//             maxSizeMB: 1, // (max file size in MB)
//             maxWidthOrHeight: 1920, // (max pixel in width or height)
//             useWebWorker: true,
//           };
//           const compressedFile = await imageCompression(file, options);
//           return compressedFile;
//         }),
//       );

//       setFiles((prevFiles) => [...prevFiles, ...compressedFiles]);

//       field.onChange([...files, ...compressedFiles]);
//     }
//   };

//   return { files, handleFileChange };
// };
