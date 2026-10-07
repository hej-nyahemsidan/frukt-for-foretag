import { createClient as baseCreateClient } from "@supabase/supabase-js";

function isNewSupabaseApiKey(value: string): boolean {
  return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}

// New Supabase API keys are opaque strings, not JWTs: send them as `apikey`
// and never as `Authorization: Bearer <key>`. User JWTs pass through untouched.
function createSupabaseFetch(supabaseKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
    );
    if (init?.headers) {
      new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    }
    if (isNewSupabaseApiKey(supabaseKey) && headers.get("Authorization") === `Bearer ${supabaseKey}`) {
      headers.delete("Authorization");
    }
    headers.set("apikey", supabaseKey);
    return fetch(input, { ...init, headers });
  };
}

type ClientOptions = NonNullable<Parameters<typeof baseCreateClient>[2]>;

/**
 * Drop-in replacement for `createClient` used by the handlers ported from
 * Supabase edge functions; works with both legacy JWT keys and new opaque keys.
 */
export function createClient(url: string, key: string, options: ClientOptions = {}) {
  return baseCreateClient(url, key, {
    ...options,
    global: { ...options.global, fetch: createSupabaseFetch(key) },
  });
}
