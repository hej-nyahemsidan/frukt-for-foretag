import { staticHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import FruktkorgStockholm from "@/pages/FruktkorgStockholm";

export const Route = createFileRoute("/fruktkorg-stockholm")({
  head: () => staticHead("/fruktkorg-stockholm"),
  component: FruktkorgStockholm,
});
