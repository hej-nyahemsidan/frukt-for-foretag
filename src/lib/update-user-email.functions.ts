import { createServerFn } from "@tanstack/react-start";

// Ported from the "update-user-email" Supabase edge function.
export const updateUserEmail = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => input)
  .handler(async ({ data }) => {
    const { runEdgeHandler } = await import("./edge/run-edge-handler.server");
    const { handler } = await import("./edge/update-user-email.server");
    return runEdgeHandler(handler, data);
  });
