
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Check, Truck, Star, Leaf, Clock, ShieldCheck, MapPin, Phone, Plus, Minus, Users, Heart, Zap } from 'lucide-react';
import { areas } from '@/data/areas';
import fruktkorgPremium from '@/assets/fruktkorg-premium-new.jpg';
import fruktkorgStandard from '@/assets/fruktkorg-standard-new.jpg';
import fruktkorgBanan from '@/assets/fruktkorg-banan-new.jpg';
import officeWorkers from '@/assets/medarbetare-fruktkorgar-kontor.jpg';

const faqItems = [
  {
    question: "Hur fungerar fruktkorgar till kontoret i Stockholm?",
    answer: "Vi levererar färska fruktkorgar direkt till ert kontor i Stockholm varje vecka. Ni väljer vilken fruktkorg som passar er – Original, Premium eller Banan – samt vilken dag ni vill ha leverans. Vi sköter resten. Fruktkorgen ställs på avtalad plats och ni behöver inte vara på plats vid leverans."
  },
  {
    question: "Vilka områden i Stockholm levererar ni fruktkorgar till?",
    answer: "Vi levererar fruktkorgar till hela Stockholmsområdet, inklusive Södermalm, Kungsholmen, Östermalm, Vasastan, Norrmalm, Gamla Stan, Solna, Sundbyberg, Bromma, Hägersten, Nacka, Lidingö och många fler. Vi levererar även till Södertälje och Uppsala."
  },
  {
    question: "Kan vi testa en fruktkorg innan vi bestämmer oss?",
    answer: "Absolut! Vi erbjuder en kostnadsfri provkorg så ni kan uppleva kvaliteten själva. Ingen bindningstid krävs – testa och bestäm er sedan. Fyll i vår offertförfrågan så kontaktar vi er inom 24 timmar."
  },
  {
    question: "Hur mycket kostar en fruktkorg i Stockholm?",
    answer: "Våra fruktkorgar börjar från cirka 230 kr per vecka för en Fruktkorg Original (8-10 frukter). Premium-korgen med 12-15 frukter kostar från 299 kr/vecka. Vi skräddarsyr gärna en offert baserat på antal medarbetare och era önskemål."
  },
  {
    question: "Kan vi anpassa fruktkorgen efter allergier eller önskemål?",
    answer: "Ja, vi skapar skräddarsydda fruktkorgar där vi tar bort specifika frukter och ersätter dem med andra. Meddela oss vid beställning eller hantera det enkelt via er kundportal. Vi vill att alla på kontoret ska kunna njuta av frukten."
  },
  {
    question: "Hur färsk är frukten ni levererar?",
    answer: "All frukt handplockas och packas samma morgon som leveransen sker. Vi arbetar med noggrant utvalda leverantörer för att garantera att ni alltid får säsongens bästa och fräschaste frukt till ert kontor i Stockholm."
  },
  {
    question: "Kan vi lägga till andra varor som kaffe, mjölk eller snacks?",
    answer: "Ja! Förutom fruktkorgar erbjuder vi ett brett sortiment av kontorsprodukter – kaffe, te, mejeri, snacks, drycker och städprodukter. Allt levereras samtidigt som er fruktkorg för smidig hantering."
  },
  {
    question: "Vad är minsta beställning för fruktkorgar?",
    answer: "Vår minsta leverans är en fruktkorg från 4 kg per vecka. Det räcker för ett kontor med 5-8 medarbetare. För större kontor rekommenderar vi att ni kontaktar oss för en skräddarsydd lösning."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer
    }
  }))
};

