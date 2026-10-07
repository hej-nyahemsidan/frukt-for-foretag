import { createFileRoute } from "@tanstack/react-router";
import Fruktlada from "@/pages/Fruktlada";

export const Route = createFileRoute("/fruktlada")({
  component: Fruktlada,
});
