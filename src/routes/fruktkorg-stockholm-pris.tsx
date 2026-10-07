import { createFileRoute } from "@tanstack/react-router";
import FruktkorgStockholmPris from "@/pages/FruktkorgStockholmPris";

export const Route = createFileRoute("/fruktkorg-stockholm-pris")({
  component: FruktkorgStockholmPris,
});
