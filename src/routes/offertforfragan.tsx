import { createFileRoute, redirect } from "@tanstack/react-router";

// Old URL permanently consolidated into /kontakt.
export const Route = createFileRoute("/offertforfragan")({
  beforeLoad: () => {
    throw redirect({ to: "/kontakt", replace: true, statusCode: 301 });
  },
});
