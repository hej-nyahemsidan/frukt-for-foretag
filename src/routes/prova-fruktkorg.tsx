import { staticHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import ProvaFruktkorg from "@/pages/ProvaFruktkorg";

export const Route = createFileRoute("/prova-fruktkorg")({
  head: () => staticHead("/prova-fruktkorg"),
  component: ProvaFruktkorg,
});
