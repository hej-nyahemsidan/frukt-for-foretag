
export interface AreaInfo {
  slug: string;
  name: string;
  description: string;
  nearbyAreas: string[];
  /** Optional rich SEO content: multi-paragraph local intro (markdown-safe plain text). */
  longContent?: string[];
  /** Optional area-specific FAQ overrides for richer local pages. */
  localFaqs?: { q: string; a: string }[];
  /** Optional local highlights (specific districts, streets, landmarks). */
  highlights?: string[];
}

export const areas: AreaInfo[] = [
  {
    slug: 'ostermalm',
    name: 'Östermalm',
    description: 'Vi levererar färska fruktkorgar till kontor och företag på Östermalm. Snabb leverans i centrala Stockholm med handplockad kvalitetsfrukt.',
    nearbyAreas: ['Gärdet', 'Gamla stan', 'Södermalm'],
    highlights: ['Stureplan', 'Karlaplan', 'Strandvägen', 'Östermalmstorg', 'Birger Jarlsgatan', 'Humlegården'],
    longContent: [
      'Östermalm är hjärtat av Stockholms affärsliv – och just därför ett område där fruktkorgar på kontoret gör störst skillnad. Här samlas advokatbyråer, konsultbolag, finansbolag och kreativa byråer runt Stureplan, Karlaplan och Strandvägen. Vitaminkorgen levererar färska fruktkorgar till hundratals kontor i området varje vecka, från små startup-team på Birger Jarlsgatan till stora huvudkontor runt Östermalmstorg.',
      'Vår leveransbil rör sig genom Östermalm tidigt på morgonen, ofta före kl. 08:00, så att frukten står redo när medarbetarna kommer in. Vi känner de smala gränderna kring Humlegården, lastportarna på Sturegatan och receptionerna runt Karlavägen – det innebär att leveransen alltid kommer fram i tid, även de dagar då stadens trafik står still.',
      'För kontor på Östermalm rekommenderar vi ofta vår Fruktkorg Premium, eftersom området präglas av höga krav på kvalitet och presentation. Korgen innehåller 12–15 sorters handplockad säsongsfrukt och passar lika bra i ett klientmöte hos en advokatbyrå som i ett dagligt fikarum hos en kommunikationsbyrå.'
    ],
    localFaqs: [
      { q: 'Levererar ni fruktkorgar till kontor runt Stureplan och Östermalmstorg?', a: 'Ja, Stureplan, Östermalmstorg, Birger Jarlsgatan, Karlaplan och Strandvägen är några av våra mest trafikerade leveransadresser. Vi har specifika rutiner för portar och receptioner i området så att leveransen sker smidigt även i större fastigheter.' },
      { q: 'Hur tidigt på morgonen levererar ni på Östermalm?', a: 'Vi börjar vår Östermalmsslinga runt 07:00 och de flesta kontor i området har sin fruktkorg på plats innan kl. 09:00. Vill ni ha en specifik leveranstid är det bara att meddela oss vid beställning.' },
      { q: 'Vilken fruktkorg passar bäst för advokatbyråer och konsultbolag på Östermalm?', a: 'För kontor med mycket klientmöten rekommenderar vi Fruktkorg Premium. Den har 12–15 sorters handplockad frukt med en exklusivare profil – perfekt både för medarbetare och som blickfång i mötesrum och receptioner.' },
      { q: 'Kan ni leverera till större kontorshus med flera företag på Östermalm?', a: 'Absolut. Vi levererar regelbundet till multitenant-fastigheter på t.ex. Karlavägen, Sturegatan och Strandvägen. Varje kontor får sin egen korg märkt med företagsnamn så det aldrig blir några förväxlingar.' }
    ]
  },
  {
    slug: 'kungsholmen',
    name: 'Kungsholmen',
    description: 'Fruktkorgar till arbetsplatser på Kungsholmen. Vi levererar direkt till ert kontor med fri frakt – varje vecka.',
    nearbyAreas: ['Stadshagen', 'Fridhemsplan', 'Bromma'],
    highlights: ['Fridhemsplan', 'Stadshagen', 'Lindhagensgatan', 'Hornsbergs strand', 'S:t Eriksgatan', 'Rådhuset'],
    longContent: [
      'Kungsholmen har på bara några år vuxit till ett av Stockholms tätaste kontorsområden. Runt Lindhagensgatan, Hornsbergs strand och Stadshagen har stora bolag som Klarna, ICA och Microsoft sina huvudkontor – och tillsammans med myndigheter och advokatbyråer kring Rådhuset gör det Kungsholmen till en perfekt match för en veckovis fruktkorgsleverans.',
      'Vitaminkorgen kör Kungsholmen-rutten varje vardagsmorgon och kombinerar leveranser till både moderna kontorslandskap vid Hornsbergs strand och äldre kontor kring S:t Eriksgatan och Fridhemsplan. Vi har god kännedom om lastintag, garageinfarter och receptioner i området – något som spar tid både för oss och er reception.',
      'För kontor på Kungsholmen är Fruktkorg Original ofta det mest populära valet. Den passar bra för team om 10–25 medarbetare och innehåller ett brett urval av säsongens frukt. För större kontor i Hornsbergs strand kombinerar många kunder två eller tre korgar per vecka.'
    ],
    localFaqs: [
      { q: 'Levererar ni fruktkorgar till Hornsbergs strand och Lindhagensgatan?', a: 'Ja, Hornsbergs strand, Lindhagensgatan, Stadshagen och hela Lindhagenområdet är en av våra största leveranszoner. Vi har dagliga leveranser till flera av de stora kontorshusen där.' },
      { q: 'Kan ni leverera till kontor vid Fridhemsplan och S:t Eriksgatan?', a: 'Absolut. Vi levererar varje vecka till företag både runt Fridhemsplan, S:t Eriksgatan och hela Kungsholms Strand. Fri leverans, oavsett adress i området.' },
      { q: 'Vilken fruktkorg passar bäst för techbolag och startups på Kungsholmen?', a: 'För techbolag och startups rekommenderar vi ofta Fruktkorg Original kompletterad med en Fruktkorg Banan. Bananerna är populära som snabb energikick under långa kodsessioner, medan Original ger den dagliga variationen.' },
      { q: 'Hur snabbt kan vi komma igång med leveranser på Kungsholmen?', a: 'Vi kan oftast starta leveranser inom 3–5 vardagar från beställning. Vill ni testa först erbjuder vi en kostnadsfri provkorg som levereras till valfri adress på Kungsholmen.' }
    ]
  },
  { slug: 'stadshagen', name: 'Stadshagen', description: 'Beställ fruktkorgar till kontoret i Stadshagen. Färsk, säsongsanpassad frukt levererad till er dörr.', nearbyAreas: ['Kungsholmen', 'Fridhemsplan', 'Solna'] },
  { slug: 'fridhemsplan', name: 'Fridhemsplan', description: 'Fruktkorgar med fri leverans till Fridhemsplan. Vi förser kontor i området med färsk frukt varje vecka.', nearbyAreas: ['Kungsholmen', 'Stadshagen', 'Gamla stan'] },
  {
    slug: 'sodermalm',
    name: 'Södermalm',
    description: 'Fruktkorgar till företag på Södermalm. Handplockad frukt levererad direkt till ert kontor – smidigt och enkelt.',
    nearbyAreas: ['Gamla stan', 'Hammarby sjöstad', 'Östermalm'],
    highlights: ['SoFo', 'Medborgarplatsen', 'Götgatan', 'Hornstull', 'Skanstull', 'Slussen'],
    longContent: [
      'Södermalm är Stockholms kreativa motor – ett område där designbyråer, mediabolag, techstartups och konsultfirmor samsas på samma kvarter. Från SoFo och Nytorget i öster till Hornstull i väster bygger företag en kultur där hälsa, hållbarhet och välmående på arbetsplatsen står högt på agendan. En veckovis fruktkorg är därför en självklarhet för många kontor på Söder.',
      'Vi på Vitaminkorgen levererar fruktkorgar till hundratals företag på Södermalm – allt från små studios runt Skånegatan till större kontor vid Medborgarplatsen, Götgatan och Skanstull. Vår förarpersonal känner till smala gränder och inlastningsregler i området, vilket gör att leveranserna kommer fram även i de mer svårtillgängliga delarna av Söder.',
      'På Södermalm ser vi att många kontor väljer Fruktkorg Original för det dagliga utbudet och kompletterar med Fruktkorg Banan inför veckor med mycket möten eller events. För kontor som värdesätter den lilla extra exklusiviteten – ofta byråer som tar emot kund – passar Fruktkorg Premium bäst.'
    ],
    localFaqs: [
      { q: 'Levererar ni fruktkorgar till kontor på Götgatan och vid Medborgarplatsen?', a: 'Ja, hela stråket från Slussen via Medborgarplatsen, Götgatan och ner till Skanstull är en av våra mest frekvent trafikerade leveransrutter. Vi har kontor som kund i nästan varje kvarter.' },
      { q: 'Kan ni leverera till företag i SoFo och kring Nytorget?', a: 'Absolut. SoFo, Nytorget, Skånegatan och Bondegatan är ett område med många designbyråer och mediabolag som vi levererar till varje vecka. Fri leverans gäller hela Södermalm.' },
      { q: 'Vilken fruktkorg passar bäst för kreativa byråer på Södermalm?', a: 'För kreativa byråer rekommenderar vi Fruktkorg Original som veckobas – brett urval och hög kvalitet – kompletterad med Fruktkorg Banan när ni har långa workshop-dagar eller events.' },
      { q: 'Levererar ni även till Hornstull och Hornstulls strand?', a: 'Ja, hela västra Södermalm inklusive Hornstull, Hornstulls strand, Långholmsgatan och Reimersholme ingår i vår ordinarie Söder-rutt med fri leverans.' }
    ]
  },
  { slug: 'nacka', name: 'Nacka', description: 'Vi levererar fruktkorgar till kontor och företag i Nacka. Färsk frukt varje vecka med gratis leverans.', nearbyAreas: ['Hammarby sjöstad', 'Tyresö', 'Södermalm'] },
  {
    slug: 'hammarby-sjostad',
    name: 'Hammarby sjöstad',
    description: 'Fruktkorgar till moderna kontor i Hammarby sjöstad. Färsk, handplockad frukt levererad till er arbetsplats.',
    nearbyAreas: ['Södermalm', 'Nacka', 'Farsta'],
    highlights: ['Sickla', 'Lumaparken', 'Hammarby kaj', 'Henriksdal', 'Hammarby allé', 'Sjöstadsparterren'],
    longContent: [
      'Hammarby sjöstad är ett av Stockholms snabbast växande kontorsområden och hem för en stark mix av techbolag, mediahus och hållbarhetsinriktade företag. Med Spotifys gamla campus, Atrium Ljungbergs nya kontor i Sickla och en lång rad mindre techstartups runt Hammarby allé har området blivit en självklar destination för moderna arbetsgivare.',
      'Vi på Vitaminkorgen kör Hammarby sjöstad-rutten flera dagar i veckan och har god kännedom om både de moderna kontorshusen vid Hammarby kaj och de större fastigheterna i Sickla. Vår erfarenhet av området innebär att vi vet exakt var godsmottagningarna ligger och hur leveransen sker smidigast till varje hus.',
      'För kontor i Hammarby sjöstad väljer många Fruktkorg Original som grundabonnemang och kompletterar med Fruktkorg Banan till större utvecklingsteam. Områdets fokus på hållbarhet och hälsa gör att fruktkorg ofta är en del av en bredare medarbetarstrategi.'
    ],
    localFaqs: [
      { q: 'Levererar ni fruktkorgar till Sickla och Atrium Ljungbergs kontor?', a: 'Ja, Sickla är en av våra centrala leveranszoner i Hammarby sjöstad. Vi har dagliga leveranser till kontor i Atrium Ljungbergs fastigheter och kringliggande adresser.' },
      { q: 'Kan ni leverera till kontor vid Hammarby kaj och Lumaparken?', a: 'Absolut. Hammarby kaj, Lumaparken och Hammarby allé ingår i vår ordinarie Hammarbyrutt med fri leverans.' },
      { q: 'Vilken fruktkorg passar bäst för techbolag i Hammarby sjöstad?', a: 'För techbolag rekommenderar vi Fruktkorg Original som grund och en Fruktkorg Banan som komplement. Det ger både variation och snabb energi till långa kodsessioner.' },
      { q: 'Hur snabbt kan vi få igång leveranser till Hammarby sjöstad?', a: 'Provleverans kan oftast ske inom 3–5 vardagar. Ordinarie veckoleverans kan starta redan kommande vecka beroende på vald leveransdag.' }
    ]
  },
  {
    slug: 'solna',
    name: 'Solna',
    description: 'Beställ fruktkorgar till ert företag i Solna. Vi levererar färsk frukt till kontor i hela Solna med fri frakt.',
    nearbyAreas: ['Sundbyberg', 'Hagalund', 'Bromma'],
    highlights: ['Arenastaden', 'Solna Business Park', 'Frösunda', 'Hagalund', 'Råsunda', 'Solna strand'],
    longContent: [
      'Solna har på kort tid blivit en av Stockholms tätaste kontorsdestinationer. Arenastaden, Solna Business Park och Frösunda samlar några av Sveriges största arbetsgivare – från SEB och Telia till Vattenfall och Skanska. Det innebär också att området har en mycket hög koncentration av medarbetare som varje vecka konsumerar tusentals frukter.',
      'Vitaminkorgen levererar fruktkorgar till företag i hela Solna varje vardag. Vi har särskild erfarenhet av de större kontorsfastigheterna i Arenastaden och Solna Business Park, där rätt leveranstid och rätt rutin spar mycket tid för både oss och era receptioner.',
      'För större kontor i Solna är vanligen flera Fruktkorg Original per vecka det mest praktiska – ibland kombinerat med Fruktkorg Banan för utvecklings- och produktionsteam. För mindre kontor i Råsunda och Hagalund räcker oftast en korg per vecka.'
    ],
    localFaqs: [
      { q: 'Levererar ni fruktkorgar till Arenastaden och Solna Business Park?', a: 'Ja, Arenastaden och Solna Business Park är två av våra största leveranszoner. Vi har dagliga leveranser till flera av de stora kontorshusen i bägge områden.' },
      { q: 'Kan ni leverera flera korgar per vecka till större kontor i Solna?', a: 'Absolut. Vi har många Solna-kunder som har 2–5 korgar per vecka uppdelade på olika våningar eller avdelningar. Vi anpassar leveransen efter er struktur.' },
      { q: 'Vilka delar av Solna levererar ni till?', a: 'Vi levererar till hela Solna – Arenastaden, Solna Business Park, Frösunda, Råsunda, Hagalund, Solna strand och Solna centrum. Fri leverans gäller hela kommunen.' },
      { q: 'Kan ni leverera tidigt på morgonen i Solna?', a: 'Ja, vi börjar Solna-rutten tidigt och de flesta kontor har fruktkorgen på plats innan kl. 09:00. Önskemål om specifik leveranstid noterar vi vid beställning.' }
    ]
  },
  { slug: 'sundbyberg', name: 'Sundbyberg', description: 'Fruktkorgar till arbetsplatser i Sundbyberg. Vi levererar handplockad frukt direkt till kontoret varje vecka.', nearbyAreas: ['Solna', 'Hagalund', 'Bromma'] },
  { slug: 'hagalund', name: 'Hagalund', description: 'Färska fruktkorgar till kontor i Hagalund. Enkel beställning, fri leverans och alltid hög kvalitet.', nearbyAreas: ['Solna', 'Sundbyberg', 'Bromma'] },
  {
    slug: 'bromma',
    name: 'Bromma',
    description: 'Vi levererar fruktkorgar till företag i Bromma. Säsongens bästa frukt direkt till ert kontor.',
    nearbyAreas: ['Alvik', 'Sundbyberg', 'Kungsholmen'],
    highlights: ['Alvik', 'Ulvsunda', 'Mariehäll', 'Bromma Blocks', 'Annedal', 'Brommaplan'],
    longContent: [
      'Bromma är ett av Stockholms största kontorsområden – och samtidigt ett av de mest spridda. Från Alvik och Mariehäll i öster till Bromma Blocks och Ulvsunda i väster täcker området allt från traditionella industrifastigheter ombyggda till kontor, till moderna nybyggen vid Annedal.',
      'Vi på Vitaminkorgen kör Bromma flera dagar i veckan och hanterar både stora kontorshus vid Alvik och Mariehäll och mindre kontor utspridda kring Brommaplan och Ulvsunda. Vår rutt är optimerad så att leveransen kommer fram i tid även till de adresser som ligger lite mer avsides.',
      'För kontor i Bromma rekommenderar vi oftast Fruktkorg Original som grund. Många kunder kompletterar med Fruktkorg Banan – särskilt produktion-, lager- och utvecklingsbolag som finns i området.'
    ],
    localFaqs: [
      { q: 'Levererar ni fruktkorgar till Alvik och Mariehäll?', a: 'Ja, Alvik och Mariehäll är en del av vår ordinarie Bromma-rutt med fri leverans. Vi har många kunder i bägge områden.' },
      { q: 'Kan ni leverera till kontor i Annedal och Bromma Blocks?', a: 'Absolut. Annedal, Bromma Blocks och hela Ulvsunda industriområde ingår i vår leveranszon med fri frakt.' },
      { q: 'Hur ofta kör ni Bromma-rutten?', a: 'Vi kör Bromma flera dagar per vecka och kan oftast erbjuda valfri leveransdag mån–fre. Vid beställning väljer ni vilken dag som passar er bäst.' },
      { q: 'Vilken fruktkorg passar för lager- och produktionsbolag i Bromma?', a: 'För lager- och produktionsbolag rekommenderar vi ofta Fruktkorg Original kombinerat med Fruktkorg Banan. Bananerna ger snabb energi och äts upp snabbast i den miljön.' }
    ]
  },
  { slug: 'alvik', name: 'Alvik', description: 'Fruktkorgar med fri leverans till kontor i Alvik. Handplockad frukt av högsta kvalitet varje vecka.', nearbyAreas: ['Bromma', 'Kungsholmen', 'Sundbyberg'] },
  { slug: 'bandhagen', name: 'Bandhagen', description: 'Beställ fruktkorgar till arbetsplatsen i Bandhagen. Färsk frukt levererad till er dörr med gratis frakt.', nearbyAreas: ['Älvsjö', 'Hägersten', 'Farsta'] },
  { slug: 'alvsjo', name: 'Älvsjö', description: 'Fruktkorgar till kontor och företag i Älvsjö. Vi levererar färsk, handplockad frukt varje vecka.', nearbyAreas: ['Bandhagen', 'Hägersten', 'Västberga'] },
  { slug: 'hagersten', name: 'Hägersten', description: 'Vi levererar fruktkorgar till arbetsplatser i Hägersten. Enkel beställning och alltid fri leverans.', nearbyAreas: ['Västberga', 'Älvsjö', 'Fruängen'] },
  { slug: 'vastberga', name: 'Västberga', description: 'Fruktkorgar till företag i Västberga industriområde. Perfekt för kontor som vill erbjuda frukt på jobbet.', nearbyAreas: ['Hägersten', 'Älvsjö', 'Bandhagen'] },
  { slug: 'tumba', name: 'Tumba', description: 'Beställ fruktkorgar till kontoret i Tumba. Vi levererar färsk frukt med fri frakt till hela Botkyrka.', nearbyAreas: ['Salem', 'Botkyrka', 'Huddinge'] },
  { slug: 'salem', name: 'Salem', description: 'Fruktkorgar till företag i Salem. Handplockad säsongsfrukt levererad direkt till er arbetsplats.', nearbyAreas: ['Tumba', 'Botkyrka', 'Huddinge'] },
  { slug: 'botkyrka', name: 'Botkyrka', description: 'Vi levererar fruktkorgar till kontor i Botkyrka. Färsk frukt varje vecka med gratis leverans.', nearbyAreas: ['Tumba', 'Salem', 'Huddinge'] },
  { slug: 'tyreso', name: 'Tyresö', description: 'Fruktkorgar till arbetsplatser i Tyresö. Säsongens bästa frukt levererad med fri frakt.', nearbyAreas: ['Haninge', 'Nacka', 'Farsta'] },
  { slug: 'haninge', name: 'Haninge', description: 'Beställ fruktkorgar till ert företag i Haninge. Vi levererar färsk frukt till kontor i hela kommunen.', nearbyAreas: ['Handen', 'Jordbro', 'Tyresö'] },
  { slug: 'handen', name: 'Handen', description: 'Fruktkorgar med fri leverans till kontor i Handen. Handplockad kvalitetsfrukt varje vecka.', nearbyAreas: ['Haninge', 'Jordbro', 'Skogås'] },
  { slug: 'skogas', name: 'Skogås', description: 'Vi levererar fruktkorgar till företag i Skogås. Enkel beställning, fri frakt och premium frukt.', nearbyAreas: ['Farsta', 'Handen', 'Haninge'] },
  { slug: 'farsta', name: 'Farsta', description: 'Fruktkorgar till kontor i Farsta. Färsk, handplockad frukt levererad direkt till arbetsplatsen.', nearbyAreas: ['Sköndal', 'Bandhagen', 'Skogås'] },
  { slug: 'skondal', name: 'Sköndal', description: 'Beställ fruktkorgar till kontoret i Sköndal. Vi erbjuder fri leverans och hög kvalitet varje vecka.', nearbyAreas: ['Farsta', 'Bandhagen', 'Nacka'] },
  {
    slug: 'gardet',
    name: 'Gärdet',
    description: 'Fruktkorgar till arbetsplatser på Gärdet. Handplockad säsongsfrukt levererad till ert kontor.',
    nearbyAreas: ['Östermalm', 'Ropsten', 'Södermalm'],
    highlights: ['Karlaplan', 'Värtahamnen', 'Sandhamnsgatan', 'Tessinparken', 'Frihamnen', 'Ladugårdsgärdet'],
    longContent: [
      'Gärdet är ett av Stockholms mest etablerade kontorsområden, känt för en blandning av mediabolag, ambassader och konsultfirmor. Från Karlaplan i söder, via Tessinparken och Sandhamnsgatan, hela vägen ut till Värtahamnen och Frihamnen bor en stor del av Stockholms huvudkontorsstruktur.',
      'Vi levererar fruktkorgar till företag på Gärdet varje vecka. Vår förarrutt täcker både de större mediahusen vid Värtahamnen och de mindre kontoren runt Tessinparken. Vi har god kännedom om receptionsrutiner i området, vilket gör att leveransen alltid sker smidigt.',
      'På Gärdet är Fruktkorg Original det vanligaste valet för medelstora kontor, medan större mediahus ofta kombinerar Original och Premium per våning. Det ger både ett dagligt utbud i fikarummen och en mer representativ korg i klientreception och mötesrum.'
    ],
    localFaqs: [
      { q: 'Levererar ni fruktkorgar till mediahus vid Värtahamnen och Frihamnen?', a: 'Ja, Värtahamnen och Frihamnen är en del av vår dagliga Gärdet-rutt. Vi har många kunder bland mediabolag och konsultfirmor i området.' },
      { q: 'Kan ni leverera till kontor runt Karlaplan och Tessinparken?', a: 'Absolut. Karlaplan, Tessinparken, Sandhamnsgatan och Erik Dahlbergsgatan ingår alla i vår Gärdet-leveranszon med fri frakt.' },
      { q: 'Hur tidigt levererar ni på Gärdet?', a: 'Vi börjar Gärdet-rutten runt 07:30 och de flesta kontor har fruktkorgen på plats innan kl. 09:30.' },
      { q: 'Kan ni leverera till ambassader och statliga kontor på Gärdet?', a: 'Ja, vi har erfarenhet av att leverera till ambassader och myndigheter i området. Vi anpassar leveransrutiner efter eventuella säkerhetskrav.' }
    ]
  },
  { slug: 'ropsten', name: 'Ropsten', description: 'Vi levererar fruktkorgar till kontor vid Ropsten. Färsk frukt med fri leverans varje vecka.', nearbyAreas: ['Gärdet', 'Östermalm', 'Nacka'] },
  { slug: 'taby', name: 'Täby', description: 'Fruktkorgar till företag i Täby. Säsongens bästa frukt levererad med gratis frakt till ert kontor.', nearbyAreas: ['Arninge', 'Solna', 'Järfälla'] },
  { slug: 'arninge', name: 'Arninge', description: 'Beställ fruktkorgar till arbetsplatsen i Arninge. Vi levererar handplockad frukt med fri frakt.', nearbyAreas: ['Täby', 'Solna', 'Järfälla'] },
  { slug: 'jarfalla', name: 'Järfälla', description: 'Fruktkorgar till kontor i Järfälla. Färsk frukt levererad varje vecka med gratis leverans.', nearbyAreas: ['Sundbyberg', 'Solna', 'Bromma'] },
  { slug: 'fruangen', name: 'Fruängen', description: 'Vi levererar fruktkorgar till företag i Fruängen. Enkel beställning och alltid hög kvalitet.', nearbyAreas: ['Hägersten', 'Älvsjö', 'Västberga'] },
  { slug: 'gamla-stan', name: 'Gamla stan', description: 'Fruktkorgar till kontor i Gamla stan. Handplockad frukt levererad till hjärtat av Stockholm.', nearbyAreas: ['Södermalm', 'Östermalm', 'Kungsholmen'] },
  { slug: 'stockholm', name: 'Stockholm City', description: 'Fruktkorgar till kontor i centrala Stockholm. Vi levererar färsk frukt till företag i hela city med fri frakt.', nearbyAreas: ['Östermalm', 'Södermalm', 'Kungsholmen'] },
  { slug: 'huddinge', name: 'Huddinge', description: 'Beställ fruktkorgar till ert företag i Huddinge. Färsk säsongsfrukt med gratis leverans varje vecka.', nearbyAreas: ['Älvsjö', 'Tumba', 'Botkyrka'] },
  { slug: 'jordbro', name: 'Jordbro', description: 'Fruktkorgar till arbetsplatser i Jordbro. Vi levererar handplockad frukt med fri frakt.', nearbyAreas: ['Haninge', 'Handen', 'Skogås'] },
  { slug: 'lanna', name: 'Länna', description: 'Vi levererar fruktkorgar till kontor i Länna. Färsk frukt med fri leverans och hög kvalitet.', nearbyAreas: ['Haninge', 'Handen', 'Tyresö'] },
];

export const getAreaBySlug = (slug: string): AreaInfo | undefined => {
  return areas.find(a => a.slug === slug);
};
