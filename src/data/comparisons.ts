export interface ComparisonRow {
  feature: string;
  alternative: string;
  vitaminkorgen: string;
}

export interface ComparisonInfo {
  slug: string;
  /** Display name of what we compare against (anonymous) */
  alternativeName: string;
  metaTitle: string;
  metaDescription: string;
  hero: string;
  intro: string[];
  rows: ComparisonRow[];
  conclusion: string;
  faqs: { q: string; a: string }[];
}

export const comparisons: ComparisonInfo[] = [
  {
    slug: 'traditionell-fruktleverans',
    alternativeName: 'Traditionell fruktleverans',
    metaTitle: 'Fruktkorg vs traditionell fruktleverans – jämförelse för företag',
    metaDescription: 'Färdig fruktkorg jämfört med traditionell fruktleverans. Pris, kvalitet, flexibilitet och hantering – så skiljer sig alternativen för svenska företag.',
    hero: 'Vad skiljer en färdig fruktkorg från en traditionell fruktleverans? Vi går igenom det viktigaste innan ni väljer.',
    intro: [
      'Många företag står inför valet mellan en traditionell fruktleverans (lös frukt i lådor, ofta från en grossist) och en färdig fruktkorg som levereras klar att ställa fram.',
      'Skillnaden låter liten men märks tydligt i vardagen: tidsåtgång, presentation, svinn och hur snabbt man får hjälp om något inte stämmer.'
    ],
    rows: [
      { feature: 'Leveransformat', alternative: 'Lösa lådor som behöver packas upp och arrangeras', vitaminkorgen: 'Färdig korg – ställs direkt på fikabordet' },
      { feature: 'Tidsåtgång på kontoret', alternative: '15–30 min/leverans för uppackning', vitaminkorgen: 'Noll – korgen är redo att användas' },
      { feature: 'Presentation', alternative: 'Varierar beroende på vem som packar upp', vitaminkorgen: 'Konsekvent, snyggt arrangerad' },
      { feature: 'Sortiment', alternative: 'Ofta standardiserat', vitaminkorgen: 'Säsongsanpassat varje vecka' },
      { feature: 'Flexibilitet', alternative: 'Ofta minsta beställning eller bindningstid', vitaminkorgen: 'Pausa eller justera när som helst' },
      { feature: 'Kontakt vid problem', alternative: 'Kundtjänst i kö', vitaminkorgen: 'Direktkontakt – 010-183 98 36' },
      { feature: 'Fakturering', alternative: 'Per leverans eller månadsvis', vitaminkorgen: 'Månadsfaktura, 15 dagars kredit' },
    ],
    conclusion: 'En färdig fruktkorg spar tid varje vecka, ser bättre ut på kontoret och har sällan komplicerade bindningstider. För de flesta små och medelstora kontor i Stockholm är det det enklaste valet.',
    faqs: [
      { q: 'Är en färdig fruktkorg dyrare?', a: 'Sett per frukt är det ofta jämförbart. Räknar man in den tid som annars går åt till uppackning och arrangering blir den färdiga korgen ofta billigare totalt.' },
      { q: 'Får vi välja sortiment själva?', a: 'Vi har tre fasta korgar (Original, Premium, Banan) och anpassar säsongsmässigt. Det gör logistiken effektiv och håller priserna stabila.' },
      { q: 'Hur snabbt kan vi byta från en annan leverantör?', a: 'Vi startar oftast leveranser inom 3–5 vardagar. Vi skickar gärna en kostnadsfri provkorg innan ni bestämmer er.' },
    ]
  },
  {
    slug: 'egen-fruktinkop',
    alternativeName: 'Egen fruktinköp',
    metaTitle: 'Fruktkorg vs eget fruktinköp – vad lönar sig för kontoret?',
    metaDescription: 'Att köpa frukt själv eller beställa fruktkorg? Jämförelse av tid, kostnad och kvalitet för svenska företag som vill ha färsk frukt på kontoret.',
    hero: 'Köpa frukt själv eller beställa färdig fruktkorg? Här är de viktigaste skillnaderna.',
    intro: [
      'Många kontor börjar med att någon medarbetare köper frukt på vägen till jobbet en gång i veckan. Det fungerar – tills den personen är borta, fram tills frukten väljs på fel sätt, eller fram tills någon ska hantera kvitton och utlägg varje månad.',
      'En färdig fruktkorg löser alla de bitarna. Här är vad ni vinner – och vad ni faktiskt offrar.'
    ],
    rows: [
      { feature: 'Tidsåtgång', alternative: '30–60 min/vecka för en medarbetare', vitaminkorgen: 'Noll – levererat direkt till kontoret' },
      { feature: 'Beroendeställning', alternative: 'En person ansvarar – sårbart vid frånvaro', vitaminkorgen: 'Automatisk leverans varje vecka' },
      { feature: 'Kostnad per frukt', alternative: 'Butikspris (ofta högre)', vitaminkorgen: 'Grossistpris med bättre marginal' },
      { feature: 'Sortimentsvariation', alternative: 'Begränsat till lokal butiks utbud', vitaminkorgen: 'Säsongsmix från grossist' },
      { feature: 'Kvittohantering', alternative: 'Utlägg + manuell hantering varje vecka', vitaminkorgen: 'En månadsfaktura' },
      { feature: 'Bortlogistik', alternative: 'Bära påsar från butik till kontor', vitaminkorgen: 'Levererat direkt' },
    ],
    conclusion: 'Att köpa frukt själv fungerar i mindre skala men blir snabbt en flaskhals. En färdig fruktkorg är ofta billigare totalt om man räknar med arbetstid och kvittohantering.',
    faqs: [
      { q: 'Hur mycket sparar vi i tid?', a: 'En medarbetare lägger ofta 30–60 min/vecka på inköp + uppackning. Räknat på 50 veckor blir det 25–50 timmar/år.' },
      { q: 'Behåller vi flexibiliteten?', a: 'Ja. Ni kan när som helst pausa, byta korgstorlek eller ändra leveransdag.' },
      { q: 'Vad händer om frukten inte håller måttet?', a: '100 % nöjdhetsgaranti – inte nöjda? Vi byter eller krediterar.' },
    ]
  },
  {
    slug: 'frukostleverans',
    alternativeName: 'Frukostleverans',
    metaTitle: 'Fruktkorg vs frukostleverans – vad passar kontoret bäst?',
    metaDescription: 'Skillnaden mellan fruktkorg och frukostleverans till kontoret. Vad bör företag i Stockholm välja – och kan man ha båda?',
    hero: 'Fruktkorg eller frukostleverans? De svarar mot olika behov – så här tänker vi.',
    intro: [
      'Frukostleveranser har blivit populärt – yoghurt, müsli, smörgåsar och kaffe levererat till kontoret. Frågan är: behöver man också en fruktkorg, eller räcker frukosten?',
      'Vår erfarenhet av 150+ kontor är att de täcker olika behov. Frukost samlar teamet på morgonen, frukten finns där hela dagen.'
    ],
    rows: [
      { feature: 'Tillgänglighet', alternative: 'Begränsad till frukosttid (07–10)', vitaminkorgen: 'Hela arbetsdagen' },
      { feature: 'Hälsoprofil', alternative: 'Varierande (bröd, yoghurt, smör)', vitaminkorgen: 'Ren frukt – inga tillsatser' },
      { feature: 'Pris per medarbetare/vecka', alternative: 'Oftast högre', vitaminkorgen: 'Oftast lägre' },
      { feature: 'Logistik på plats', alternative: 'Behöver dukas fram och plockas undan', vitaminkorgen: 'Bara att ställa fram korgen' },
      { feature: 'Svinn', alternative: 'Risk för svinn efter frukosttid', vitaminkorgen: 'Frukt äts upp över hela veckan' },
      { feature: 'Bäst för', alternative: 'Gemensam frukost & teambuilding', vitaminkorgen: 'Daglig energipåfyllning' },
    ],
    conclusion: 'Det är inte ett antingen-eller. Många av våra kunder har frukostleverans 1–2 dagar/vecka och fruktkorg alla dagar. Kombinationen ger både gemenskapen på morgonen och energin under dagen.',
    faqs: [
      { q: 'Kan vi ha både och?', a: 'Absolut – det är faktiskt det vanligaste hos våra större kunder. Frukost för gemenskap, fruktkorg för daglig tillgänglighet.' },
      { q: 'Vilken passar bäst för ett litet kontor?', a: 'För ett kontor med 5–15 personer är fruktkorgen ofta tillräcklig. Frukost blir lätt mycket logistik för få personer.' },
      { q: 'Räknas fruktkorg som friskvård?', a: 'Frukt på arbetsplatsen är en uppskattad förmån. Konsultera er redovisning eller Skatteverket för exakta regler.' },
    ]
  },
];

export const getComparisonBySlug = (slug: string) =>
  comparisons.find(c => c.slug === slug);