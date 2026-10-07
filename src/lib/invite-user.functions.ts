import { createServerFn } from "@tanstack/react-start";

// Ported from the "invite-user" Supabase edge function.
export const inviteUser = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => input)
  .handler(async ({ data }) => {
    const { runEdgeHandler } = await import("./edge/run-edge-handler.server");
    const { handler } = await import("./edge/invite-user.server");
    return runEdgeHandler(handler, data);
  });
