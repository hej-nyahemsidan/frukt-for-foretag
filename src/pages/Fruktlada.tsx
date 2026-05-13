import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Check, Truck, Star, Phone, Apple, Leaf, ShieldCheck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import fruktladaImg from '@/assets/fruktlada-new.jpg';
import fruktkorgOriginal from '@/assets/fruktkorg-original-new.jpg';
import fruktkorgPremium from '@/assets/fruktkorg-premium-new.jpg';
import fruktkorgBanan from '@/assets/fruktkorg-banan-new.jpg';

const faqs = [
  {
    q: 'Vad är en fruktlåda för företag?',
    a: 'En fruktlåda är en låda eller korg fylld med handplockad, färsk säsongsfrukt som levereras direkt till ert kontor. Den är en enkel friskvårdsförmån som ger medarbetarna fri tillgång till frukt under arbetsdagen.',
  },
  {
    q: 'Vad kostar en fruktlåda till företaget?',
    a: 'Priset beror på storlek och antal leveranser per vecka. Vår mest populära fruktlåda Original börjar från 379 kr per leverans. Banan-lådan från 199 kr. Fri leverans i Stockholm med omnejd.',
  },
  {
    q: 'Hur ofta levereras fruktlådan?',
    a: 'Ni väljer själva – en gång i veckan, två gånger i veckan eller varje arbetsdag (mån–fre). Många kontor börjar med en leverans i veckan och utökar när medarbetarna börjat förvänta sig frukten.',
  },
  {
    q: 'Hur många frukter behöver vi per anställd?',
    a: 'Tumregeln är 3–4 frukter per anställd och vecka. För ett kontor med 20 anställda räcker oftast en Original-låda per leveransdag, två gånger i veckan.',
  },
  {
    q: 'Levererar ni fruktlåda utanför Stockholm?',
    a: 'Vi levererar fri leverans i Stockholm, Södertälje och Uppsala. Kontakta oss på 010-183 98 36 om ni sitter på annan ort så ser vi vad vi kan göra.',
  },
  {
    q: 'Kan vi prova en fruktlåda först?',
    a: 'Ja, beställ en provleverans på sidan Provkorg så får ni testa innan ni bestämmer er för en löpande leverans.',
  },
  {
    q: 'Hur fakturerar ni?',
    a: 'Vi fakturerar månadsvis med 15 dagars betalningsvillkor. Smidigt och papperslöst för bokföringen.',
  },
];

