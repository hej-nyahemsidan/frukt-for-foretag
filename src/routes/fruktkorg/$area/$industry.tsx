import { createFileRoute } from "@tanstack/react-router";
import AreaIndustryLanding from "@/pages/AreaIndustryLanding";
import { getAreaBySlug } from "@/data/areas";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/fruktkorg/$area/$industry")({
  // Area × industry combinations are thin by nature and stay noindex.
  head: ({ params }) => {
    const area = getAreaBySlug(params.area)?.name ?? params.area;
    const industry = params.industry.replace(/-/g, " ");
    return pageHead(`/fruktkorg/${params.area}/${params.industry}`, {
      title: `Fruktkorg ${industry} ${area} | Vitaminkorgen`,
      description: `Fruktkorgar till ${industry} i ${area}. Fri leverans och gratis provkorg.`,
      noindex: true,
    });
  },
  component: AreaIndustryLanding,
});