const FruktkorgStockholm = () => {
  const [expandedFaq, setExpandedFaq] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    setExpandedFaq(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const featuredAreas = areas.filter(a => 
    ['sodermalm', 'kungsholmen', 'ostermalm', 'vasastan', 'norrmalm', 'solna', 'sundbyberg', 'bromma', 'nacka', 'lidingo', 'gamla-stan', 'hagersten'].includes(a.slug)
  );

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Fruktkorg Stockholm – Fruktleverans till kontoret | Vitaminkorgen"
        description="Beställ fruktkorg Stockholm ✓ Färska fruktkorgar levererade till kontoret varje vecka. Fri leverans. 150+ nöjda företag. Prova gratis!"
        keywords="fruktkorg stockholm, fruktkorgar stockholm, fruktleverans stockholm, fruktbud stockholm, färsk frukt stockholm, fruktkorg leverans stockholm, beställa fruktkorg stockholm, frukt på jobbet stockholm, fruktbudet stockholm"
        type="products"
      />
      {/* FAQ Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-700 to-green-900" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block bg-yellow-400 text-green-900 font-semibold px-4 py-1 rounded-full text-sm mb-6">
                📍 Stockholm & Södertälje & Uppsala
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Fruktkorg Stockholm – Färska fruktkorgar levererade till dig
              </h1>
              <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed">
                Som ert lokala fruktbud levererar vi handplockade fruktkorgar i hela Stockholmsområdet. 
                Färsk, säsongsanpassad frukt direkt till ditt kontor – med gratis leverans varje vecka.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/kontakt">
                  <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold text-lg px-8">
                    Beställ gratis provkorg
                  </Button>
                </Link>
                <Link to="/produkter">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                    Se vårt sortiment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-12 bg-green-50 border-b">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { icon: Truck, text: 'Fri leverans i Stockholm' },
                { icon: Star, text: '150+ nöjda företag' },
                { icon: Leaf, text: 'Färsk säsongsfrukt' },
                { icon: ShieldCheck, text: '100% nöjdhetsgaranti' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Icon className="h-6 w-6 text-green-700" />
                  </div>
                  <span className="text-sm font-medium text-green-900">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Intro SEO Text */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">
                Fruktkorgar i Stockholm – Så fungerar det
              </h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p>
                  Att ha <strong>fruktkorgar på jobbet i Stockholm</strong> är ett enkelt och uppskattat sätt att visa omtanke om sina medarbetare. 
                  Vitaminkorgen har sedan 2021 levererat färska fruktkorgar till över 150 företag i Stockholmsområdet – från 
                  små startups på <Link to="/fruktkorg/sodermalm" className="text-green-700 underline hover:text-green-900">Södermalm</Link> till 
                  stora organisationer i <Link to="/fruktkorg/solna" className="text-green-700 underline hover:text-green-900">Solna</Link> och <Link to="/fruktkorg/kungsholmen" className="text-green-700 underline hover:text-green-900">Kungsholmen</Link>.
                </p>
                <p>
                  Som ert lokala <strong>fruktbud i Stockholm</strong> ser vi till att varje fruktkorg packas med handplockad, 
                  säsongsanpassad frukt av högsta kvalitet. Vi levererar direkt till er dörr – oavsett om ni sitter 
                  på <Link to="/fruktkorg/ostermalm" className="text-green-700 underline hover:text-green-900">Östermalm</Link>, i <Link to="/fruktkorg/gamla-stan" className="text-green-700 underline hover:text-green-900">Gamla Stan</Link> eller 
                  ute i <Link to="/fruktkorg/nacka" className="text-green-700 underline hover:text-green-900">Nacka</Link>.
                </p>
                <p>
                  Forskning visar att tillgång till färsk frukt på arbetsplatsen ökar både välmående och produktivitet. 
                  En <strong>fruktkorg på kontoret</strong> är inte bara en hälsoförmån – det är en investering i era medarbetares trivsel 
                  och en signal om att ni bryr er. Många av våra kunder berättar att fruktkorgen snabbt blir en uppskattad del av vardagen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-16 md:py-24 bg-green-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-4">
              Våra fruktkorgar i Stockholm
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Vi erbjuder tre populära fruktkorgar anpassade för alla typer av kontor. Alla med fri leverans i hela Stockholm.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  img: fruktkorgStandard, 
                  name: 'Fruktkorg Original', 
                  desc: 'Perfekt för det mindre kontoret med 5-10 medarbetare. Innehåller ett varierat urval av säsongens bästa frukter – äpplen, bananer, päron, clementiner och mer.',
                  features: ['8-10 frukter', 'Säsongsanpassad', 'Fri leverans', 'Från 230 kr/vecka'],
                  link: '/produkter'
                },
                { 
                  img: fruktkorgPremium, 
                  name: 'Fruktkorg Premium', 
                  desc: 'Vår mest populära fruktkorg med handplockade premiumfrukter. Perfekt för kontor som vill ha det lilla extra – mango, vindruvor, kiwi och exotiska frukter.',
                  features: ['12-15 frukter', 'Premiumkvalitet', 'Exotiska frukter', 'Från 299 kr/vecka'],
                  link: '/produkter'
                },
                { 
                  img: fruktkorgBanan, 
                  name: 'Fruktkorg Banan', 
                  desc: 'En fruktkorg med extra fokus på bananer – Sveriges mest populära frukt. Perfekt som snabb energikick mellan möten eller som frukost på jobbet.',
                  features: ['Bananer i fokus', 'Energiboost', 'Populärt val', 'Från 230 kr/vecka'],
                  link: '/produkter'
                },
              ].map((product, i) => (
                <Link key={i} to={product.link} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                  <img src={product.img} alt={`${product.name} levererad till kontor i Stockholm`} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-green-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{product.desc}</p>
                    <ul className="space-y-2">
                      {product.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                          <Check className="h-4 w-4 text-green-600 flex-shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <p className="text-gray-600 mb-4">
                Förutom fruktkorgar erbjuder vi även <Link to="/produkter" className="text-green-700 underline hover:text-green-900">kaffe, te, snacks, mejeri och städprodukter</Link> – allt levererat samtidigt.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-12">
              Så enkelt beställer du fruktkorg i Stockholm
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { step: '1', title: 'Välj fruktkorg', desc: 'Bläddra i vårt sortiment och välj den fruktkorg som passar ert kontor. Osäker? Vi hjälper er att välja rätt.', icon: Zap },
                { step: '2', title: 'Vi levererar gratis', desc: 'Vi levererar färska fruktkorgar direkt till er adress i Stockholm – helt gratis, den dag ni väljer.', icon: Truck },
                { step: '3', title: 'Njut varje vecka', desc: 'Era medarbetare njuter av handplockad, färsk frukt. Vi fyller på automatiskt varje vecka.', icon: Heart },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold text-green-900 mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-green-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/kontakt">
                <Button size="lg" className="bg-green-700 hover:bg-green-800 text-white font-bold text-lg px-8">
                  Kom igång – beställ provkorg
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us - Deep SEO Content */}
        <section className="py-16 md:py-24 bg-green-50">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">
                  Ert lokala fruktbud i Stockholm sedan 2021
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Vitaminkorgen grundades med en enkel idé: att göra det enkelt för företag i Stockholm att erbjuda 
                    <strong> färsk frukt på jobbet</strong>. Sedan starten 2021 har vi vuxit till att bli ett av Stockholms mest 
                    pålitliga fruktbud med över 150 nöjda företagskunder.
                  </p>
                  <p>
                    Vi levererar fruktkorgar i hela Stockholmsområdet – från city till förorterna. Oavsett om ert kontor ligger 
                    på <Link to="/fruktkorg/vasastan" className="text-green-700 underline hover:text-green-900">Vasastan</Link>, 
                    i <Link to="/fruktkorg/sundbyberg" className="text-green-700 underline hover:text-green-900">Sundbyberg</Link> eller 
                    på <Link to="/fruktkorg/lidingo" className="text-green-700 underline hover:text-green-900">Lidingö</Link> – 
                    vi ser till att fruktkorgen alltid levereras i tid och i perfekt skick.
                  </p>
                  <p>
                    Det som skiljer oss från andra <strong>fruktleverantörer i Stockholm</strong> är vår personliga service. 
                    Ni får en dedikerad kontaktperson, flexibla leveransdagar och möjlighet att anpassa er fruktkorg 
                    efter era medarbetares önskemål. Vi erbjuder även en komplett <Link to="/produkter" className="text-green-700 underline hover:text-green-900">sortiment av kontorsprodukter</Link> – 
                    kaffe, te, snacks och mer.
                  </p>
                </div>
                <div className="space-y-3 mt-6">
                  {[
                    'Leverans till hela Stockholm, Södertälje och Uppsala',
                    'Handplockad säsongsfrukt av högsta kvalitet',
                    'Flexibla leveransdagar – välj vad som passar er',
                    'Personlig kontakt med er leverantör',
                    'Kostnadsfri provkorg för nya kunder',
                    'Fakturering – smidigt och tryggt för företag',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img src={officeWorkers} alt="Medarbetare njuter av fruktkorgar på kontoret i Stockholm" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-4">
              Fördelarna med fruktkorgar på kontoret
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              En fruktkorg på jobbet är mer än bara frukt – det är en investering i era medarbetares hälsa och trivsel.
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { icon: Heart, title: 'Ökat välmående', desc: 'Studier visar att tillgång till frukt på arbetsplatsen minskar stress och ökar den generella hälsan hos medarbetare.' },
                { icon: Zap, title: 'Högre produktivitet', desc: 'Frukt ger naturlig energi utan den krasch som kaffe och socker ger. Perfekt för att hålla fokus hela dagen.' },
                { icon: Users, title: 'Stärkt teamkänsla', desc: 'Fruktkorgen blir en naturlig mötesplats där kollegor samlas. Det stärker sammanhållningen på kontoret.' },
              ].map((benefit, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-md text-center">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-7 w-7 text-green-700" />
                  </div>
                  <h3 className="text-xl font-bold text-green-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-green-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-4">
                Vanliga frågor om fruktkorgar i Stockholm
              </h2>
              <p className="text-center text-gray-600 mb-12">
                Här hittar du svar på de vanligaste frågorna om våra fruktkorgar och leveranser i Stockholm.
              </p>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-lg text-green-900 font-medium pr-4">{item.question}</span>
                      <div className="flex-shrink-0">
                        {expandedFaq.includes(index) ? (
                          <Minus className="w-5 h-5 text-green-600" />
                        ) : (
                          <Plus className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                    </button>
                    <div className={`transition-all duration-300 ease-in-out ${expandedFaq.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                      <div className="px-6 pb-5">
                        <div className="border-t border-gray-100 pt-4">
                          <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Area Links */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-4">
              Vi levererar fruktkorgar i hela Stockholm
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Oavsett var ert kontor ligger i Stockholmsområdet levererar vi fruktkorgar med gratis frakt. Klicka på ert område för mer information.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {featuredAreas.map((area) => (
                <Link
                  key={area.slug}
                  to={`/fruktkorg/${area.slug}`}
                  className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl text-sm font-medium text-green-800 hover:bg-green-100 transition-colors shadow-sm border border-gray-100"
                >
                  <MapPin className="h-4 w-4 text-green-600 flex-shrink-0" />
                  Fruktkorg {area.name}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {areas.filter(a => !featuredAreas.some(f => f.slug === a.slug)).map((area) => (
                <Link
                  key={area.slug}
                  to={`/fruktkorg/${area.slug}`}
                  className="text-sm text-green-700 hover:text-green-900 underline"
                >
                  {area.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-green-800 to-green-900">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Beställ din fruktkorg i Stockholm idag
            </h2>
            <p className="text-gray-200 mb-8 max-w-xl mx-auto">
              Gör som 150+ andra Stockholmsföretag – ge era medarbetare färsk frukt varje vecka. 
              Prova gratis och utan förpliktelser.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/kontakt">
                <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold text-lg px-8">
                  Beställ gratis provkorg
                </Button>
              </Link>
              <a href="tel:010-183 98 36">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                  <Phone className="h-5 w-5 mr-2" /> 010-183 98 36
                </Button>
              </a>
            </div>
            <p className="text-gray-300 text-sm mt-6">
              Läs mer om <Link to="/fruktkorg-pa-jobbet" className="text-yellow-300 underline hover:text-yellow-200">fruktkorgar på jobbet</Link> eller 
              besök vår <Link to="/blogg" className="text-yellow-300 underline hover:text-yellow-200">blogg</Link> för tips och inspiration.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FruktkorgStockholm;
