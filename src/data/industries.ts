export interface IndustryInfo {
  slug: string;
  name: string;
  shortLabel: string;
  /** SEO meta description template ({area} replaced at render time) */
  metaDescription: string;
  /** Why fruit baskets matter for this industry (2–3 paragraphs) */
  intro: string[];
  /** Recommended product + reasoning */
  recommendation: string;
  /** Bullet benefits tailored to the industry */
  benefits: string[];
  /** FAQ tailored to this industry × area combination */
  faqs: { q: string; a: string }[];
}

export const industries: IndustryInfo[] = [
  {
    slug: 'advokatbyra',
    name: 'Advokatbyrå',
    shortLabel: 'advokatbyråer',
    metaDescription: 'Fruktkorg till advokatbyrå i {area}. Färsk frukt levererad till kontoret och mötesrummen varje vecka – perfekt för klientmöten.',
    intro: [
      'Advokatbyråer ställer höga krav på både kvalitet och presentation. En välfylld fruktkorg i receptionen eller i mötesrummet signalerar omsorg om både medarbetare och klienter – och blir en naturlig del av en lyckad klientupplevelse.',
      'På Vitaminkorgen levererar vi varje vecka fruktkorgar till advokatbyråer som vill ha färsk, handplockad frukt utan att behöva tänka på inköp. Vi anpassar storlek och leveransdag efter er kalender och de dagar ni har flest klientmöten.',
      'För juridiska kontor är dessutom hälsa och fokus avgörande. Lätt tillgänglig frukt är ett enkelt sätt att hålla energinivåerna jämna under långa förhandlingsdagar och tidskritiska deadlines.'
    ],
    recommendation: 'För advokatbyråer rekommenderar vi Fruktkorg Premium – 12–15 sorters handplockad säsongsfrukt med en exklusiv profil som passar både medarbetare och klientmöten.',
    benefits: [
      'Snygg presentation i receptionen vid klientmöten',
      'Stabil leverans varje vecka – inget att tänka på',
      'Faktura med 15 dagars kredit, smidigt för redovisningen',
      'Anpassad storlek efter antal jurister och paralegals'
    ],
    faqs: [
      { q: 'Kan ni leverera till mötesrum inför klientmöten?', a: 'Ja. Vi kan dela upp leveransen så att frukt ställs både i fikarum och i mötesrum. Många advokatbyråer väljer att ha en Premium-korg i receptionen som blickfång.' },
      { q: 'Hur faktureras leveranserna?', a: 'Vi fakturerar månadsvis med 15 dagars betalningsvillkor. Faktura skickas via e-post eller via er e-faktureringsleverantör.' },
      { q: 'Kan vi pausa leveransen under semesterperioder?', a: 'Absolut. Ni kan pausa leveransen valfria veckor – meddela bara via mail eller telefon.' }
    ]
  },
  {
    slug: 'reklambyra',
    name: 'Reklam- & kommunikationsbyrå',
    shortLabel: 'reklam- och kommunikationsbyråer',
    metaDescription: 'Fruktkorg till reklambyrå i {area}. Färsk frukt och energi till kreativa team – levererat direkt till kontoret varje vecka.',
    intro: [
      'Reklam- och kommunikationsbyråer lever på kreativ energi. Långa pitch-dagar, snabba deadlines och team som rör sig mellan möten kräver bränsle som är lätt att greppa – och det är där en fruktkorg gör störst skillnad.',
      'Vitaminkorgen levererar varje vecka färska fruktkorgar till byråer som vill ha en synlig, generös fruktbar i lounge eller fikarum. Vi anpassar storlek efter teamets storlek och de dagar ni har flest medarbetare på plats.',
      'För hybrida team är fruktkorgen dessutom en konkret anledning att komma in till kontoret – något många byråer märker direkt efter första leveransen.'
    ],
    recommendation: 'För reklambyråer är vår Fruktkorg Original den vanligaste basen, ofta kompletterad med en Fruktkorg Banan för snabb energi mellan möten.',
    benefits: [
      'Visuellt tilltalande fruktbar i loungen',
      'Energi till kreativa team genom hela dagen',
      'Lockar tillbaka medarbetare till kontoret i hybridmodell',
      'Anpassningsbar storlek efter pitch- och presentationsdagar'
    ],
    faqs: [
      { q: 'Kan ni leverera fler korgar inför kundpresentationer?', a: 'Ja. Inför stora pitch-dagar kan ni enkelt lägga till en extra Premium-korg för presentationen. Beställning sker via telefon eller mail med några dagars framförhållning.' },
      { q: 'Vilken storlek passar för en byrå med 20 anställda?', a: 'För ett team på ca 20 medarbetare brukar en Fruktkorg Original i mellanstorlek + en Fruktkorg Banan per vecka räcka bra.' },
      { q: 'Kan vi byta produktmix från vecka till vecka?', a: 'Absolut. Många byråer alternerar mellan Original och Premium beroende på kommande klientbesök.' }
    ]
  },
  {
    slug: 'tech-startup',
    name: 'Tech & Startup',
    shortLabel: 'tech-bolag och startups',
    metaDescription: 'Fruktkorg till tech-bolag och startups i {area}. Färsk frukt som personalförmån för utvecklare och produktteam – levererat varje vecka.',
    intro: [
      'Tech-bolag och startups konkurrerar om talangen, och personalförmåner väger tungt. En veckovis fruktkorg är en synlig, daglig förmån som märks direkt – betydligt mer än ett abstrakt friskvårdsbidrag.',
      'Vi på Vitaminkorgen levererar fruktkorgar till tech-team som behöver enkel, snabb energi under långa kodsessioner. Bananerna går alltid åt först – därför kombinerar många kunder en Original-korg med en separat Banan-korg.',
      'Många startups börjar med en mindre korg per vecka och skalar upp i takt med teamet växer. Vi anpassar enkelt leveransen utan bindningstid.'
    ],
    recommendation: 'För tech-bolag och startups rekommenderar vi Fruktkorg Original + Fruktkorg Banan – kombinationen ger både variation och snabb energi.',
    benefits: [
      'Konkret, synlig personalförmån',
      'Banan-korg som extra energi under sprint-dagar',
      'Enkel uppskalning när teamet växer',
      'Snabb start – leverans inom 3–5 vardagar'
    ],
    faqs: [
      { q: 'Vilken fruktkorg passar bäst för ett tech-team på 15 utvecklare?', a: 'En Fruktkorg Original i mellanstorlek + en Fruktkorg Banan per vecka är en bra startpunkt. Bananerna går oftast åt snabbt under fokuserade kodsessioner.' },
      { q: 'Hur snabbt kan vi komma igång?', a: 'Vi kan oftast starta leveranser inom 3–5 vardagar. Vill ni testa först erbjuder vi en kostnadsfri provkorg.' },
      { q: 'Kan vi ändra leveransfrekvens när vi växer?', a: 'Ja, ni kan när som helst uppgradera till fler leveransdagar per vecka eller större korgar.' }
    ]
  },
  {
    slug: 'konsultbyra',
    name: 'Konsultbyrå',
    shortLabel: 'konsultbyråer',
    metaDescription: 'Fruktkorg till konsultbyrå i {area}. Färsk frukt till kontoret – perfekt för team som varvar kund- och kontorsdagar.',
    intro: [
      'Konsulter rör sig mycket – mellan kunduppdrag, hemmajobb och kontorsdagar. En väl tilltagen fruktkorg på de dagar teamet samlas på kontoret är ett enkelt sätt att skapa en gemensam mötespunkt och visa uppskattning för medarbetarna.',
      'Vitaminkorgen levererar till konsultbyråer som vill ha frukt på plats just de dagar då flest medarbetare är inne. Vi anpassar leveransdagar efter ert ”office days”-schema.',
      'För konsultbolag som tar emot kunder på kontoret är en Premium-korg i mötesrummet dessutom ett snyggt komplement till kaffe och vatten.'
    ],
    recommendation: 'För konsultbyråer är Fruktkorg Original ett naturligt val – kompletterat med Fruktkorg Premium för klientmöten och workshops.',
    benefits: [
      'Leverans planerad efter era office days',
      'Premium-korg som extra touch i kundmöten',
      'Flexibel pausning under låga perioder',
      'Faktura med 15 dagars kredit'
    ],
    faqs: [
      { q: 'Kan ni leverera bara på utvalda veckodagar?', a: 'Ja. Vi anpassar leveransdagar efter när flest av era konsulter är på plats. Tisdagar och torsdagar är populära dagar för konsultbolag.' },
      { q: 'Hur fungerar leverans i samband med workshops?', a: 'Vi kan addera en extra Premium-korg till specifika datum med ett par dagars framförhållning.' },
      { q: 'Går det att pausa leveransen i sommar?', a: 'Absolut. Många konsultbyråer pausar leveransen under v.27–32 och återupptar i augusti.' }
    ]
  },
  {
    slug: 'redovisningsbyra',
    name: 'Redovisnings- & revisionsbyrå',
    shortLabel: 'redovisnings- och revisionsbyråer',
    metaDescription: 'Fruktkorg till redovisningsbyrå i {area}. Färsk frukt till kontoret – extra uppskattat under deklarations- och bokslutstider.',
    intro: [
      'Redovisnings- och revisionsbyråer har tydliga toppar i arbetsbelastning – deklarationsperioder, bokslut och rapporteringar. Att ha färsk frukt lättillgängligt är ett enkelt sätt att hålla teamet alert genom långa dagar.',
      'Vitaminkorgen levererar varje vecka till redovisningsbyråer som vill ha en stabil bas av frukt på kontoret. Vi kan enkelt skala upp leveranserna under bokslutsperioder och skala ner under lugnare månader.',
      'För många redovisningsbyråer fungerar fruktkorgen också som en del av personalförmånerna – ett konkret komplement till friskvård och pension.'
    ],
    recommendation: 'För redovisningsbyråer är Fruktkorg Original i mellanstorlek en stabil bas, kompletterad med en extra korg under intensiva bokslutsperioder.',
    benefits: [
      'Extra uppskattat under bokslutsperioder',
      'Skala upp och ner efter säsong',
      'Enkel hantering – en månadsfaktura',
      'Synlig personalförmån som märks varje vecka'
    ],
    faqs: [
      { q: 'Kan vi öka antalet korgar under deklarationsperioden?', a: 'Ja. Många byråer dubblar leveransen under mars–april och under bokslutsperioder. Meddela oss bara så justerar vi nästa leverans.' },
      { q: 'Hur fungerar fakturering?', a: 'Månadsfaktura med 15 dagars kredit. Vi kan även skicka via e-fakturatjänst om ni föredrar det.' },
      { q: 'Är fruktkorg en avdragsgill personalförmån?', a: 'Frukt på arbetsplatsen är generellt en uppskattad förmån. Konsultera er egen redovisning eller Skatteverket för aktuella regler.' }
    ]
  },
  {
    slug: 'coworking',
    name: 'Coworking-space',
    shortLabel: 'coworking-spaces',
    metaDescription: 'Fruktkorg till coworking i {area}. Färsk frukt som medlemsförmån – levererat till lounge eller pentry varje vecka.',
    intro: [
      'Coworking-spaces konkurrerar om medlemmar med upplevelsen i loungen. En generös fruktbar mitt i lokalen är en synlig, daglig förmån som märks från första besöket – och som ofta nämns i recensioner.',
      'Vitaminkorgen levererar till coworking-aktörer som vill ha en visuellt tilltalande fruktbar med rejäl volym. Vi anpassar leveransfrekvens efter antal medlemmar och beläggning.',
      'Många coworking-aktörer kombinerar en stor Original-korg med en Banan-korg per vecka för att alltid ha snabb energi tillgänglig vid event och afterworks.'
    ],
    recommendation: 'För coworking-spaces rekommenderar vi en stor Fruktkorg Original + Fruktkorg Banan, ofta med leverans 2 gånger per vecka för att hålla baren fylld.',
    benefits: [
      'Synlig medlemsförmån i loungen',
      'Flera leveranser per vecka för konstant påfyllning',
      'Extra korgar inför event och pitch-kvällar',
      'Anpassad volym efter beläggning'
    ],
    faqs: [
      { q: 'Kan ni leverera flera gånger per vecka?', a: 'Ja, vi har många coworking-kunder med leverans tisdag och torsdag för att hålla fruktbaren fylld hela veckan.' },
      { q: 'Kan vi beställa extra inför event?', a: 'Absolut. Inför event eller pitch-kvällar kan ni lägga till extra korgar med ett par dagars framförhållning.' },
      { q: 'Hur stor korg behövs för en lokal med 100 medlemmar?', a: 'För 100 aktiva medlemmar rekommenderar vi en stor Original-korg + Banan-korg, levererat 2 gånger per vecka.' }
    ]
  }
];

export const getIndustryBySlug = (slug: string) =>
  industries.find(i => i.slug === slug);

/**
 * Priority areas where industry × area pages are generated and listed in sitemap.
 * Focused on Stockholms högst trafikerade kontorsområden.
 */
export const priorityAreaSlugs = [
  'ostermalm',
  'kungsholmen',
  'sodermalm',
  'stadshagen',
  'fridhemsplan',
  'gamla-stan',
  'solna',
  'gardet',
];