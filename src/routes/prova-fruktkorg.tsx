import { createFileRoute } from "@tanstack/react-router";
import ProvaFruktkorg from "@/pages/ProvaFruktkorg";

export const Route = createFileRoute("/prova-fruktkorg")({
  component: ProvaFruktkorg,
});
