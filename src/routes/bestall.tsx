import { createFileRoute } from "@tanstack/react-router";
import Bestall from "@/pages/Bestall";

export const Route = createFileRoute("/bestall")({
  component: Bestall,
});
