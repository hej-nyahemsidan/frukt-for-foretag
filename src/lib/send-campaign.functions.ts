import { createServerFn } from "@tanstack/react-start";

// Ported from the "send-campaign" Supabase edge function.
export const sendCampaign = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => input)
  .handler(async ({ data }) => {
    const { runEdgeHandler } = await import("./edge/run-edge-handler.server");
    const { handler } = await import("./edge/send-campaign.server");
    return runEdgeHandler(handler, data);
  });
