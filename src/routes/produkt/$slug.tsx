import { createFileRoute } from "@tanstack/react-router";
import FruktkorgProduct from "@/pages/FruktkorgProduct";

export const Route = createFileRoute("/produkt/$slug")({
  component: FruktkorgProduct,
});
