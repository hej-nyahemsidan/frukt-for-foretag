export interface CompanySizeInfo {
  slug: string;
  size: number;
  label: string;
  metaTitle: string;
  metaDescription: string;
  hero: string;
  intro: string[];
  /** Recommended weekly setup (qty + product) */
  recommendation: {
    items: { qty: number; product: 'Original' | 'Premium' | 'Banan'; size: string }[];
    rationale: string;
    estimatedPerWeek: string;
  };
  tips: string[];
  faqs: { q: string; a: string }[];
}

export const companySizes: CompanySizeInfo[] = [
  {
    slug: '10-anstallda',
    size: 10,
    label: '10 anställda',
    metaTitle: 'Fruktkorg för 10 anställda – färsk frukt till lilla kontoret',
    metaDescription: 'Fruktkorg för 10 anställda. Färdigt paket: en mellanstor Fruktkorg Original per vecka – perfekt för det lilla kontoret i Stockholm.',
    hero: 'Rätt fruktkorg för det lilla kontoret med ca 10 medarbetare.',
    intro: [
      'Ett kontor med tio medarbetare har sina egna förutsättningar. Ni vill ha färsk frukt varje dag utan att det blir för mycket – och utan att behöva hantera flera leverantörer eller komplicerade beställningar.',
      'För team på runt 10 personer rekommenderar vi en mellanstor Fruktkorg Original per vecka. Det blir ca 2–3 frukter per person och vecka, vilket är lagom för att hålla frukten färsk fram till nästa leverans.',
      'Vill ni komplettera med extra bananer (som ofta är populärast) kan ni lägga till en mindre Banan-korg – många små kontor gör det.'
    ],
    recommendation: {
      items: [
        { qty: 1, product: 'Original', size: 'Mellan' },
      ],
      rationale: 'En mellanstor Original-korg per vecka räcker för 10 medarbetare. Cirka 25–30 frukter, blandade säsongssorter.',
      estimatedPerWeek: 'ca 25–30 frukter, en leveransdag/vecka',
    },
    tips: [
      'Välj en fast leveransdag tidigt i veckan (måndag eller tisdag) så håller frukten hela arbetsveckan',
      'Komplettera gärna med en Banan-korg om bananer går åt snabbast',
      'Pausa enkelt under semestern – inga extra avgifter',
    ],
    faqs: [
      { q: 'Räcker en korg per vecka för 10 personer?', a: 'Ja, en mellanstor Original-korg innehåller ca 25–30 frukter, vilket räcker bra för 10 medarbetare under en arbetsvecka.' },
      { q: 'Vad kostar det?', a: 'Priset varierar beroende på säsong och innehåll. Se aktuella priser i webshopen – för 10 anställda landar de flesta kunder runt 200–300 kr per vecka.' },
      { q: 'Kan vi börja med en provkorg?', a: 'Absolut – vi bjuder på första provkorgen utan kostnad.' },
    ]
  },
  {
    slug: '25-anstallda',
    size: 25,
    label: '25 anställda',
    metaTitle: 'Fruktkorg för 25 anställda – färsk frukt till mellanstora kontoret',
    metaDescription: 'Fruktkorg för 25 anställda. Färdigt veckopaket: Fruktkorg Original + Banan. Levererat med fri frakt i Stockholm varje vecka.',
    hero: 'Veckopaketet som passar mellanstora kontor med ca 25 medarbetare.',
    intro: [
      'Ett kontor med 25 personer har lite mer dynamik – fler möten, fler dagar med externa besök och oftast en blandning av medarbetare som är inne hela veckan och hybridarbetare.',
      'För team i den storleken rekommenderar vi en stor Fruktkorg Original kompletterad med en Fruktkorg Banan per vecka. Det ger både variation och säkrar att bananerna (som ofta tar slut först) alltid finns tillgängliga.',
      'Många kontor av den här storleken väljer två leveransdagar per vecka istället för en stor leverans – det håller frukten färskare och baren mer påfylld.'
    ],
    recommendation: {
      items: [
        { qty: 1, product: 'Original', size: 'Stor' },
        { qty: 1, product: 'Banan', size: 'Mellan' },
      ],
      rationale: 'Stor Original + Banan-korg per vecka räcker väl för 25 medarbetare. Totalt ca 60–70 frukter per vecka.',
      estimatedPerWeek: 'ca 60–70 frukter, 1–2 leveransdagar/vecka',
    },
    tips: [
      'Dela upp leveransen på 2 dagar (t.ex. måndag + torsdag) för konstant färsk frukt',
      'Banan-korg är ofta värd det – bananer går alltid åt först',
      'Anpassa storlek på Original-korgen säsongsvis (mindre på sommaren, större på vintern)',
    ],
    faqs: [
      { q: 'Hur mycket frukt behöver 25 personer per vecka?', a: 'Tumregel: 2–3 frukter per person och vecka, alltså runt 60–70 frukter totalt. Vårt rekommenderade paket täcker det med marginal.' },
      { q: 'Kan vi dela upp leveransen på flera dagar?', a: 'Ja, många kontor i den här storleken väljer två leveranser per vecka för att hålla frukten färsk.' },
      { q: 'Går det att skala upp om vi växer?', a: 'Absolut, ni kan när som helst byta paket eller lägga till fler korgar.' },
    ]
  },
  {
    slug: '50-anstallda',
    size: 50,
    label: '50 anställda',
    metaTitle: 'Fruktkorg för 50 anställda – stor fruktbar på kontoret',
    metaDescription: 'Fruktkorg för 50 anställda i Stockholm. 2 leveranser/vecka med Fruktkorg Original + Premium + Banan – håller fruktbaren fylld hela veckan.',
    hero: 'Stor fruktbar för kontor med ca 50 medarbetare.',
    intro: [
      'På ett kontor med 50 medarbetare blir fruktkorgen en synlig del av kontorskulturen. Det är inte längre en korg på fikabordet – det är en fruktbar som ska räcka och se fräsch ut hela veckan.',
      'För team i den storleken rekommenderar vi två leveransdagar per vecka med en stor Original-korg och en Banan-korg per leverans. Vi lägger gärna till en mindre Premium-korg som extra touch i receptionen eller mötesrummet.',
      'Många kontor av den här storleken är multinationella eller har frekventa kundbesök – då blir Premium-korgen en uppskattad detalj i klientmöten.'
    ],
    recommendation: {
      items: [
        { qty: 2, product: 'Original', size: 'Stor' },
        { qty: 2, product: 'Banan', size: 'Mellan' },
        { qty: 1, product: 'Premium', size: 'Mellan' },
      ],
      rationale: '2 leveransdagar med Original + Banan + en Premium i receptionen håller 50 medarbetare nöjda hela veckan.',
      estimatedPerWeek: 'ca 150 frukter, 2 leveransdagar/vecka',
    },
    tips: [
      'Placera en fruktbar centralt och fyll på från korgarna under veckan',
      'En Premium-korg i receptionen lyfter upplevelsen för besökare',
      'Anpassa volym efter beläggning – många pausar något under sommaren',
    ],
    faqs: [
      { q: 'Hur mycket frukt går åt på ett kontor med 50 anställda?', a: 'Räkna med ca 150 frukter per vecka, vilket motsvarar 2 Original-korgar + 2 Banan-korgar. Vi anpassar exakt mix efter er beläggning.' },
      { q: 'Hjälper ni till med att sätta upp fruktbaren?', a: 'Vi levererar i korgar som direkt kan ställas på en fruktbar. Vi har enkla tips för fina upplägg om ni vill ha en mer påkostad presentation.' },
      { q: 'Kan vi få faktura månadsvis?', a: 'Ja, alla företagskunder faktureras månadsvis med 15 dagars betalningsvillkor.' },
    ]
  },
  {
    slug: '100-anstallda',
    size: 100,
    label: '100 anställda',
    metaTitle: 'Fruktkorg för 100 anställda – företagsfrukt i större skala',
    metaDescription: 'Fruktkorg för 100 anställda. Vi sätter upp ett anpassat upplägg med flera leveranser per vecka för stora kontor och huvudkontor i Stockholm.',
    hero: 'Skräddarsytt fruktupplägg för stora kontor och huvudkontor.',
    intro: [
      'Med 100 medarbetare på ett kontor blir frukten en del av infrastrukturen – något som ska finnas där varje dag, oavsett möten eller events. Här räcker det inte med en korg eller två: det krävs ett upplägg.',
      'Vi arbetar med flera huvudkontor i Stockholm med 100+ medarbetare. Standardsetup är 3 leveranser per vecka med 3 Original-korgar + 3 Banan-korgar per leverans, kompletterat med en Premium-korg i reception och mötesrumsavdelning.',
      'För kontor i den storleken är det också vanligt att vi anpassar leveranser inför återkommande möten, kickoffer och event. Ni får en fast kontaktperson hos oss.'
    ],
    recommendation: {
      items: [
        { qty: 9, product: 'Original', size: 'Stor (3/dag, 3 dagar)' },
        { qty: 9, product: 'Banan', size: 'Mellan (3/dag, 3 dagar)' },
        { qty: 2, product: 'Premium', size: 'Mellan' },
      ],
      rationale: '3 leveransdagar/vecka med generös mix räcker för 100 medarbetare. Vi finjusterar tillsammans efter er beläggning.',
      estimatedPerWeek: 'ca 400+ frukter, 3 leveransdagar/vecka',
    },
    tips: [
      'Placera flera fruktstationer i olika delar av kontoret istället för en stor',
      'Använd Premium-korgen som synlig markör i reception och VIP-rum',
      'Vi sätter upp en fast leveransrutin med er office manager',
    ],
    faqs: [
      { q: 'Kan ni hantera leveranser till stora huvudkontor?', a: 'Ja, vi har flera kunder med 100+ medarbetare. Vi har rutiner för lastintag, receptioner och multitenant-fastigheter i Stockholm.' },
      { q: 'Får vi en fast kontaktperson?', a: 'Ja, alla större kunder får en namngiven kontaktperson som hanterar beställningar, justeringar och eventuella frågor.' },
      { q: 'Hur fungerar fakturering för stora kontor?', a: 'Månadsfaktura med 15 dagars kredit, samlat per kostnadsställe om ni vill. Vi stödjer e-fakturering via de vanligaste plattformarna.' },
    ]
  },
];

export const getCompanySizeBySlug = (slug: string) =>
  companySizes.find(s => s.slug === slug);