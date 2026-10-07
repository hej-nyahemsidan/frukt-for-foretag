import { staticHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import FruktkorgPaJobbet from "@/pages/FruktkorgPaJobbet";

export const Route = createFileRoute("/fruktkorg-pa-jobbet")({
  head: () => staticHead("/fruktkorg-pa-jobbet"),
  component: FruktkorgPaJobbet,
});
