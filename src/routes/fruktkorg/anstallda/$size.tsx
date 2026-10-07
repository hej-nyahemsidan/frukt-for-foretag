import { createFileRoute } from "@tanstack/react-router";
import FruktkorgSize from "@/pages/FruktkorgSize";

export const Route = createFileRoute("/fruktkorg/anstallda/$size")({
  component: FruktkorgSize,
});
