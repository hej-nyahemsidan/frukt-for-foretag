import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import {
  Check, Star, TrendingUp, Heart, Users, Phone, Building2,
  Calendar, MapPin, ShieldCheck, Leaf, ChevronDown, ChevronUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import happyEmployees from '@/assets/glada-anstallda-fruktkorg-foretag.jpg';

const faqItems = [
  {
    question: 'Vad kostar en fruktkorg till företag?',
    answer: 'Våra fruktkorgar till företag börjar från 295 kr per leverans för en Fruktkorg Original (cirka 4 kg, räcker till 8–10 medarbetare). Premium-korgen ligger från 395 kr och Banan-korgen från 195 kr. Priset beror på storlek, leveransfrekvens och antal korgar. Vi fakturerar månadsvis med 15 dagars kredit.'
  },
  {
    question: 'Hur många fruktkorgar behöver vårt företag?',
    answer: 'En tumregel är 1 frukt per medarbetare och leveransdag. Ett kontor med 20 anställda klarar sig oftast bra med en Premium-korg (12–15 kg) per vecka, medan ett kontor med 50+ anställda brukar välja två leveranser i veckan eller flera korgar samtidigt.'
  },
  {
    question: 'Vilka företag i Stockholm är era kunder?',
    answer: 'Vi levererar fruktkorgar till över 150 företag i Stockholmsområdet – allt från tech-bolag och advokatbyråer till konsultfirmor, vårdcentraler och offentlig sektor. Vi har 5/5 i snittbetyg på Google.'
  },
  {
    question: 'Vilka områden i Stockholm levererar ni till?',
    answer: 'Vi levererar fruktkorgar till hela Storstockholm – Södermalm, Östermalm, Kungsholmen, Vasastan, Norrmalm, Gamla stan, Solna, Sundbyberg, Bromma, Hägersten, Nacka, Lidingö, Täby, Järfälla, Huddinge, Tumba, Salem och fler.'
  },
  {
    question: 'Hur fungerar leveransen till företag?',
    answer: 'Ni väljer leveransdag (måndag–fredag) och vi kör fram fruktkorgen direkt till receptionen eller pentryt. Ingen behöver vara på plats för att ta emot. Vi använder återanvändbara korgar som vi byter ut vid nästa leverans.'
  },
  {
    question: 'Kan vi anpassa innehållet eller hoppa över allergener?',
    answer: 'Ja. Ni kan exkludera specifika frukter (t.ex. citrus eller nötallergener) direkt i er kundportal. Vi har även Banan-korg för företag som bara vill ha bananer, och kompletterande sortiment med kaffe, te, mejeri och snacks.'
  },
  {
    question: 'Hur beställer vi som företag?',
    answer: 'Välj fruktkorg och leveransdag på vår beställningssida, fyll i företagsuppgifter och skicka beställningen. Ni får en bekräftelse på e-post och leverans startar redan nästa möjliga vecka. Inga uppstartsavgifter, inga dolda kostnader.'
  },
  {
    question: 'Hur lång är bindningstiden?',
    answer: 'Bindningstiden beror på antal korgar och beställningens storlek och framgår av våra villkor. Företag kan alltid pausa eller justera leveranser via kundportalen.'
  }
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer }
  }))
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://vitaminkorgen.se/' },
    { '@type': 'ListItem', position: 2, name: 'Fruktkorg till företag', item: 'https://vitaminkorgen.se/fruktkorg-foretag' }
  ]
};

