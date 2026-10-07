import { createFileRoute } from "@tanstack/react-router";
import Comparison from "@/pages/Comparison";
import { getComparisonBySlug } from "@/data/comparisons";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/jamfor/$type")({
  head: ({ params }) => {
    const c = getComparisonBySlug(params.type);
    return pageHead(`/jamfor/${params.type}`, {
      title: c ? `${c.metaTitle} | Vitaminkorgen` : "Jämförelse | Vitaminkorgen",
      description: (c?.metaDescription ?? "Jämför fruktleveranser.").slice(0, 155),
      noindex: !c,
    });
  },
  component: Comparison,
});
