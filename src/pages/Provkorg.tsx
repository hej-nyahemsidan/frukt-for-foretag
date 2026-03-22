
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import QuoteRequestSection from '@/components/QuoteRequestSection';
import { Check, Truck, Star, ShieldCheck, Gift } from 'lucide-react';

const Provkorg = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Gratis provkorg – Testa fruktkorg på jobbet | Vitaminkorgen"
        description="Beställ en gratis provkorg ✓ Testa våra fruktkorgar utan förpliktelser. Fri leverans i Stockholm. 150+ nöjda företag. Beställ idag!"
        keywords="gratis provkorg, testa fruktkorg, provleverans frukt, gratis fruktkorg kontor, fruktkorg provkorg företag, fruktkorg testa gratis"
        type="contact"
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-700 to-green-900" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-green-900 font-semibold px-4 py-1 rounded-full text-sm mb-6">
              <Gift className="h-4 w-4" /> Helt gratis – ingen förpliktelse
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Beställ en gratis provkorg
            </h1>
            <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Upplev kvaliteten själv! Vi levererar en kostnadsfri provkorg direkt till ert kontor. 
              Ingen bindningstid, inga dolda kostnader.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-200">
              {[
                { icon: Truck, text: 'Fri leverans' },
                { icon: Star, text: '150+ nöjda företag' },
                { icon: ShieldCheck, text: 'Ingen bindningstid' },
                { icon: Check, text: '100% riskfritt' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-yellow-400" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form section - reuse existing QuoteRequestSection */}
        <QuoteRequestSection />

        {/* How it works */}
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-green-900 mb-10">
              Så fungerar det
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                { step: '1', title: 'Fyll i formuläret', desc: 'Ange ert företagsnamn, adress och kontaktuppgifter ovan.' },
                { step: '2', title: 'Vi kontaktar er', desc: 'Vi ringer eller mejlar för att bekräfta leveransdag och era önskemål.' },
                { step: '3', title: 'Njut av färsk frukt', desc: 'Vi levererar en gratis provkorg direkt till ert kontor. Helt utan förpliktelse.' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-green-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Provkorg;
