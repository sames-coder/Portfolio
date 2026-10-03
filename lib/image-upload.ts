export type ImagePreset = "avatar" | "logo" | "screenshot";

const presets: Record<ImagePreset, { maxWidth: number; maxHeight: number; quality: number; maxBytes: number }> = {
  avatar: { maxWidth: 720, maxHeight: 900, quality: 0.82, maxBytes: 320_000 },
  logo: { maxWidth: 384, maxHeight: 384, quality: 0.86, maxBytes: 140_000 },
  screenshot: { maxWidth: 820, maxHeight: 1800, quality: 0.76, maxBytes: 480_000 },
};

function dataUrlBytes(value: string) {
  const comma = value.indexOf(",");
  return Math.ceil(((comma === -1 ? value.length : value.length - comma - 1) * 3) / 4);
}

function loadImage(source: string) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onerror = () => reject(new Error("Rasm formati qo‘llab-quvvatlanmaydi."));
    image.onload = () => resolve(image);
    image.src = source;
  }) as Promise<HTMLImageElement>;
}

async function compressSource(source: string, preset: ImagePreset) {
  const config = presets[preset];
  if (source.startsWith("data:image/webp") && dataUrlBytes(source) <= config.maxBytes) return source;

  const image = await loadImage(source);
  const baseRatio = Math.min(1, config.maxWidth / image.width, config.maxHeight / image.height);
  let best = source;

  for (const dimensionScale of [1, 0.88, 0.76, 0.64]) {
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.width * baseRatio * dimensionScale));
    canvas.height = Math.max(1, Math.round(image.height * baseRatio * dimensionScale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Rasmni tayyorlab bo‘lmadi.");
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    for (let quality = config.quality; quality >= 0.48; quality -= 0.07) {
      best = canvas.toDataURL("image/webp", quality);
      if (dataUrlBytes(best) <= config.maxBytes) return best;
    }
  }

  return best;
}

export async function optimizeDataUrl(source: string | undefined, preset: ImagePreset) {
  if (!source || !source.startsWith("data:image/")) return source;
  return compressSource(source, preset);
}

export function optimizeImage(file: File, preset: ImagePreset): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Faqat rasm fayllarini yuklash mumkin."));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Rasmni o‘qib bo‘lmadi."));
    reader.onload = async () => {
      try {
        resolve(await compressSource(String(reader.result), preset));
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsDataURL(file);
  });
}
