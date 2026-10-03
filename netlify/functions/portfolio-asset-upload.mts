import { randomUUID } from "node:crypto";
import { getStore } from "@netlify/blobs";
import type { Config } from "@netlify/functions";
import { isAuthorized } from "../lib/auth.mjs";
import { json, methodNotAllowed } from "../lib/http.mjs";

const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_IMAGE_BYTES = 1_000_000;

export default async function handler(request: Request) {
  if (request.method !== "POST") return methodNotAllowed(["POST"]);
  if (!isAuthorized(request)) return json({ error: "Admin sessiyasi talab qilinadi." }, { status: 401 });

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > 1_500_000) return json({ error: "Rasm hajmi me’yordan katta." }, { status: 413 });

  let dataUrl = "";
  try {
    const body = await request.json() as { dataUrl?: unknown };
    if (typeof body.dataUrl === "string") dataUrl = body.dataUrl;
  } catch {
    return json({ error: "Rasm so‘rovi noto‘g‘ri." }, { status: 400 });
  }

  const match = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/.exec(dataUrl);
  if (!match || !ALLOWED_MIME_TYPES.has(match[1])) return json({ error: "Faqat JPG, PNG yoki WEBP rasm qabul qilinadi." }, { status: 415 });

  const bytes = Buffer.from(match[2], "base64");
  if (!bytes.length || bytes.length > MAX_IMAGE_BYTES) return json({ error: "Optimallashtirilgan rasm 1 MB dan kichik bo‘lishi kerak." }, { status: 413 });

  const key = randomUUID();
  await getStore("portfolio-assets").set(key, Uint8Array.from(bytes).buffer, {
    metadata: { contentType: match[1], uploadedAt: new Date().toISOString() },
  });

  return json({ url: `/api/portfolio/assets/${key}` }, { status: 201 });
}

export const config: Config = { path: "/api/portfolio/assets", method: "POST" };
