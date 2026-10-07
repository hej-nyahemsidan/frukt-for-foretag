import { createServerFn } from "@tanstack/react-start";

// Ported from the "delete-user" Supabase edge function.
export const deleteUser = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => input)
  .handler(async ({ data }) => {
    const { runEdgeHandler } = await import("./edge/run-edge-handler.server");
    const { handler } = await import("./edge/delete-user.server");
    return runEdgeHandler(handler, data);
  });
