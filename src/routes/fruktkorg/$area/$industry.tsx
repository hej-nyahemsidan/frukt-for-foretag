import { createFileRoute } from "@tanstack/react-router";
import AreaIndustryLanding from "@/pages/AreaIndustryLanding";

export const Route = createFileRoute("/fruktkorg/$area/$industry")({
  component: AreaIndustryLanding,
});
