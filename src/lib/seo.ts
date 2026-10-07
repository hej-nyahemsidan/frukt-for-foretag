/**
 * Server-rendered per-page SEO. Every public route calls `pageHead()` from its
 * `head()` so title, description, canonical, Open Graph and robots are in the
 * HTML before JavaScript runs. Keep titles <= 60 and descriptions <= 155 chars.
 */
export const SITE_URL = "https://vitaminkorgen.se";

export interface PageSeo {
  title: string;
  description: string;
  /** Short label used for breadcrumbs. */
  crumb?: string;
  noindex?: boolean;
  ogType?: "website" | "article" | "product";
}

export const STATIC_SEO: Record<string, PageSeo> = {
  "/": {
    title: "Fruktkorg till företag i Stockholm | Vitaminkorgen",
    description:
      "Fruktkorgar till kontoret i Stockholm från 220 kr/vecka. Fri leverans, gratis provkorg och offert utan bindning. Välj Original, Premium eller Banan.",
  },
  "/fruktkorg-stockholm": {
    title: "Fruktkorg Stockholm – fri leverans | Vitaminkorgen",
    description:
      "Färska fruktkorgar till kontoret i Stockholm från 220 kr/vecka. Fri leverans, flexibla abonnemang och gratis provkorg. Beställ eller begär offert.",
    crumb: "Fruktkorg Stockholm",
  },
  "/fruktbud-stockholm": {
    title: "Fruktbud Stockholm – frukt till kontoret | Vitaminkorgen",
    description:
      "Fruktbud i Stockholm som levererar färsk frukt till kontoret varje vecka. Fri leverans måndag–fredag. Gratis provkorg. Begär offert.",
    crumb: "Fruktbud Stockholm",
  },
  "/fruktkorg-foretag": {
    title: "Fruktkorg företag Stockholm – från 220 kr | Vitaminkorgen",
    description:
      "Fruktkorg till företag i Stockholm från 220 kr. Personalförmån med fri leverans, flexibla leveransdagar och faktura. Begär gratis offert.",
    crumb: "Fruktkorg företag",
  },
  "/fruktkorg-pa-jobbet": {
    title: "Frukt till jobbet – fruktkorg till kontoret | Vitaminkorgen",
    description:
      "Frukt till jobbet i Stockholm: färsk fruktkorg till arbetsplatsen som ökar trivseln. Fri leverans och gratis provkorg. Beställ idag.",
    crumb: "Frukt till jobbet",
  },
  "/fruktkorg-kontor": {
    title: "Fruktkorg kontor – frukt på arbetsplatsen | Vitaminkorgen",
    description:
      "Fruktkorg till kontoret: placering i fikarum eller kyl, rätt storlek per våning och extra beställningar till möten. Fri leverans i Stockholm.",
    crumb: "Fruktkorg kontor",
  },
  "/fruktleverans-foretag": {
    title: "Fruktleverans till företag i Stockholm | Vitaminkorgen",
    description:
      "Fruktleverans till företag: så fungerar leveransdagar, placering och ändringar. Fri leverans i hela Stockholm, Södertälje och Uppsala.",
    crumb: "Fruktleverans företag",
  },
  "/fruktlada": {
    title: "Fruktlåda till företag – fri leverans | Vitaminkorgen",
    description:
      "Fruktlåda till företag: färsk säsongsfrukt levererad till kontoret i Stockholm i 4, 6, 9 eller 11 kg. Fri leverans. Boka provleverans idag.",
    crumb: "Fruktlåda",
  },
  "/produkter": {
    title: "Fruktkorgar & kontorsprodukter | Vitaminkorgen",
    description:
      "Färska fruktkorgar, drycker, mejeri och snacks till kontoret i Stockholm. Fri leverans. Beställ direkt online eller begär offert.",
    crumb: "Produkter",
  },
  "/kontakt": {
    title: "Kontakt & gratis offert på fruktkorg | Vitaminkorgen",
    description:
      "Begär en gratis offert på fruktkorgar till ert kontor – svar inom 24 timmar. Ring 010-183 98 36 eller fyll i formuläret.",
    crumb: "Kontakt",
  },
  "/om-oss": {
    title: "Om oss – fruktkorgar i Stockholm | Vitaminkorgen",
    description:
      "Vitaminkorgen hjälper företag i Stockholm till en bättre arbetsmiljö med fruktkorgar, flexibla leveranser och långsiktiga samarbeten.",
    crumb: "Om oss",
  },
  "/provkorg": {
    title: "Gratis provkorg – testa fruktkorg | Vitaminkorgen",
    description:
      "Beställ en gratis provkorg och testa våra fruktkorgar på kontoret. Fri leverans i Stockholm. 150+ företag har valt Vitaminkorgen.",
    crumb: "Gratis provkorg",
  },
  "/prova-fruktkorg": {
    title: "Prova fruktkorg gratis på kontoret | Vitaminkorgen",
    description:
      "Kostnadsfri provleverans av fruktkorg till ert företag i Stockholm. Färsk säsongsfrukt direkt till kontoret – inget abonnemang krävs.",
    crumb: "Prova fruktkorg",
  },
  "/bestall": {
    title: "Beställ fruktkorg till kontoret | Vitaminkorgen",
    description:
      "Beställ fruktkorg till jobbet i Stockholm i 4 enkla steg. Välj korg, tillbehör och leveransdagar. Fri leverans, inga dolda avgifter.",
    crumb: "Beställ",
  },
  "/blogg": {
    title: "Blogg – frukt på jobbet & tips | Vitaminkorgen",
    description:
      "Tips om fruktkorgar på jobbet, hälsa på arbetsplatsen och recept med färsk frukt. Inspiration för ett hälsosammare kontorsliv.",
    crumb: "Blogg",
  },
  "/blommor": {
    title: "Blommor till kontoret Stockholm | Vitaminkorgen",
    description: "Blomsterarrangemang levererade till ert företag i Stockholm.",
    crumb: "Blommor",
    noindex: true,
  },
  "/varuautomat": {
    title: "Varuautomat till kontoret Stockholm | Vitaminkorgen",
    description: "Varuautomater med snacks, dryck och fika till kontoret i Stockholm.",
    crumb: "Varuautomat",
    noindex: true,
  },
  "/villkor": { title: "Villkor | Vitaminkorgen", description: "Vitaminkorgens villkor för leverans, beställning och abonnemang.", crumb: "Villkor", noindex: true },
  "/integritetspolicy": { title: "Integritetspolicy | Vitaminkorgen", description: "Så hanterar Vitaminkorgen dina personuppgifter enligt GDPR.", crumb: "Integritetspolicy", noindex: true },
  "/cookiepolicy": { title: "Cookiepolicy | Vitaminkorgen", description: "Så använder Vitaminkorgen cookies på webbplatsen.", crumb: "Cookiepolicy", noindex: true },
  "/erbjudande": { title: "Gratis provkorg – erbjudande | Vitaminkorgen", description: "Beställ en gratis provkorg till kontoret i Stockholm.", crumb: "Erbjudande", noindex: true },
  "/checkout": { title: "Kassa | Vitaminkorgen", description: "Slutför din beställning.", noindex: true },
  "/kundportal": { title: "Kundportal – logga in | Vitaminkorgen", description: "Logga in på Vitaminkorgens kundportal.", noindex: true },
  "/reset-password": { title: "Aktivera ditt konto | Vitaminkorgen", description: "Aktivera ditt konto i Vitaminkorgens kundportal.", noindex: true },
  "/avregistrera": { title: "Avregistrera utskick | Vitaminkorgen", description: "Avregistrera dig från Vitaminkorgens e-postutskick.", noindex: true },
  "/dashboard": { title: "Mina sidor | Vitaminkorgen", description: "Kundportal.", noindex: true },
  "/mina-sidor": { title: "Mina sidor | Vitaminkorgen", description: "Kundportal.", noindex: true },
  "/mina-sidor/ordrar": { title: "Mina ordrar | Vitaminkorgen", description: "Kundportal.", noindex: true },
};

export function pageHead(path: string, seo: PageSeo) {
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  return {
    meta: [
      { title: seo.title },
      { name: "description", content: seo.description },
      { name: "route-seo", content: "1" },
      { property: "og:title", content: seo.title },
      { property: "og:description", content: seo.description },
      { property: "og:url", content: url },
      { property: "og:type", content: seo.ogType ?? "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: seo.title },
      { name: "twitter:description", content: seo.description },
      { name: "robots", content: seo.noindex ? "noindex, follow" : "index, follow" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

/** head() for a route listed in STATIC_SEO. */
export function staticHead(path: keyof typeof STATIC_SEO & string) {
  const seo = STATIC_SEO[path];
  if (!seo) throw new Error(`Missing SEO entry for ${path}`);
  return pageHead(path, seo);
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}
