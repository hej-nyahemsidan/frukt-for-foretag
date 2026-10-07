import { createFileRoute, redirect } from "@tanstack/react-router";
import BlogPost from "@/pages/BlogPost";
import { supabase } from "@/integrations/supabase/client";
import { pageHead } from "@/lib/seo";

/** Articles folded into service hubs (301). */
const MERGED: Record<string, "/fruktbud-stockholm" | "/fruktkorg-stockholm"> = {
  "fruktbud-stockholm-leverans-till-kontoret": "/fruktbud-stockholm",
  "fruktbud-stockholm-breda-leveranser-nojda-kunder": "/fruktbud-stockholm",
};

/** Off-topic articles kept online but out of the index. */
const NOINDEX_SLUGS = new Set(["solcell-arbetsbilar-energibesparingsprojekt"]);

export const Route = createFileRoute("/blogg/$category/$slug")({
  beforeLoad: ({ params }) => {
    const target = MERGED[params.slug];
    if (target) throw redirect({ to: target, replace: true, statusCode: 301 });
  },
  loader: async ({ params }) => {
    const { data } = await supabase
      .from("blog_posts")
      .select("title, excerpt")
      .eq("category", params.category)
      .eq("slug", params.slug)
      .eq("published", true)
      .maybeSingle();
    return { meta: data };
  },
  head: ({ params, loaderData }) => {
    const meta = loaderData?.meta;
    const title = meta ? `${meta.title} | Vitaminkorgen` : "Artikeln hittades inte | Vitaminkorgen";
    return pageHead(`/blogg/${params.category}/${params.slug}`, {
      title,
      description: (meta?.excerpt || (meta ? `Läs ${meta.title} på Vitaminkorgens blogg.` : "Artikeln kunde inte hittas.")).slice(0, 155),
      ogType: "article",
      noindex: !meta || NOINDEX_SLUGS.has(params.slug),
    });
  },
  component: BlogPost,
});
