import { createFileRoute } from "@tanstack/react-router";
import Provkorg from "@/pages/Provkorg";

export const Route = createFileRoute("/provkorg")({
  component: Provkorg,
});
