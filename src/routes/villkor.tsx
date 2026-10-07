import { createFileRoute } from "@tanstack/react-router";
import Terms from "@/pages/Terms";

export const Route = createFileRoute("/villkor")({
  component: Terms,
});
