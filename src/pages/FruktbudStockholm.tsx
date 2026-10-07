import { useState } from 'react';
import { Link } from '@/lib/router-compat';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown, Phone } from 'lucide-react';
import HowItWorksSteps from '@/components/HowItWorksSteps';
import HubAreaLinks from '@/components/HubAreaLinks';
import TrustProofSection from '@/components/TrustProofSection';
import { fruktkorgProducts } from '@/data/fruktkorg-products';

export const fruktbudFaq = [
  { q: 'Vad är ett fruktbud?', a: 'Ett fruktbud levererar färsk frukt direkt till ert kontor enligt ett fast schema, så att ingen på jobbet behöver handla, bära eller planera frukten själv.' },
  { q: 'Vilka dagar levererar ert fruktbud i Stockholm?', a: 'Vi levererar måndag–fredag. Ni väljer en eller flera fasta leveransdagar per vecka. Helgleverans kan väljas vid beställning om ni har behov av det.' },
  { q: 'Kostar leveransen något?', a: 'Nej. Leveransen är kostnadsfri i hela Stockholm, Södertälje och Uppsala.' },
  { q: 'Vad kostar det?', a: 'Fruktkorg Original från 220 kr, Banan från 230 kr och Premium från 250 kr per korg och leverans (4 kg). Större storlekar finns i 6, 9 och 11 kg.' },
  { q: 'Hur snabbt kan vi komma igång?', a: 'Vi levererar direkt när ni vill börja – ni anger önskat startdatum.' },
  { q: 'Behöver någon vara på plats vid leveransen?', a: 'Nej. Vi ställer frukten på den plats ni önskar – i fikarummet, receptionen eller rätt kök – och mjölk och kylvaror i rätt kyl.' },
  { q: 'Kan vi ändra eller pausa leveranserna?', a: 'Ja. Ni kan ändra storlek, leveransdag eller pausa vid semester. Kontakta oss eller hantera det i kundportalen.' },
  { q: 'Kan vi beställa mer än frukt?', a: 'Ja. Utöver fruktkorgar levererar vi kaffe, te, mejeri, snacks och drycker samt extra beställningar till möten och fika.' },
  { q: 'Hur fungerar faktureringen?', a: 'Ni får en samlad månadsfaktura för alla leveranser.' },
];

const included = [
  'Färsk säsongsfrukt, kvalitetskontrollerad och packad nära leveransen',
  'Fri leverans till den plats på kontoret ni önskar',
  'Fasta leveransdagar måndag–fredag',
  'Mjölk och kylvaror placeras i rätt kyl',
  'Möjlighet till extra beställningar inför möten och fika',
  'Samlad månadsfaktura',
];

const FruktbudStockholm = () => {
  const [open, setOpen] = useState<number[]>([]);
  const toggle = (i: number) => setOpen((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));
  const products = fruktkorgProducts;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-700 to-green-900" />
          <div className="container mx-auto px-6 relative z-10 max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">Fruktbud Stockholm</h1>
            <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed">
              Vitaminkorgen är ert fruktbud i Stockholm. Vi levererar färsk frukt till kontoret varje vecka – fri leverans måndag–fredag, och ni behöver inte vara på plats.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/kontakt"><Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-lg px-8">Begär gratis offert</Button></Link>
              <Link to="/provkorg"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">Gratis provkorg</Button></Link>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-4xl space-y-5 text-gray-700 leading-relaxed">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900">Så fungerar leveransen</h2>
            <p>
              Ett fruktbud betyder att ingen på kontoret behöver handla, bära eller planera frukten. Ni bestämmer storlek och leveransdagar en gång – sedan kommer frukten automatiskt varje vecka. Vi ställer korgen där ni vill ha den, så att den är på plats när medarbetarna kommer.
            </p>
            <p>
              Vi kör fasta rutter genom Stockholms innerstad och närförorter, och levererar även till Södertälje och Uppsala. Behöver ni mer frukt en vecka, extra till ett möte eller vill pausa under semestern ändrar ni det enkelt.
            </p>
            <h3 className="text-2xl font-bold text-green-900 pt-4">Leveransdagar</h3>
            <p>Vi levererar måndag–fredag. De flesta kontor väljer en dag i veckan; större arbetsplatser väljer ofta två eller fler dagar för att frukten ska räcka hela veckan.</p>
            <h3 className="text-2xl font-bold text-green-900 pt-4">Vad ingår</h3>
            <ul className="space-y-2">
              {included.map((t) => (
                <li key={t} className="flex gap-2"><Check className="h-5 w-5 text-green-600 mt-0.5 shrink-0" aria-hidden="true" />{t}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-green-50">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">Priser per leverans</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white">
              <table className="w-full text-left">
                <caption className="sr-only">Pris per fruktkorg och leverans</caption>
                <thead className="bg-green-100 text-green-900">
                  <tr>
                    <th scope="col" className="px-4 py-3">Fruktkorg</th>
                    {products[0]?.sizes.map((s) => <th key={s.kg} scope="col" className="px-4 py-3">{s.kg.replace('kg', ' kg')}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.slug} className="border-t">
                      <th scope="row" className="px-4 py-3"><Link to={`/produkt/${p.slug}`} className="text-green-800 underline">{p.name}</Link></th>
                      {p.sizes.map((s) => <td key={s.kg} className="px-4 py-3">{s.price} kr</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Fri leverans ingår. Se alla storlekar och leveransområden på sidan <Link to="/fruktkorg-stockholm" className="text-green-700 underline">fruktkorg Stockholm</Link>.
            </p>
          </div>
        </section>

        <HowItWorksSteps />
        <HubAreaLinks />
        <TrustProofSection />

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-10">Vanliga frågor om fruktbud i Stockholm</h2>
            <div className="space-y-3">
              {fruktbudFaq.map((f, i) => (
                <div key={f.q} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <button onClick={() => toggle(i)} aria-expanded={open.includes(i)} className="w-full flex items-center justify-between p-5 text-left">
                    <span className="font-semibold text-green-900">{f.q}</span>
                    <ChevronDown className={`h-5 w-5 text-green-700 transition-transform ${open.includes(i) ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                  <div className={open.includes(i) ? 'px-5 pb-5 text-gray-700' : 'sr-only'}>{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-green-800 to-green-900 text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white mb-6">Testa vårt fruktbud</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/provkorg"><Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold">Beställ gratis provkorg</Button></Link>
              <a href="tel:0101839836"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10"><Phone className="h-5 w-5 mr-2" aria-hidden="true" />010-183 98 36</Button></a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FruktbudStockholm;
