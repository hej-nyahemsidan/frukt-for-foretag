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
  // Landningssidor
  { loc: "/fruktkorg-stockholm", changefreq: "weekly", priority: "0.9" },
  { loc: "/fruktkorg-stockholm-pris", changefreq: "weekly", priority: "0.9" },
  { loc: "/fruktkorg-foretag", changefreq: "weekly", priority: "0.9" },
  { loc: "/fruktkorg-pa-jobbet", changefreq: "weekly", priority: "0.9" },
  { loc: "/fruktkorg-kontor", changefreq: "weekly", priority: "0.9" },
  { loc: "/fruktleverans-foretag", changefreq: "weekly", priority: "0.9" },
  { loc: "/prova-fruktkorg", changefreq: "weekly", priority: "0.9" },
  { loc: "/blommor", changefreq: "weekly", priority: "0.6" },
  { loc: "/varuautomat", changefreq: "weekly", priority: "0.6" },
  // Produktsidor
  { loc: "/produkt/fruktkorg-original", changefreq: "monthly", priority: "0.8" },
  { loc: "/produkt/fruktkorg-premium", changefreq: "monthly", priority: "0.8" },
  { loc: "/produkt/fruktkorg-banan", changefreq: "monthly", priority: "0.8" },
];

const AREA_SLUGS = [
  "stockholm","ostermalm","kungsholmen","sodermalm","gamla-stan","gardet","ropsten",
  "stadshagen","fridhemsplan","hammarby-sjostad","solna","sundbyberg","hagalund",
  "bromma","alvik","nacka","taby","arninge","jarfalla","huddinge","haninge","handen",
  "jordbro","lanna","tyreso","farsta","skondal","skogas","bandhagen","alvsjo",
  "hagersten","vastberga","fruangen","tumba","salem","botkyrka",
];

const today = () => new Date().toISOString().slice(0, 10);

const xmlEscape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

Deno.serve(async () => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug, category, updated_at, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(1000);

  const urls: string[] = [];

  for (const u of STATIC_URLS) {
    urls.push(
      `<url><loc>${SITE}${u.loc}</loc><lastmod>${today()}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`
    );
  }

  for (const slug of AREA_SLUGS) {
    urls.push(
      `<url><loc>${SITE}/fruktkorg/${slug}</loc><lastmod>${today()}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`
    );
  }

  for (const p of posts ?? []) {
    const cat = p.category === "recept" ? "recept" : "tips";
    const date = (p.updated_at ?? p.published_at ?? new Date().toISOString()).slice(0, 10);
    urls.push(
      `<url><loc>${SITE}/blogg/${cat}/${xmlEscape(p.slug)}</loc><lastmod>${date}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`
    );
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
});