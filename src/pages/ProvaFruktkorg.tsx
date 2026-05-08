import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import TrustedBySection from '@/components/TrustedBySection';
import { Button } from '@/components/ui/button';
import { Check, Star, Phone, ChevronDown, Gift, Truck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import provkorgImg from '@/assets/fruktkorg-original-new.jpg';
import leveransImg from '@/assets/fri-leverans-fruktkorgar-stockholm.jpg';

const faqItems = [
  { question: 'Vad ingår i en provkorg?', answer: 'Vår provkorg innehåller ett urval av handplockad säsongsfrukt – typiskt 4 kg blandad frukt med äpple, päron, banan, citrus och säsongsbär. Perfekt för 5–10 medarbetare.' },
  { question: 'Är provkorgen verkligen kostnadsfri?', answer: 'Ja. Den första leveransen är gratis för nya företagskunder i Stockholm. Inget abonnemang krävs och ni binder er inte till något.' },
  { question: 'Hur snabbt kan jag få min provkorg?', answer: 'Vi levererar måndag–fredag i Stockholmsområdet. Beställer ni innan kl 12.00 kan vi oftast leverera redan nästa vardag.' },
  { question: 'Vad händer efter provleveransen?', answer: 'Inget händer automatiskt. Om ni vill fortsätta hör vi av oss för att skräddarsy ett upplägg som passar er. Annars är det bara att tacka för smaken.' },
  { question: 'Vilka områden levererar ni till?', answer: 'Vi levererar fritt i hela Stockholm – från innerstan till Solna, Sundbyberg, Kista, Bromma, Nacka, Lidingö, Täby och fler kranskommuner.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(i => ({ '@type': 'Question', name: i.question, acceptedAnswer: { '@type': 'Answer', text: i.answer } })),
};

const ProvaFruktkorg = () => {
  const [open, setOpen] = useState<number[]>([]);
  const toggle = (i: number) => setOpen(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Prova fruktkorg gratis – Kostnadsfri provleverans | Vitaminkorgen"
        description="Prova fruktkorg gratis ✓ Kostnadsfri provleverans till ert företag i Stockholm. Inget abonnemang. Färsk säsongsfrukt direkt till kontoret."
        keywords="prova fruktkorg, testa fruktkorg, gratis provkorg, fruktkorg gratis, provleverans fruktkorg, kostnadsfri fruktkorg"
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
              <span className="inline-block bg-yellow-400 text-green-900 font-semibold px-4 py-1 rounded-full text-sm mb-6">🎁 Kostnadsfri provleverans</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">Prova en fruktkorg – helt gratis</h1>
              <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed">Smaka på Sveriges mest uppskattade företagsfrukt. Vi levererar en kostnadsfri provkorg till ert kontor i Stockholm – utan abonnemang och utan bindningstid.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/provkorg"><Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold shadow-lg border-2 border-black/10 text-lg px-8">Beställ gratis provkorg</Button></Link>
                <a href="tel:0101839836"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8"><Phone className="h-5 w-5 mr-2" /> 010-183 98 36</Button></a>
              </div>
            </div>
          </div>
        </section>

        <TrustedBySection />

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-4">Så funkar det</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Tre enkla steg till färsk frukt på kontoret.</p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Gift, title: '1. Beställ provkorg', desc: 'Fyll i ert företag och leveransadress – tar 2 minuter.' },
                { icon: Truck, title: '2. Vi levererar gratis', desc: 'Provkorgen kommer på utvald vardag direkt till ert kontor.' },
                { icon: Clock, title: '3. Inget händer automatiskt', desc: 'Vill ni fortsätta hör vi av oss. Annars är det bara att njuta.' },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow text-center">
                  <div className="p-3 bg-green-100 rounded-xl w-fit mx-auto mb-4"><Icon className="h-6 w-6 text-green-700" /></div>
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
                <img src={provkorgImg} alt="Provkorg med säsongsfrukt till företag" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">Vad ingår i provkorgen?</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">Cirka 4 kg handplockad säsongsfrukt – tillräckligt för 5–10 medarbetare under en arbetsdag.</p>
                <div className="space-y-4">
                  {['Äpple, päron och banan av högsta kvalitet','Citrusfrukter och säsongsbär när det är säsong','Levereras i återbruksbar korg','Ingen bindningstid eller abonnemang','Fri leverans i hela Stockholm'].map((t, i) => (
                    <div key={i} className="flex items-start gap-3"><Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" /><span className="text-gray-700">{t}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-12">Vad andra säger</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { quote: 'Provkorgen var otroligt fräsch. Vi blev kunder samma vecka.', name: 'Sara L.', role: 'Office Manager' },
                { quote: 'Smidigt att få testa utan att binda upp sig. Toppenkvalitet.', name: 'Johan B.', role: 'HR-ansvarig' },
                { quote: 'Bästa frukten vi haft på kontoret. Riktigt nöjd!', name: 'Petra N.', role: 'VD' },
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Beställ er kostnadsfria provkorg</h2>
            <p className="text-gray-200 mb-8 max-w-xl mx-auto">Inget abonnemang. Ingen bindningstid. Bara färsk frukt.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/provkorg"><Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold shadow-lg border-2 border-black/10 text-lg px-8">Beställ gratis provkorg</Button></Link>
              <a href="tel:0101839836"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8"><Phone className="h-5 w-5 mr-2" /> 010-183 98 36</Button></a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProvaFruktkorg;