import axios from "axios";
import { env } from "@/env";
import type { PutBlobResult } from "@vercel/blob";

class ImageService {
  static async uploadImagesWithCloudinary(files: File[]) {
    if (!env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)
      throw new Error("process.env.CLOUDINARY_CLOUD_NAME not found");

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
  }

  static async uploadImagesWithVercelBlob(files: File[]): Promise<string[]> {
    const blobResults: PutBlobResult[] = [];
    for (const file of files) {
      const newBlob = await this.uploadFile(file);
      blobResults.push(newBlob);
    }
    return blobResults.map((blob) => blob.url);
  }

  private static async uploadFile(file: File): Promise<PutBlobResult> {
    const response = await fetch(
      `/api/products/image/upload?filename=${file.name}`,
      {
        method: "POST",
        body: file,
      },
    );
    const newBlob = (await response.json()) as PutBlobResult;
    return newBlob;
  }
}

export default ImageService;
