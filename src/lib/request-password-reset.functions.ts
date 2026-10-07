import { createServerFn } from "@tanstack/react-start";

// Ported from the "request-password-reset" Supabase edge function.
export const requestPasswordReset = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => input)
  .handler(async ({ data }) => {
    const { runEdgeHandler } = await import("./edge/run-edge-handler.server");
    const { handler } = await import("./edge/request-password-reset.server");
    return runEdgeHandler(handler, data);
  });
