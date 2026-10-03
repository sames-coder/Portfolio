import { createHash, createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "portfolio_admin_session";
const SESSION_LIFETIME_SECONDS = 60 * 60 * 12;

function encode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function safeEqual(left: string, right: string) {
  const leftHash = createHash("sha256").update(left).digest();
  const rightHash = createHash("sha256").update(right).digest();
  return timingSafeEqual(leftHash, rightHash);
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function readCookie(request: Request, name: string) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  for (const part of cookieHeader.split(";")) {
    const [key, ...value] = part.trim().split("=");
    if (key === name) return value.join("=");
  }
  return undefined;
}

export function isAdminConfigured() {
  return Boolean(process.env.PORTFOLIO_ADMIN_PASSWORD && process.env.PORTFOLIO_SESSION_SECRET);
}

export function passwordIsValid(password: string) {
  const expected = process.env.PORTFOLIO_ADMIN_PASSWORD;
  return Boolean(expected && password && safeEqual(password, expected));
}

export function createSessionCookie() {
  const secret = process.env.PORTFOLIO_SESSION_SECRET;
  if (!secret) throw new Error("PORTFOLIO_SESSION_SECRET is not configured.");

  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_LIFETIME_SECONDS;
  const payload = encode(JSON.stringify({ expiresAt }));
  const token = `${payload}.${sign(payload, secret)}`;
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_LIFETIME_SECONDS}`;
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

export function isAuthorized(request: Request) {
  const secret = process.env.PORTFOLIO_SESSION_SECRET;
  const token = readCookie(request, COOKIE_NAME);
  if (!secret || !token) return false;

  const separator = token.lastIndexOf(".");
  if (separator < 1) return false;
  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  if (!safeEqual(signature, sign(payload, secret))) return false;

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { expiresAt?: number };
    return typeof session.expiresAt === "number" && session.expiresAt > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

