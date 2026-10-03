const ASSET_PATH = "/api/portfolio/assets/";

export function isPortfolioContent(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const content = value as Record<string, unknown>;
  const profile = content.profile;
  return Boolean(
    profile && typeof profile === "object" && !Array.isArray(profile)
      && typeof (profile as Record<string, unknown>).name === "string"
      && Array.isArray(content.projects)
      && Array.isArray(content.experience)
      && Array.isArray(content.education)
      && Array.isArray(content.skills),
  );
}

export function collectAssetKeys(value: unknown, keys = new Set<string>()) {
  if (typeof value === "string" && value.startsWith(ASSET_PATH)) {
    const key = value.slice(ASSET_PATH.length).split(/[?#]/, 1)[0];
    if (key && /^[a-zA-Z0-9_-]+$/.test(key)) keys.add(key);
    return keys;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectAssetKeys(item, keys));
    return keys;
  }
  if (value && typeof value === "object") {
    Object.values(value).forEach((item) => collectAssetKeys(item, keys));
  }
  return keys;
}

