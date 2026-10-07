import { createServerFn } from "@tanstack/react-start";

// Ported from the "invite-all-customers" Supabase edge function.
export const inviteAllCustomers = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => input)
  .handler(async ({ data }) => {
    const { runEdgeHandler } = await import("./edge/run-edge-handler.server");
    const { handler } = await import("./edge/invite-all-customers.server");
    return runEdgeHandler(handler, data);
  });
