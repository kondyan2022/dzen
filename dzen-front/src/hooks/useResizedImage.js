import { useCallback, useState } from "react";

const MAX_IMAGE_SIZE = { width: 320, height: 240 };

export function useResizedImage() {
  const [image, setImage] = useState();
  const [ratio, setRatio] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadImage = useCallback((file) => {
    if (!file) {
      setImage(null);
      setRatio(0);
      return;
    }
    setLoading(true);
    const fileReader = new FileReader();
    const originalImage = document.createElement("img");
    fileReader.readAsDataURL(file);
    fileReader.onload = (fileReaderEvent) => {
      const imageAsBase64 = fileReaderEvent.target.result;
      originalImage.src = imageAsBase64;
    };
    originalImage.onload = () => {
      let resizingFactor = 1;
      if (
        originalImage.height > MAX_IMAGE_SIZE.height ||
        originalImage.width > MAX_IMAGE_SIZE.width
      ) {
        resizingFactor =
          (originalImage.height * MAX_IMAGE_SIZE.width) / originalImage.width >
          MAX_IMAGE_SIZE.height
            ? MAX_IMAGE_SIZE.height / originalImage.height
            : MAX_IMAGE_SIZE.width / originalImage.width;
      }
      setRatio(resizingFactor);
      if (resizingFactor === 1) {
        setImage(originalImage.src);
      } else {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = originalImage.width * resizingFactor;
        canvas.height = originalImage.height * resizingFactor;
        context.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
        const imageSrcData = canvas.toDataURL("image/jpeg", 98);
        setImage(imageSrcData);
      }
      setLoading(false);
    };
  }, []);

  return [image, loadImage, ratio, loading];
}
