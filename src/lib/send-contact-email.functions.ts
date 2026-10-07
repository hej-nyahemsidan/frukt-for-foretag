import { createServerFn } from "@tanstack/react-start";

// Ported from the "send-contact-email" Supabase edge function.
export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => input)
  .handler(async ({ data }) => {
    const { runEdgeHandler } = await import("./edge/run-edge-handler.server");
    const { handler } = await import("./edge/send-contact-email.server");
    return runEdgeHandler(handler, data);
  });
