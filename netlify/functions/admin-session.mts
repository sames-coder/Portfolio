import type { Config } from "@netlify/functions";
import {
  clearSessionCookie,
  createSessionCookie,
  isAdminConfigured,
  isAuthorized,
  passwordIsValid,
} from "../lib/auth.mjs";
import { json, methodNotAllowed } from "../lib/http.mjs";

export default async function handler(request: Request) {
  if (request.method === "GET") {
    return json({ configured: isAdminConfigured(), authenticated: isAuthorized(request) });
  }

  if (request.method === "DELETE") {
    return json(
      { authenticated: false },
      { headers: { "Set-Cookie": clearSessionCookie() } },
    );
  }

  if (request.method !== "POST") return methodNotAllowed(["GET", "POST", "DELETE"]);
  if (!isAdminConfigured()) {
    return json({ error: "Admin muhiti sozlanmagan." }, { status: 503 });
  }

  let password = "";
  try {
    const body = await request.json() as { password?: unknown };
    if (typeof body.password === "string") password = body.password;
  } catch {
    return json({ error: "So‘rov formati noto‘g‘ri." }, { status: 400 });
  }

  if (!passwordIsValid(password)) {
    return json({ error: "Parol noto‘g‘ri." }, { status: 401 });
  }

  return json(
    { authenticated: true },
    { headers: { "Set-Cookie": createSessionCookie() } },
  );
}

export const config: Config = { path: "/api/admin/session" };
