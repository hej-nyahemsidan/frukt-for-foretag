import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import TrustedBySection from '@/components/TrustedBySection';
import { Button } from '@/components/ui/button';
import { Check, Star, Phone, ChevronDown, Truck, MapPin, Calendar, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import leveransImg from '@/assets/fri-leverans-fruktkorgar-stockholm.jpg';
import hallbarImg from '@/assets/fruktleverans-stockholm-hallbar.jpg';

const faqItems = [
  { question: 'Vilka områden levererar ni till?', answer: 'Vi levererar fritt i hela Stockholm – innerstan, Solna, Sundbyberg, Bromma, Kista, Täby, Nacka, Lidingö, Huddinge, Haninge med flera. Se hela listan över områden vi servar.' },
  { question: 'Vilka dagar levererar ni?', answer: 'Vi levererar måndag till fredag. Ni väljer den veckodag som passar er bäst, varje vecka eller varannan vecka.' },
  { question: 'Hur snabbt kan ni starta leverans?', answer: 'För nya företagskunder kan vi oftast starta leverans inom 1–3 vardagar. Beställer ni en provkorg innan kl 12.00 kan den komma redan nästa vardag.' },
  { question: 'Kostar leveransen extra?', answer: 'Nej. Leverans är alltid fri inom Stockholm med kranskommuner. Inga drivmedelstillägg eller dolda fraktavgifter.' },
  { question: 'Hur sker leveransen rent praktiskt?', answer: 'Vår förare kommer in på kontoret och placerar fruktkorgen där ni vill ha den. Vi kan också fylla på en befintlig fruktskål om ni föredrar det.' },
  { question: 'Vad händer vid storhelger och sommar?', answer: 'Vi levererar enligt schema förutom röda dagar. Vid storhelger och semesterperioder skickar vi alternativ leveransdag i god tid.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(i => ({ '@type': 'Question', name: i.question, acceptedAnswer: { '@type': 'Answer', text: i.answer } })),
};

const FruktleveransForetag = () => {
  const [open, setOpen] = useState<number[]>([]);
  const toggle = (i: number) => setOpen(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Fruktleverans företag – Fri leverans i Stockholm | Vitaminkorgen"
        description="Fruktleverans företag ✓ Fri leverans i hela Stockholm må–fre. Färska fruktkorgar direkt till kontoret. Snabb start, ingen bindningstid."
        keywords="fruktleverans företag, fruktbud företag, fruktleverans stockholm, fruktbud stockholm, leverans fruktkorg, fri fruktleverans"
        type="products"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main>
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-700 to-green-900" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block bg-yellow-400 text-green-900 font-semibold px-4 py-1 rounded-full text-sm mb-6">🚚 Fri leverans i Stockholm</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">Fruktleverans till ert företag</h1>
              <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed">Pålitlig fruktleverans varje vecka – må–fre, fritt i hela Stockholm. Vi sköter allt från hämtning på grossist till påfyllning på kontoret.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/produkter"><Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold shadow-lg border-2 border-black/10 text-lg px-8">Starta leverans</Button></Link>
                <a href="tel:0101839836"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8"><Phone className="h-5 w-5 mr-2" /> 010-183 98 36</Button></a>
              </div>
            </div>
          </div>
        </section>

        <TrustedBySection />

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-4">Därför fungerar vår leverans</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Vi har levererat frukt till Stockholms företag i över 10 år.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Truck, title: 'Fri leverans', desc: 'Inga fraktavgifter, inga drivmedelstillägg – fri leverans varje gång.' },
                { icon: MapPin, title: 'Hela Stockholm', desc: 'Innerstan och kranskommuner – från Lidingö till Huddinge.' },
                { icon: Calendar, title: 'Flexibla dagar', desc: 'Välj veckodag och frekvens. Pausa när semestern kommer.' },
                { icon: Leaf, title: 'Hållbar logistik', desc: 'Optimerade rutter och återanvändbara korgar minskar avtrycket.' },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="p-3 bg-green-100 rounded-xl w-fit mb-4"><Icon className="h-6 w-6 text-green-700" /></div>
                  <h3 className="text-lg font-bold text-green-900 mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-green-50">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img src={leveransImg} alt="Fruktleverans till företag i Stockholm" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">Så fungerar leveransen</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">Smidig och pålitlig från första kontakt till varje veckas påfyllning.</p>
                <div className="space-y-4">
                  {['Vi hämtar färsk frukt på grossist samma morgon','Föraren kommer in och placerar korgen där ni vill','Återanvändbara korgar – vi tar med tomma tillbaka','SMS eller mejl-notis innan leverans','Reklamation hanteras inom 24 h'].map((t, i) => (
                    <div key={i} className="flex items-start gap-3"><Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" /><span className="text-gray-700">{t}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-12">Vad våra kunder säger</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { quote: 'Alltid i tid, alltid färskt. Vi har aldrig haft problem med en leverans.', name: 'Karin O.', role: 'Office Manager' },
                { quote: 'Smidigaste leverantören vi haft. Föraren är trevlig och fyller på allt.', name: 'Jonas E.', role: 'Kontorschef' },
                { quote: 'Fri leverans var det som avgjorde. Och kvaliteten håller över tid.', name: 'Susanne L.', role: 'HR-chef' },
              ].map((t, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-md">
                  <div className="flex gap-1 mb-4">{[1,2,3,4,5].map(s => <Star key={s} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}</div>
                  <p className="text-gray-600 mb-4 italic">"{t.quote}"</p>
                  <p className="font-bold text-green-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-green-50">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-12">Vanliga frågor om leverans</h2>
            <div className="space-y-3">
              {faqItems.map((f, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <button onClick={() => toggle(i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-green-50/50 transition-colors">
                    <span className="font-semibold text-green-900">{f.question}</span>
                    <ChevronDown className={`h-5 w-5 text-green-700 transition-transform ${open.includes(i) ? 'rotate-180' : ''}`} />
                  </button>
                  {open.includes(i) && <div className="px-5 pb-5 text-gray-700 leading-relaxed">{f.answer}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-gradient-to-br from-green-800 to-green-900">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Starta fruktleverans idag</h2>
            <p className="text-gray-200 mb-8 max-w-xl mx-auto">Fri leverans i hela Stockholm. Provkorg utan kostnad.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/provkorg"><Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold shadow-lg border-2 border-black/10 text-lg px-8">Beställ provleverans</Button></Link>
              <a href="tel:0101839836"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8"><Phone className="h-5 w-5 mr-2" /> 010-183 98 36</Button></a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FruktleveransForetag;