import { getStore } from "@netlify/blobs";
import type { Config } from "@netlify/functions";
import { isAuthorized } from "../lib/auth.mjs";
import { json, methodNotAllowed } from "../lib/http.mjs";
import { collectAssetKeys, isPortfolioContent } from "../lib/portfolio.mjs";

const CONTENT_KEY = "current";

export default async function handler(request: Request) {
  const contentStore = getStore("portfolio-content");

  if (request.method === "GET") {
    const content = await contentStore.get(CONTENT_KEY, { type: "json", consistency: "strong" });
    if (!content) return json({ error: "Portfolio hali serverga saqlanmagan." }, { status: 404 });
    return json(content);
  }

  if (request.method !== "PUT") return methodNotAllowed(["GET", "PUT"]);
  if (!isAuthorized(request)) return json({ error: "Admin sessiyasi talab qilinadi." }, { status: 401 });

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > 1_500_000) return json({ error: "Kontent hajmi me’yordan katta." }, { status: 413 });

  let content: unknown;
  try {
    content = await request.json();
  } catch {
    return json({ error: "Portfolio JSON formati noto‘g‘ri." }, { status: 400 });
  }
  if (!isPortfolioContent(content)) return json({ error: "Portfolio tuzilishi noto‘g‘ri." }, { status: 422 });
  if (JSON.stringify(content).includes("data:image/")) {
    return json({ error: "Rasmlar avval serverga yuklanishi kerak." }, { status: 422 });
  }

  const previous = await contentStore.get(CONTENT_KEY, { type: "json", consistency: "strong" });
  await contentStore.setJSON(CONTENT_KEY, content);

  if (previous) {
    const oldKeys = collectAssetKeys(previous);
    const currentKeys = collectAssetKeys(content);
    const orphaned = [...oldKeys].filter((key) => !currentKeys.has(key));
    if (orphaned.length) {
      const assetStore = getStore("portfolio-assets");
      await Promise.allSettled(orphaned.map((key) => assetStore.delete(key)));
    }
  }

  return json({ content, savedAt: new Date().toISOString() });
}

export const config: Config = { path: "/api/portfolio" };
