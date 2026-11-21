// Dynamic sitemap.xml — includes all static URLs + every published blog post
// with lastmod from updated_at/published_at. Public (no JWT).
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const SITE = "https://vitaminkorgen.se";

const STATIC_URLS: Array<{ loc: string; changefreq: string; priority: string }> = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/bestall", changefreq: "weekly", priority: "0.9" },
  { loc: "/produkter", changefreq: "weekly", priority: "0.9" },
  { loc: "/provkorg", changefreq: "monthly", priority: "0.9" },
  { loc: "/kontakt", changefreq: "monthly", priority: "0.8" },
  { loc: "/om-oss", changefreq: "monthly", priority: "0.7" },
  { loc: "/blogg", changefreq: "weekly", priority: "0.8" },
  { loc: "/blogg/tips", changefreq: "weekly", priority: "0.7" },
  { loc: "/blogg/recept", changefreq: "weekly", priority: "0.7" },
  { loc: "/fruktbud-stockholm", changefreq: "weekly", priority: "0.9" },
  // Landningssidor
  { loc: "/fruktkorg-stockholm", changefreq: "weekly", priority: "0.9" },
  { loc: "/fruktkorg-foretag", changefreq: "weekly", priority: "0.9" },
  { loc: "/fruktkorg-pa-jobbet", changefreq: "weekly", priority: "0.9" },
  { loc: "/fruktkorg-kontor", changefreq: "weekly", priority: "0.9" },
  { loc: "/fruktleverans-foretag", changefreq: "weekly", priority: "0.9" },
  { loc: "/prova-fruktkorg", changefreq: "weekly", priority: "0.9" },
  { loc: "/fruktlada", changefreq: "weekly", priority: "0.9" },
  // Produktsidor
  { loc: "/produkt/fruktkorg-original", changefreq: "monthly", priority: "0.8" },
  { loc: "/produkt/fruktkorg-premium", changefreq: "monthly", priority: "0.8" },
  { loc: "/produkt/fruktkorg-banan", changefreq: "monthly", priority: "0.8" },
];

const AREA_SLUGS = ["lidingo", "ostermalm", "kungsholmen", "sodermalm", "solna", "bromma", "nacka", "taby"];
const EXCLUDED_POSTS = new Set([
  "solcell-arbetsbilar-energibesparingsprojekt",
  "fruktbud-stockholm-leverans-till-kontoret",
  "fruktbud-stockholm-breda-leveranser-nojda-kunder",
]);

const xmlEscape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

Deno.serve(async () => {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY");
    if (!supabaseUrl || !supabaseKey) throw new Error("Public configuration missing");
    const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });
    const posts = [];
    for (let offset = 0; ; offset += 500) {
      const { data, error } = await supabase.from("blog_posts")
        .select("slug,category,updated_at,published_at").eq("published", true)
        .order("id").range(offset, offset + 499);
      if (error) throw error;
      posts.push(...(data ?? []));
      if (!data || data.length < 500) break;
    }
    const urls: string[] = STATIC_URLS.map(u =>
      `<url><loc>${SITE}${u.loc}</loc><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`
    );
    for (const slug of AREA_SLUGS) {
      urls.push(`<url><loc>${SITE}/fruktkorg/${slug}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`);
    }
    for (const post of posts) {
      if (!["tips", "recept"].includes(post.category) || EXCLUDED_POSTS.has(post.slug)) continue;
      const timestamp = post.updated_at ?? post.published_at;
      const date = timestamp && !Number.isNaN(Date.parse(timestamp)) ? new Date(timestamp).toISOString().slice(0, 10) : null;
      urls.push(`<url><loc>${SITE}/blogg/${xmlEscape(post.category)}/${xmlEscape(post.slug)}</loc>${date ? `<lastmod>${date}</lastmod>` : ""}<changefreq>monthly</changefreq><priority>0.7</priority></url>`);
    }
    return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("\n")}</urlset>`, {
      headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600", "Access-Control-Allow-Origin": "*" },
    });
  } catch (error) {
    console.error("Sitemap generation failed", error);
    return new Response("Sitemap temporarily unavailable", { status: 503, headers: { "Cache-Control": "no-store" } });
  }
});
