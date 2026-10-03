export function json(data: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.set("Cache-Control", "no-store");
  return new Response(JSON.stringify(data), { ...init, headers });
}

export function methodNotAllowed(allowed: string[]) {
  return json(
    { error: "Method not allowed." },
    { status: 405, headers: { Allow: allowed.join(", ") } },
  );
}

