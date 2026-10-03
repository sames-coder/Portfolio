import { getStore } from "@netlify/blobs";
import type { Config, Context } from "@netlify/functions";
import { json, methodNotAllowed } from "../lib/http.mjs";

export default async function handler(request: Request, context: Context) {
  if (request.method !== "GET") return methodNotAllowed(["GET"]);
  const key = context.params.id;
  if (!key || !/^[a-zA-Z0-9_-]+$/.test(key)) return json({ error: "Rasm identifikatori noto‘g‘ri." }, { status: 400 });

  const asset = await getStore("portfolio-assets").getWithMetadata(key, {
    type: "arrayBuffer",
    consistency: "strong",
  });
  if (!asset) return json({ error: "Rasm topilmadi." }, { status: 404 });

  const contentType = typeof asset.metadata.contentType === "string" ? asset.metadata.contentType : "application/octet-stream";
  return new Response(asset.data, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export const config: Config = { path: "/api/portfolio/assets/:id", method: "GET" };
