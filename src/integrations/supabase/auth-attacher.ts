import { createMiddleware } from "@tanstack/react-start";

/**
 * Attaches the signed-in user's Supabase access token to every server-function
 * call, so ported handlers can verify the caller exactly like the old edge
 * functions did with the Authorization header.
 */
export const attachSupabaseAuth = createMiddleware({ type: "function" }).client(async ({ next }) => {
  const { supabase } = await import("./client");
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return next(token ? { headers: { Authorization: `Bearer ${token}` } } : {});
});
