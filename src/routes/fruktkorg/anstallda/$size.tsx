import { createFileRoute } from "@tanstack/react-router";
import FruktkorgSize from "@/pages/FruktkorgSize";
import { getCompanySizeBySlug } from "@/data/companySizes";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/fruktkorg/anstallda/$size")({
  head: ({ params }) => {
    const info = getCompanySizeBySlug(params.size);
    return pageHead(`/fruktkorg/anstallda/${params.size}`, {
      title: info ? `${info.metaTitle} | Vitaminkorgen` : "Fruktkorg per antal anställda | Vitaminkorgen",
      description: (info?.metaDescription ?? "Rätt fruktkorg för ert kontor.").slice(0, 155),
      noindex: !info,
    });
  },
  component: FruktkorgSize,
});
