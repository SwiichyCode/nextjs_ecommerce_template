import { ChangeEvent, useState } from "react";

export const useImageChange = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

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
