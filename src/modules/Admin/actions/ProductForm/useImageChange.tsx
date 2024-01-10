import { ChangeEvent, useState } from "react";

export const useImageChange = (defaultImages: string[] = []) => {
  const [selectedImages, setSelectedImages] = useState<string[]>(defaultImages);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file),
      );

      setSelectedImages((prevImages) => prevImages.concat(filesArray));
    }
  };

  return { selectedImages, setSelectedImages, handleImageChange };
};
