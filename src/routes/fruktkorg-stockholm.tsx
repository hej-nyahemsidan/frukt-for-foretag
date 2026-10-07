import { createFileRoute } from "@tanstack/react-router";
import FruktkorgStockholm from "@/pages/FruktkorgStockholm";

export const Route = createFileRoute("/fruktkorg-stockholm")({
  component: FruktkorgStockholm,
});
