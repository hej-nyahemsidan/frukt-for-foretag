import type { EdgeResult } from "@/lib/edge/run-edge-handler.server";

type EdgeServerFn = (opts: { data: unknown }) => Promise<EdgeResult>;

/**
 * Calls a server function that was ported from a Supabase edge function and
 * returns the same `{ data, error }` shape `supabase.functions.invoke` did:
 * on a non-2xx response `data` is null and `error` carries the message.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function invokeServer<T = any>(
  fn: EdgeServerFn,
  options: { body?: unknown } = {},
): Promise<{ data: T | null; error: Error | null }> {
  try {
    const result = await fn({ data: options.body ?? {} });
    let parsed: unknown = null;
    try {
      parsed = result.body ? JSON.parse(result.body) : null;
    } catch {
      parsed = result.body;
    }
    if (!result.ok) {
      const message =
        parsed && typeof parsed === "object" && "error" in parsed && typeof parsed.error === "string"
          ? parsed.error
          : `Request failed (${result.status})`;
      return { data: null, error: new Error(message) };
    }
    return { data: parsed as T, error: null };
  } catch (error) {
    return { data: null, error: error instanceof Error ? error : new Error(String(error)) };
  }
}
