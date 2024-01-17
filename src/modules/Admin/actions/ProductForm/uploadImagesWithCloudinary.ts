import axios from "axios";
import { env } from "@/env";

if (!env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)
  throw new Error("process.env.CLOUDINARY_CLOUD_NAME not found");

export const uploadImagesWithCloudinary = async (files: File[]) => {
  const responses = await Promise.all(
    files.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "nolhuxxc");

      return axios.post(
        `https://api.cloudinary.com/v1_1/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
      );
    }),
  );

  return responses;
};
