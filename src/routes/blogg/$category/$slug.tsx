import { createFileRoute, redirect, notFound } from "@tanstack/react-router";
import BlogPost from "@/pages/BlogPost";
import { pageHead, SITE_URL } from "@/lib/seo";
import { blogQueryOptions } from "@/lib/blog-query";
import { MERGED_BLOG_POSTS, NOINDEX_BLOG_SLUGS, BLOG_CATEGORIES } from "@/lib/blog-policy";
import { BlogLoadError, BlogNotFound } from "@/components/BlogRouteState";

export const Route = createFileRoute("/blogg/$category/$slug")({
  beforeLoad: ({ params }) => {
    const target = MERGED_BLOG_POSTS[params.slug];
    if (target) throw redirect({ to: target, replace: true, statusCode: 301 });
  },
  loader: async ({ params, context }) => {
    if (!BLOG_CATEGORIES.includes(params.category)) throw notFound();
    const data = await context.queryClient.ensureQueryData(blogQueryOptions(params.category, params.slug));
    if (!data.post) throw notFound();
    return data;
  },
  head: ({ params, loaderData }) => {
    const meta = loaderData?.post;
    const title = meta ? `${meta.title} | Vitaminkorgen` : "Artikeln hittades inte | Vitaminkorgen";
    const head = pageHead(`/blogg/${params.category}/${params.slug}`, {
      title,
      description: (meta?.excerpt || (meta ? `Läs ${meta.title} på Vitaminkorgens blogg.` : "Artikeln kunde inte hittas.")).slice(0, 155),
      ogType: "article",
      noindex: !meta || NOINDEX_BLOG_SLUGS.has(params.slug),
    });
    return {
      ...head,
      scripts: meta ? [{ type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org", "@type": "BlogPosting",
        headline: meta.title, description: meta.excerpt ?? meta.title,
        datePublished: meta.published_at ?? meta.created_at, dateModified: meta.updated_at,
        author: { "@type": "Person", name: meta.author, url: `${SITE_URL}/om-oss` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntityOfPage: `${SITE_URL}/blogg/${meta.category}/${meta.slug}`,
      }) }] : [],
    };
  },
  errorComponent: BlogLoadError,
  notFoundComponent: BlogNotFound,
  component: () => <BlogPost initialData={Route.useLoaderData()} />,
});
