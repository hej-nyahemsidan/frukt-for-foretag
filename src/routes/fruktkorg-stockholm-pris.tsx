import { createFileRoute, redirect } from "@tanstack/react-router";

// Price page merged into the Stockholm hub (price section #priser).
export const Route = createFileRoute("/fruktkorg-stockholm-pris")({
  beforeLoad: () => {
    throw redirect({ to: "/fruktkorg-stockholm", replace: true, statusCode: 301 });
  },
});
