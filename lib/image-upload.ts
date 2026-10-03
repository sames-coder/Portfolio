type ImagePreset = "avatar" | "logo" | "screenshot";

const presets: Record<ImagePreset, { maxWidth: number; maxHeight: number; quality: number }> = {
  avatar: { maxWidth: 900, maxHeight: 1125, quality: 0.86 },
  logo: { maxWidth: 512, maxHeight: 512, quality: 0.9 },
  screenshot: { maxWidth: 1080, maxHeight: 2200, quality: 0.84 },
};

export function optimizeImage(file: File, preset: ImagePreset): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Faqat rasm fayllarini yuklash mumkin."));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Rasmni o‘qib bo‘lmadi."));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("Rasm formati qo‘llab-quvvatlanmaydi."));
      image.onload = () => {
        const { maxWidth, maxHeight, quality } = presets[preset];
        const ratio = Math.min(1, maxWidth / image.width, maxHeight / image.height);
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * ratio));
        canvas.height = Math.max(1, Math.round(image.height * ratio));
        const context = canvas.getContext("2d");
        if (!context) {
          reject(new Error("Rasmni tayyorlab bo‘lmadi."));
          return;
        }
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/webp", quality));
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}
