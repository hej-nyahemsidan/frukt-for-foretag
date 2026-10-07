import { createFileRoute } from "@tanstack/react-router";
import FruktkorgKontor from "@/pages/FruktkorgKontor";

export const Route = createFileRoute("/fruktkorg-kontor")({
  component: FruktkorgKontor,
});
