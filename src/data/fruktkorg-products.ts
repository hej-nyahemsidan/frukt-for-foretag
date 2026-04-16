
export interface FruktkorgProduct {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  sizes: { kg: string; price: number }[];
  image: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

export const fruktkorgProducts: FruktkorgProduct[] = [
  {
    slug: 'fruktkorg-original',
    name: 'Fruktkorg Original',
    tagline: 'Vår klassiska fruktkorg med säsongens bästa frukter',
    description: 'Fruktkorg Original är vårt mest populära val för kontor som vill erbjuda färsk frukt till sina medarbetare. Korgen innehåller ett noggrant utvalt sortiment av säsongens bästa frukter – allt från äpplen och bananer till päron och clementiner. Perfekt för det lilla till medelstora kontoret.',
    features: [
      'Handplockad säsongsfrukt av högsta kvalitet',
      'Varierat urval som ändras med säsongen',
      'Fri leverans varje vecka',
      'Flexibla leveransdagar',
      'Kostnadsfri provkorg för nya kunder',
      'Fakturering – smidigt för företag',
    ],
    sizes: [
      { kg: '4kg', price: 230 },
      { kg: '6kg', price: 310 },
      { kg: '8kg', price: 395 },
      { kg: '10kg', price: 460 },
    ],
    image: 'fruktkorg-standard-new',
    seoTitle: 'Fruktkorg Original – Frukt till kontoret | Vitaminkorgen',
    seoDescription: 'Fruktkorg Original ✓ Handplockad säsongsfrukt levererad till kontoret. Från 230 kr/vecka. Fri leverans i Stockholm. Beställ gratis provkorg!',
    seoKeywords: 'fruktkorg original, fruktkorg kontor, fruktkorgar till jobbet, fruktkorg pris, fruktkorg leverans',
  },
  {
    slug: 'fruktkorg-premium',
    name: 'Fruktkorg Premium',
    tagline: 'Premiumfrukter för det lite extra på kontoret',
    description: 'Fruktkorg Premium innehåller handplockade premiumfrukter som tar fruktupplevelsen till nästa nivå. Här hittar ni exotiska frukter som mango, ananas och granatäpple blandat med klassiska favoriter. Perfekt för kontor som vill imponera på medarbetare och besökare.',
    features: [
      'Exotiska och lokala premiumfrukter',
      'Extra noga utvald kvalitet',
      'Perfekt för kontor som vill ha det bästa',
      'Fri leverans varje vecka',
      'Flexibla leveransdagar',
      'Kostnadsfri provkorg för nya kunder',
    ],
    sizes: [
      { kg: '4kg', price: 280 },
      { kg: '6kg', price: 380 },
      { kg: '8kg', price: 480 },
      { kg: '10kg', price: 560 },
    ],
    image: 'fruktkorg-premium-new',
    seoTitle: 'Fruktkorg Premium – Exklusiv frukt till kontoret | Vitaminkorgen',
    seoDescription: 'Fruktkorg Premium ✓ Exotiska och lokala premiumfrukter levererade till kontoret. Från 280 kr/vecka. Fri leverans. Beställ gratis provkorg!',
    seoKeywords: 'fruktkorg premium, premium fruktkorgar, exklusiv fruktkorg, fruktkorg företag, fruktleverans kontor',
  },
  {
    slug: 'fruktkorg-banan',
    name: 'Fruktkorg Banan',
    tagline: 'Bananer i fokus – snabb energi på kontoret',
    description: 'Fruktkorg Banan är det perfekta valet för kontor där bananer är favoriten. Korgen fokuserar på bananer med kompletterande frukter för variation. Bananer är en utmärkt energikälla som passar perfekt som mellanmål under arbetsdagen.',
    features: [
      'Bananer i fokus med kompletterande frukter',
      'Perfekt energiboost under arbetsdagen',
      'Populärt val bland aktiva kontor',
      'Fri leverans varje vecka',
      'Flexibla leveransdagar',
      'Kostnadsfri provkorg för nya kunder',
    ],
    sizes: [
      { kg: '4kg', price: 199 },
      { kg: '6kg', price: 275 },
      { kg: '8kg', price: 350 },
      { kg: '10kg', price: 420 },
    ],
    image: 'fruktkorg-banan-new',
    seoTitle: 'Fruktkorg Banan – Bananer till kontoret | Vitaminkorgen',
    seoDescription: 'Fruktkorg Banan ✓ Bananer och kompletterande frukter levererade till kontoret. Från 199 kr/vecka. Fri leverans. Beställ gratis provkorg!',
    seoKeywords: 'fruktkorg banan, banankorgar kontor, fruktkorgar bananer, fruktkorg billig, fruktleverans banan',
  },
  {
    slug: 'fruktkorg-sicilien',
    name: 'Fruktkorg Sicilien',
    tagline: 'Medelhavsinspirerad fruktkorg med säsongens exotiska frukter',
    description: 'Fruktkorg Sicilien är det perfekta valet för kontor som vill ha mer variation och mindre av de vanliga äpplena. Korgen innehåller handplockade premiumfrukter med extra fokus på säsongens bästa – citrusfrukter, passionsfrukt, vindruvor och andra exotiska favoriter. Inspirerad av Medelhavets soliga smaker och perfekt för arbetsplatser som vill erbjuda något utöver det vanliga.',
    features: [
      'Exotiska och lokala premiumfrukter',
      'Extra fokus på säsongsfrukter och variation',
      'Mindre äpplen – mer exotiskt och spännande',
      'Fri leverans varje vecka',
      'Flexibla leveransdagar',
      'Kostnadsfri provkorg för nya kunder',
    ],
    sizes: [
      { kg: '4kg', price: 282 },
      { kg: '6kg', price: 392 },
      { kg: '8kg', price: 496 },
      { kg: '10kg', price: 580 },
    ],
    image: 'fruktkorg-sicilien',
    seoTitle: 'Fruktkorg Sicilien – Medelhavsfrukt till kontoret | Vitaminkorgen',
    seoDescription: 'Fruktkorg Sicilien ✓ Medelhavsinspirerade premiumfrukter med extra säsongsvariation. Från 282 kr/vecka. Fri leverans. Beställ gratis provkorg!',
    seoKeywords: 'fruktkorg sicilien, medelhavsfruktkorg, exotisk fruktkorg kontor, fruktkorg företag, fruktleverans kontor',
  },
];

export const getFruktkorgBySlug = (slug: string): FruktkorgProduct | undefined => {
  return fruktkorgProducts.find(p => p.slug === slug);
};
