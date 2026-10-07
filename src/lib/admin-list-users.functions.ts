import { createServerFn } from "@tanstack/react-start";

// Ported from the "admin-list-users" Supabase edge function.
export const adminListUsers = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => input)
  .handler(async ({ data }) => {
    const { runEdgeHandler } = await import("./edge/run-edge-handler.server");
    const { handler } = await import("./edge/admin-list-users.server");
    return runEdgeHandler(handler, data);
  });