const FruktkorgForetag = () => {
  const [expandedFaq, setExpandedFaq] = useState<number[]>([0]);
  const toggleFaq = (i: number) =>
    setExpandedFaq(p => (p.includes(i) ? p.filter(x => x !== i) : [...p, i]));

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Fruktkorg till företag i Stockholm – från 295 kr | Vitaminkorgen"
        description="Fruktkorg till företag i Stockholm. Färska fruktkorgar levererade till kontoret från 295 kr. 150+ företag, 5/5 på Google. Beställ direkt – inga uppstartsavgifter."
        keywords="fruktkorg företag, fruktkorg till företag, fruktkorgar företag, fruktbud företag, fruktleverans företag, fruktkorg kontor, företagsfrukt, frukt till företag stockholm"
        type="products"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <Header />
      <main>
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-700 to-green-900" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block bg-yellow-400 text-green-900 font-semibold px-4 py-1 rounded-full text-sm mb-6">
                För företag i Stockholm
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Fruktkorg till företag i Stockholm
              </h1>
              <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed">
                Färska fruktkorgar levererade direkt till kontoret – varje vecka eller varannan.
                Från 295 kr per leverans. 150+ företag i Stockholm har valt Vitaminkorgen som sitt fruktbud.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/produkter">
                  <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold shadow-lg border-2 border-black/10 text-lg px-8">
                    Skicka din beställning
                  </Button>
                </Link>
                <a href="tel:0101839836">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                    <Phone className="h-5 w-5 mr-2" /> 010-183 98 36
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              En <strong>fruktkorg till företag</strong> är en av de enklaste och mest uppskattade
              förmånerna ni kan ge era medarbetare. Vitaminkorgen är Stockholms specialiserade
              <strong> fruktleverantör för företag</strong> – vi handplockar färsk frukt samma morgon
              och levererar direkt till ert kontor.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Vi sköter allt: beställning, leverans, korgbyte och fakturering. Ni väljer storlek,
              leveransdag och om ni vill exkludera vissa frukter. Inga uppstartsavgifter och inga
              dolda kostnader – bara frukt på kontoret, varje vecka.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-green-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-4">
              Därför väljer 150+ företag Vitaminkorgen
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Vi är specialiserade på fruktkorgar till företag i Stockholm – och har 5/5 i snittbetyg på Google.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Heart, title: 'Friskvård som syns', desc: 'Frukt på kontoret är en konkret och uppskattad insats för medarbetarnas välmående.' },
                { icon: TrendingUp, title: 'Stabil energi', desc: 'Färsk frukt ger jämn energi genom arbetsdagen – utan sockerdippar.' },
                { icon: Users, title: 'Attraktiv arbetsplats', desc: 'En tydlig signal att ni bryr er om personalen – uppskattat vid rekrytering.' },
                { icon: Building2, title: 'Noll administration', desc: 'Vi sköter allt från orderläggning till fakturering. Ni gör inget.' },
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

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4 text-center">
              Vad kostar en fruktkorg till företaget?
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Tre standardstorlekar – välj efter antal medarbetare.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Banan', size: '~3 kg', people: '5–8 medarbetare', price: 'från 195 kr' },
                { name: 'Original', size: '~4 kg', people: '8–12 medarbetare', price: 'från 295 kr', highlight: true },
                { name: 'Premium', size: '~6 kg', people: '15–20 medarbetare', price: 'från 395 kr' },
              ].map((p, i) => (
                <div key={i} className={`p-6 rounded-2xl ${p.highlight ? 'bg-green-700 text-white shadow-xl' : 'bg-white shadow-md'}`}>
                  <h3 className={`text-2xl font-bold mb-2 ${p.highlight ? 'text-white' : 'text-green-900'}`}>
                    Fruktkorg {p.name}
                  </h3>
                  <p className={`text-sm mb-1 ${p.highlight ? 'text-green-100' : 'text-gray-600'}`}>{p.size}</p>
                  <p className={`text-sm mb-4 ${p.highlight ? 'text-green-100' : 'text-gray-600'}`}>{p.people}</p>
                  <p className={`text-3xl font-bold mb-4 ${p.highlight ? 'text-yellow-300' : 'text-green-700'}`}>{p.price}</p>
                  <Link to={`/produkt/fruktkorg-${p.name.toLowerCase()}`}>
                    <Button className={p.highlight ? 'bg-yellow-400 text-black hover:bg-yellow-300 w-full' : 'bg-green-700 text-white hover:bg-green-800 w-full'}>
                      Se {p.name}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-green-50">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img src={happyEmployees} alt="Glada medarbetare med fruktkorg från Vitaminkorgen på kontoret" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">
                  Så fungerar fruktleveransen till företag
                </h2>
                <div className="space-y-4">
                  {[
                    { icon: Check, t: 'Välj korg och leveransdag', d: 'Original, Premium eller Banan – måndag till fredag.' },
                    { icon: Calendar, t: 'Startdatum nästa vecka', d: 'Beställer ni innan torsdag startar leveransen redan veckan efter.' },
                    { icon: MapPin, t: 'Direkt till receptionen', d: 'Vi ställer korgen där ni vill – pentry, reception eller mötesrum.' },
                    { icon: ShieldCheck, t: '15 dagars kredit', d: 'Vi fakturerar månadsvis. Inga uppstartsavgifter.' },
                    { icon: Leaf, t: 'Säsongens bästa frukt', d: 'Handplockad samma morgon. Anpassa bort allergener i kundportalen.' },
                  ].map(({ icon: Icon, t, d }, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Icon className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-green-900">{t}</p>
                        <p className="text-gray-600 text-sm">{d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4 text-center">
              Vi levererar fruktkorgar till företag i hela Stockholm
            </h2>
            <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
              Som lokalt <Link to="/fruktkorg-stockholm" className="text-green-700 underline">fruktbud i Stockholm</Link> levererar vi
              dagligen till kontor i innerstan och förorter. Klicka på ditt område för specifik info.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              {[
                ['sodermalm', 'Södermalm'], ['ostermalm', 'Östermalm'],
                ['kungsholmen', 'Kungsholmen'], ['vasastan', 'Vasastan'],
                ['norrmalm', 'Norrmalm'], ['gamla-stan', 'Gamla stan'],
                ['solna', 'Solna'], ['sundbyberg', 'Sundbyberg'],
                ['bromma', 'Bromma'], ['hagersten', 'Hägersten'],
                ['nacka', 'Nacka'], ['lidingo', 'Lidingö'],
              ].map(([slug, name]) => (
                <Link key={slug} to={`/fruktkorg/${slug}`}
                  className="bg-white border border-gray-200 hover:border-green-700 hover:bg-green-50 rounded-lg px-4 py-3 text-green-900 font-medium text-center transition-colors">
                  Fruktkorg {name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-green-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-12">
              Vad våra företagskunder säger
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { quote: 'Fruktkorgen är det mest uppskattade vi erbjuder på kontoret. Vitaminkorgen levererar alltid i tid med fantastisk kvalitet.', name: 'Anna S.', role: 'Office Manager, Tech-bolag' },
                { quote: 'Vi har testat flera fruktleverantörer men ingen slår Vitaminkorgen. Professionella och pålitliga – vi rekommenderar dem varmt.', name: 'Lars A.', role: 'HR-chef, Konsultfirma' },
                { quote: 'Smidig fakturering och alltid färsk frukt. En av de bästa förmånerna vi infört på kontoret.', name: 'Maria J.', role: 'VD, Advokatbyrå' },
              ].map((t, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-md">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(s => <Star key={s} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{t.quote}"</p>
                  <div>
                    <p className="font-bold text-green-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-12">
              Vanliga frågor om fruktkorg till företag
            </h2>
            <div className="space-y-3">
              {faqItems.map((item, i) => {
                const open = expandedFaq.includes(i);
                return (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <button onClick={() => toggleFaq(i)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left">
                      <span className="font-semibold text-green-900">{item.question}</span>
                      {open ? <ChevronUp className="h-5 w-5 text-green-700 flex-shrink-0" />
                            : <ChevronDown className="h-5 w-5 text-green-700 flex-shrink-0" />}
                    </button>
                    {open && (
                      <div className="px-5 pb-5 text-gray-700 leading-relaxed">{item.answer}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-gradient-to-br from-green-800 to-green-900">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Beställ fruktkorg till företaget idag
            </h2>
            <p className="text-gray-200 mb-8 max-w-xl mx-auto">
              Välj korg och leveransdag – ingen uppstartsavgift, fakturering med 15 dagars kredit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/produkter">
                <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold shadow-lg border-2 border-black/10 text-lg px-8">
                  Skicka din beställning
                </Button>
              </Link>
              <a href="tel:0101839836">
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

export default FruktkorgForetag;