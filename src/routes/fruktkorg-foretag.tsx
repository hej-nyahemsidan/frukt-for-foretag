import { createFileRoute } from "@tanstack/react-router";
import FruktkorgForetag from "@/pages/FruktkorgForetag";

export const Route = createFileRoute("/fruktkorg-foretag")({
  component: FruktkorgForetag,
});
