import { createFileRoute, redirect } from "@tanstack/react-router";

// Redirect old URL to prevent duplicate indexing.
export const Route = createFileRoute("/varuautomater-kaffemaskin")({
  beforeLoad: () => {
    throw redirect({ to: "/varuautomat", replace: true, statusCode: 301 });
  },
});
