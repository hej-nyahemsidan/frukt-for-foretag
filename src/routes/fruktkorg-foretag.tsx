import { staticHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import FruktkorgForetag from "@/pages/FruktkorgForetag";

export const Route = createFileRoute("/fruktkorg-foretag")({
  head: () => staticHead("/fruktkorg-foretag"),
  component: FruktkorgForetag,
});
