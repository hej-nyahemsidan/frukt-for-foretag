import { getRequestHeader } from "@tanstack/react-start/server";

export type EdgeResult = { ok: boolean; status: number; body: string };

const FORWARDED_HEADERS = [
  "authorization",
  "x-forwarded-for",
  "cf-connecting-ip",
  "x-real-ip",
  "origin",
  "referer",
  "user-agent",
];

/**
 * Runs a handler that was ported from a Supabase edge function. The handler
 * keeps its original Request -> Response shape; this builds the Request from
 * the incoming server-function call (forwarding the caller's auth and IP
 * headers) and returns the response as serialisable data.
 */
export async function runEdgeHandler(
  handler: (req: Request) => Promise<Response>,
  body: unknown,
): Promise<EdgeResult> {
  const headers = new Headers({ "content-type": "application/json" });
  for (const name of FORWARDED_HEADERS) {
    const value = getRequestHeader(name);
    if (value) headers.set(name, value);
  }
  const request = new Request("https://app.internal/edge", {
    method: "POST",
    headers,
    body: JSON.stringify(body ?? {}),
  });
  try {
    const response = await handler(request);
    return { ok: response.ok, status: response.status, body: await response.text() };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      status: 500,
      body: JSON.stringify({ error: error instanceof Error ? error.message : "Internal error" }),
    };
  }
}
