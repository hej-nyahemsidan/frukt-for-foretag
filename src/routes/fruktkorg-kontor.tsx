import { staticHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import FruktkorgKontor from "@/pages/FruktkorgKontor";

export const Route = createFileRoute("/fruktkorg-kontor")({
  head: () => staticHead("/fruktkorg-kontor"),
  component: FruktkorgKontor,
});
