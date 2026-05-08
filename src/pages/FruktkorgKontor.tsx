import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import TrustedBySection from '@/components/TrustedBySection';
import { Button } from '@/components/ui/button';
import { Check, Star, Phone, ChevronDown, Heart, TrendingUp, Users, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import kontorImg from '@/assets/medarbetare-fruktkorgar-kontor.jpg';
import halsaImg from '@/assets/fruktkorg-halsa-kontor-stockholm.jpg';

const faqItems = [
  { question: 'Hur många fruktkorgar behöver vårt kontor?', answer: 'Som tumregel räcker en 4 kg-korg för 5–8 medarbetare per vecka. För 20 medarbetare rekommenderar vi 2–3 korgar per vecka eller en större Premium-korg.' },
  { question: 'Är fruktkorg på kontoret skattefritt?', answer: 'Ja. Frukt och enklare förtäring på arbetsplatsen är en skattefri personalförmån enligt Skatteverkets regler – så länge den erbjuds alla anställda.' },
  { question: 'Räknas det som friskvård?', answer: 'Frukt på kontoret är inte friskvård i lagteknisk mening, men ses som en hälsofrämjande personalförmån. Många företag kombinerar fruktkorg med övriga friskvårdssatsningar.' },
  { question: 'Hur ofta levereras fruktkorgen?', answer: 'Vi levererar varje vecka eller varannan vecka, måndag–fredag. Ni väljer den dag som passar ert kontor bäst.' },
  { question: 'Måste alla på kontoret vara där samtidigt?', answer: 'Nej. Vi levererar in på kontoret och fyller på er fruktkorg. Den behöver inte tas emot personligen om ni har en plats att lämna den på.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(i => ({ '@type': 'Question', name: i.question, acceptedAnswer: { '@type': 'Answer', text: i.answer } })),
};

const FruktkorgKontor = () => {
  const [open, setOpen] = useState<number[]>([]);
  const toggle = (i: number) => setOpen(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Fruktkorg till kontoret – Frukt på arbetsplatsen | Vitaminkorgen"
        description="Fruktkorg till kontoret ✓ Färsk frukt levererad direkt till arbetsplatsen. Skattefri personalförmån. 150+ kontor i Stockholm väljer oss."
        keywords="fruktkorg kontor, frukt på kontoret, fruktkorg arbetsplats, frukt arbetsplats, fruktkorg till jobbet, frukt på jobbet"
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
              <span className="inline-block bg-yellow-400 text-green-900 font-semibold px-4 py-1 rounded-full text-sm mb-6">🏢 Frukt på arbetsplatsen</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">Fruktkorg till kontoret</h1>
              <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed">Färsk säsongsfrukt direkt till er arbetsplats varje vecka. En skattefri personalförmån som syns och uppskattas – från 299 kr/korg.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/produkter"><Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold shadow-lg border-2 border-black/10 text-lg px-8">Beställ till kontoret</Button></Link>
                <a href="tel:0101839836"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8"><Phone className="h-5 w-5 mr-2" /> 010-183 98 36</Button></a>
              </div>
            </div>
          </div>
        </section>

        <TrustedBySection />

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-4">Fördelar för er arbetsplats</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">En enkel åtgärd som ger stor effekt på trivsel och välmående.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Heart, title: 'Bättre hälsa', desc: 'Frukt på kontoret minskar sjukfrånvaron och stärker immunförsvaret.' },
                { icon: TrendingUp, title: 'Högre energi', desc: 'Naturlig fruktsocker ger jämn energi utan eftermiddagsdipp.' },
                { icon: Users, title: 'Trivsel & gemenskap', desc: 'Fruktskålen blir en naturlig mötesplats på kontoret.' },
                { icon: Building2, title: 'Skattefri förmån', desc: 'Frukt är en skattefri personalförmån enligt Skatteverket.' },
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
                <img src={kontorImg} alt="Medarbetare med fruktkorg på kontoret" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">Anpassat för ert kontor</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">Vi skräddarsyr leveransen efter antal medarbetare, kontorsstorlek och önskemål. Inga onödiga kostnader.</p>
                <div className="space-y-4">
                  {['Anpassad mängd för 5–500 medarbetare','Leverans på vald veckodag','Påfyllning direkt på kontoret','Fakturering med 15 dagars betalvillkor','Pausa eller avsluta när ni vill'].map((t, i) => (
                    <div key={i} className="flex items-start gap-3"><Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" /><span className="text-gray-700">{t}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-12">Vad kontorsansvariga säger</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { quote: 'Fruktkorgen försvinner alltid först. Otroligt uppskattad på kontoret.', name: 'Camilla R.', role: 'Office Manager' },
                { quote: 'Smidig hantering, alltid i tid. Vi har aldrig haft en bättre leverantör.', name: 'Anders T.', role: 'Kontorschef' },
                { quote: 'Personalen lyser upp när korgen kommer. Värt varenda krona.', name: 'Helena W.', role: 'HR-chef' },
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
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-12">Vanliga frågor</h2>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Starta fruktkorg på ert kontor</h2>
            <p className="text-gray-200 mb-8 max-w-xl mx-auto">Kostnadsfri provleverans. Fri leverans i Stockholm.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/provkorg"><Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold shadow-lg border-2 border-black/10 text-lg px-8">Beställ provkorg</Button></Link>
              <a href="tel:0101839836"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8"><Phone className="h-5 w-5 mr-2" /> 010-183 98 36</Button></a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FruktkorgKontor;