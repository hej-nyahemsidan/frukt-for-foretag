import { createServerFn } from "@tanstack/react-start";

// Deletes a reseller customer; the handler verifies the caller is a reseller
// user for the same reseller before deleting anything.
export const deleteResellerCustomer = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => input)
  .handler(async ({ data }) => {
    const { runEdgeHandler } = await import("./edge/run-edge-handler.server");
    const { handler } = await import("./edge/delete-reseller-customer.server");
    return runEdgeHandler(handler, data);
  });
