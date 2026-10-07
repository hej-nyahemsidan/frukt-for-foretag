import { createFileRoute } from "@tanstack/react-router";
import AreaLanding from "@/pages/AreaLanding";

export const Route = createFileRoute("/fruktkorg/$area/")({
  component: AreaLanding,
});
