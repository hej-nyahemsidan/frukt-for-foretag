import { createFileRoute } from "@tanstack/react-router";
import AreaLanding from "@/pages/AreaLanding";
import { getAreaBySlug, isPriorityArea } from "@/data/areas";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/fruktkorg/$area/")({
  head: ({ params }) => {
    const area = getAreaBySlug(params.area);
    const name = area?.name ?? "Stockholm";
    return pageHead(`/fruktkorg/${params.area}`, {
      title: `Fruktkorg ${name} – frukt till kontoret | Vitaminkorgen`,
      description: `Fruktkorg ${name}: ${area?.description ?? "Fri leverans av fruktkorgar till kontor."}`.slice(0, 155),
      noindex: !area || !isPriorityArea(params.area),
    });
  },
  component: AreaLanding,
});
