import { createServerFn } from "@tanstack/react-start";

// Ported from the "create-reseller-customer" Supabase edge function.
export const createResellerCustomer = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => input)
  .handler(async ({ data }) => {
    const { runEdgeHandler } = await import("./edge/run-edge-handler.server");
    const { handler } = await import("./edge/create-reseller-customer.server");
    return runEdgeHandler(handler, data);
  });
