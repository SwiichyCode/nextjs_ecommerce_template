import { useState, type ChangeEvent } from "react";

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

  const removeImage = (url: string) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((image) => image !== url),
    );
  };

  return { selectedImages, setSelectedImages, handleImageChange, removeImage };
};
