import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import TrustedBySection from '@/components/TrustedBySection';
import { Button } from '@/components/ui/button';
import { Check, Star, Phone, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import originalImg from '@/assets/fruktkorg-original-new.jpg';
import premiumImg from '@/assets/fruktkorg-premium-new.jpg';
import bananImg from '@/assets/fruktkorg-banan-new.jpg';

const faqItems = [
  { question: 'Vad kostar en fruktkorg i Stockholm?', answer: 'Våra fruktkorgar börjar från 349 kr för en 4 kg Original-korg. Premium-korgen kostar från 449 kr och Banan-korgen från 299 kr. Alla priser är exklusive moms och inkluderar fri leverans i Stockholm.' },
  { question: 'Tillkommer det leveransavgift?', answer: 'Nej. Leverans är alltid kostnadsfri i Stockholm med kranskommuner. Inga dolda avgifter och ingen miniorder utöver en korg per leverans.' },
  { question: 'Får jag rabatt om jag beställer flera korgar?', answer: 'Ja. Företag som beställer flera korgar per vecka får automatisk volymrabatt. Kontakta oss på 010-183 98 36 för en skräddarsydd offert.' },
  { question: 'Hur fakturerar ni?', answer: 'Vi fakturerar månadsvis med 15 dagars betalvillkor. Smidigt och enkelt för företag.' },
  { question: 'Kan jag pausa eller avsluta?', answer: 'Ja. Ni kan alltid pausa, ändra eller avsluta er leverans. Bindningstiden beror på antal korgar – kontakta oss så går vi igenom alternativen.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(i => ({ '@type': 'Question', name: i.question, acceptedAnswer: { '@type': 'Answer', text: i.answer } })),
};

const tiers = [
  { name: 'Banan', img: bananImg, from: 299, desc: 'Klassisk banan-korg – mest valuta för pengarna.', features: ['Färska bananer varje leverans', 'Perfekt för mindre kontor', 'Fri leverans Stockholm'] },
  { name: 'Original', img: originalImg, from: 349, desc: 'Vår mest populära – bred mix av säsongsfrukt.', features: ['Äpple, päron, banan, citrus', 'Säsongsbär när det är säsong', 'Fri leverans Stockholm'], popular: true },
  { name: 'Premium', img: premiumImg, from: 449, desc: 'Exklusiv mix med exotiska frukter.', features: ['Mango, ananas, druvor m.m.', 'För kräsna kontor', 'Fri leverans Stockholm'] },
];

const FruktkorgStockholmPris = () => {
  const [open, setOpen] = useState<number[]>([]);
  const toggle = (i: number) => setOpen(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Fruktkorg Stockholm pris – Transparenta priser från 299 kr | Vitaminkorgen"
        description="Fruktkorg Stockholm pris ✓ Från 299 kr/korg med fri leverans. Inga dolda avgifter. Jämför Original, Premium och Banan – beställ direkt online."
        keywords="fruktkorg stockholm pris, fruktkorg pris, vad kostar fruktkorg, pris fruktkorg företag, fruktkorg företag pris"
        type="products"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main>
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-700 to-green-900" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <span className="inline-block bg-yellow-400 text-green-900 font-semibold px-4 py-1 rounded-full text-sm mb-6">💰 Transparenta priser</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">Fruktkorg Stockholm – pris från 299 kr</h1>
            <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl mx-auto leading-relaxed">Tydliga priser utan dolda avgifter. Fri leverans i hela Stockholm – varje vecka eller varannan vecka.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/produkter"><Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold shadow-lg border-2 border-black/10 text-lg px-8">Se alla korgar</Button></Link>
              <a href="tel:0101839836"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8"><Phone className="h-5 w-5 mr-2" /> 010-183 98 36</Button></a>
            </div>
          </div>
        </section>

        <TrustedBySection />

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-4">Våra priser</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Alla priser exklusive moms. Fri leverans i Stockholm. Ingen leveransavgift.</p>
            <div className="grid md:grid-cols-3 gap-8">
              {tiers.map((t, i) => (
                <div key={i} className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden flex flex-col ${t.popular ? 'ring-2 ring-yellow-400' : ''}`}>
                  {t.popular && <div className="bg-yellow-400 text-green-900 text-center py-2 font-bold text-sm">⭐ Populärast</div>}
                  <img src={t.img} alt={`Fruktkorg ${t.name}`} className="w-full h-56 object-cover" />
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-green-900 mb-1">{t.name}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{t.desc}</p>
                    <div className="mb-4">
                      <span className="text-sm text-gray-500">Från</span>
                      <div className="text-3xl font-bold text-red-600">{t.from} kr<span className="text-base font-normal text-gray-600">/korg</span></div>
                    </div>
                    <div className="space-y-2 mb-6 flex-1">
                      {t.features.map((f, j) => <div key={j} className="flex items-start gap-2"><Check className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" /><span className="text-sm text-gray-700">{f}</span></div>)}
                    </div>
                    <Link to="/produkter"><Button className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold">Beställ {t.name}</Button></Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-green-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-12">Vad andra företag säger</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { quote: 'Otroligt prisvärt. Vi sparar både tid och pengar jämfört med tidigare leverantör.', name: 'Erik H.', role: 'CFO' },
                { quote: 'Tydliga priser, inga överraskningar på fakturan. Det uppskattas verkligen.', name: 'Lisa M.', role: 'Office Manager' },
                { quote: 'Bästa priset i Stockholm för den här kvaliteten. Rekommenderas varmt.', name: 'Mikael S.', role: 'VD' },
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

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-12">Vanliga frågor om pris</h2>
            <div className="space-y-3">
              {faqItems.map((f, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Få en skräddarsydd offert</h2>
            <p className="text-gray-200 mb-8 max-w-xl mx-auto">Berätta om ert kontor så räknar vi ut bästa upplägget och priset för er.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/kontakt"><Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold shadow-lg border-2 border-black/10 text-lg px-8">Kontakta oss</Button></Link>
              <a href="tel:0101839836"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8"><Phone className="h-5 w-5 mr-2" /> 010-183 98 36</Button></a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FruktkorgStockholmPris;