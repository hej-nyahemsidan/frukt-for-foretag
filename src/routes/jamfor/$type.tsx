import { createFileRoute } from "@tanstack/react-router";
import Comparison from "@/pages/Comparison";

export const Route = createFileRoute("/jamfor/$type")({
  component: Comparison,
});
