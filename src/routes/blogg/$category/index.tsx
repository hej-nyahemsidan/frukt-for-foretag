import { createFileRoute } from "@tanstack/react-router";
import BlogList from "@/pages/BlogList";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/blogg/$category/")({
  head: ({ params }) => {
    const isTips = params.category === "tips";
    return pageHead(`/blogg/${params.category}`, {
      title: `${isTips ? "Tips" : "Recept"} – Blogg | Vitaminkorgen`,
      description: isTips
        ? "Tips om fruktkorgar, frukt på jobbet och hälsa på arbetsplatsen för företag i Stockholm."
        : "Recept med färsk frukt – inspiration till fikat och mötet på kontoret.",
      noindex: !["tips", "recept"].includes(params.category),
    });
  },
  component: BlogList,
});