const Fruktlada = () => {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Fruktlåda till företag – Färsk frukt levererad till kontoret | Vitaminkorgen"
        description="Fruktlåda till företag ✓ Handplockad säsongsfrukt levererad till kontoret i Stockholm. Från 199 kr. Fri leverans. Boka provleverans idag!"
        keywords="fruktlåda, fruktlåda företag, fruktlåda kontor, fruktlåda stockholm, fruktlåda jobbet, fruktlåda leverans, frukt till kontoret"
        type="products"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-700 to-green-900" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-block bg-yellow-400 text-green-900 font-semibold px-4 py-1 rounded-full text-sm mb-6">
                  🍎 Färsk fruktlåda till kontoret
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Fruktlåda till företaget – färsk frukt direkt till kontoret
                </h1>
                <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed">
                  Handplockad säsongsfrukt levererad till er arbetsplats i Stockholm.
                  Vi sköter allt – ni får en uppskattad fruktlåda på bordet varje vecka.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/produkter">
                    <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold shadow-lg border-2 border-black/10 text-lg px-8">
                      Beställ fruktlåda
                    </Button>
                  </Link>
                  <Link to="/provkorg">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                      Prova gratis först
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img src={fruktladaImg} alt="Fruktlåda med färsk säsongsfrukt levererad till företag i Stockholm" className="w-full h-full object-cover" loading="eager" />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-4">
              Därför väljer 150+ företag vår fruktlåda
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              En fruktlåda på kontoret är en av de mest uppskattade och kostnadseffektiva friskvårdsförmånerna ni kan ge era medarbetare.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Apple, title: 'Färsk säsongsfrukt', desc: 'Handplockad varje morgon från grossist – ingen frukt äldre än 24 timmar.' },
                { icon: Truck, title: 'Fri leverans', desc: 'Vi kör ut fruktlådan i hela Stockholm, Södertälje och Uppsala utan extra kostnad.' },
                { icon: Clock, title: 'Flexibla dagar', desc: 'Välj 1–5 dagar i veckan. Pausa eller ändra när ni vill.' },
                { icon: ShieldCheck, title: 'Kvalitetsgaranti', desc: 'Är ni inte nöjda med en frukt – kontakta oss så ersätter vi den.' },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="p-3 bg-green-100 rounded-xl w-fit mb-4">
                    <Icon className="h-6 w-6 text-green-700" />
                  </div>
                  <h3 className="text-lg font-bold text-green-900 mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing / Products */}
        <section className="py-16 md:py-20 bg-green-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-4">
              Välj fruktlåda – tre storlekar
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Alla fruktlådor levereras fritt i Stockholm. Pris per leverans, ni väljer hur ofta.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Fruktlåda Banan',
                  slug: 'fruktkorg-banan',
                  img: fruktkorgBanan,
                  price: 'Från 199 kr',
                  desc: 'Klassisk bananlåda – bästa pris per frukt. Perfekt för kontor som vill hålla det enkelt.',
                  badge: 'Billigast',
                },
                {
                  name: 'Fruktlåda Original',
                  slug: 'fruktkorg-original',
                  img: fruktkorgOriginal,
                  price: 'Från 379 kr',
                  desc: 'Vår populäraste fruktlåda – blandning av äpplen, päron, bananer, citrus och säsongsfrukt.',
                  badge: 'Mest populär',
                },
                {
                  name: 'Fruktlåda Premium',
                  slug: 'fruktkorg-premium',
                  img: fruktkorgPremium,
                  price: 'Från 549 kr',
                  desc: 'Lyxig blandning med exotisk frukt, bär och premium-sorter. För kontor som vill bjuda lite extra.',
                  badge: 'Lyx',
                },
              ].map((p) => (
                <div key={p.slug} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={p.img} alt={`${p.name} levererad till företag`} className="w-full h-full object-cover" loading="lazy" />
                    <span className="absolute top-3 left-3 bg-yellow-400 text-green-900 text-xs font-bold px-3 py-1 rounded-full">
                      {p.badge}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-green-900 mb-1">{p.name}</h3>
                    <p className="text-2xl font-bold text-red-600 mb-3">{p.price}</p>
                    <p className="text-gray-600 text-sm mb-6 flex-1">{p.desc}</p>
                    <Link to={`/produkt/${p.slug}`}>
                      <Button className="w-full bg-green-700 hover:bg-green-800">
                        Se {p.name.toLowerCase()}
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/produkter" className="text-green-700 font-semibold underline hover:text-green-900">
                Se alla fruktlådor och tillval i webshopen →
              </Link>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-12">
              Så fungerar det
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { n: '1', title: 'Välj fruktlåda', desc: 'Välj storlek, leveransdagar och hur ofta ni vill ha leverans.' },
                { n: '2', title: 'Vi levererar fritt', desc: 'Vi handplockar och kör ut fruktlådan tidig morgon innan ni kommer in.' },
                { n: '3', title: 'Faktura månadsvis', desc: 'Ni får en samlad faktura med 15 dagars betalningsvillkor. Pausa när ni vill.' },
              ].map((s) => (
                <div key={s.n} className="text-center">
                  <div className="w-14 h-14 bg-yellow-400 text-green-900 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {s.n}
                  </div>
                  <h3 className="text-lg font-bold text-green-900 mb-2">{s.title}</h3>
                  <p className="text-gray-600 text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20 bg-green-50">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-4">
              Vanliga frågor om fruktlåda
            </h2>
            <p className="text-center text-gray-600 mb-10">
              Allt ni behöver veta innan ni beställer er första fruktlåda.
            </p>
            <Accordion type="single" collapsible className="bg-white rounded-2xl shadow-md p-2">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="px-4">
                  <AccordionTrigger className="text-left text-green-900 font-semibold hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Internal linking */}
        <section className="py-12 bg-white border-t border-green-100">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-xl font-bold text-green-900 mb-4">
              Läs mer om fruktleverans till företag
            </h2>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
              <Link to="/fruktkorg-foretag" className="text-green-700 hover:text-green-900 underline">Fruktkorg företag</Link>
              <span className="text-green-300">·</span>
              <Link to="/fruktkorg-stockholm" className="text-green-700 hover:text-green-900 underline">Fruktkorg Stockholm</Link>
              <span className="text-green-300">·</span>
              <Link to="/fruktkorg-pa-jobbet" className="text-green-700 hover:text-green-900 underline">Fruktkorg på jobbet</Link>
              <span className="text-green-300">·</span>
              <Link to="/fruktkorg-kontor" className="text-green-700 hover:text-green-900 underline">Fruktkorg kontor</Link>
              <span className="text-green-300">·</span>
              <Link to="/fruktleverans-foretag" className="text-green-700 hover:text-green-900 underline">Fruktleverans företag</Link>
              <span className="text-green-300">·</span>
              <Link to="/provkorg" className="text-green-700 hover:text-green-900 underline">Gratis provkorg</Link>
              <span className="text-green-300">·</span>
              <Link to="/produkter" className="text-green-700 hover:text-green-900 underline">Alla produkter</Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-green-800 to-green-900">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Beställ er fruktlåda idag
            </h2>
            <p className="text-gray-200 mb-8 max-w-xl mx-auto">
              Kostnadsfri provleverans. Fri leverans i Stockholm. 150+ företag litar på oss.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/produkter">
                <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold shadow-lg border-2 border-black/10 text-lg px-8">
                  Beställ fruktlåda
                </Button>
              </Link>
              <a href="tel:010-183 98 36">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                  <Phone className="h-5 w-5 mr-2" /> 010-183 98 36
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Fruktlada;