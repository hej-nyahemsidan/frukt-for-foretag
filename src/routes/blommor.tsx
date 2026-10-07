import { createFileRoute } from "@tanstack/react-router";
import Blommor from "@/pages/Blommor";

export const Route = createFileRoute("/blommor")({
  component: Blommor,
});
