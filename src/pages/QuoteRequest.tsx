import React from 'react';
import Header from '@/components/Header';
import QuoteRequestSection from '@/components/QuoteRequestSection';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const QuoteRequest = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Offertförfrågan – Beställ fruktkorg | Vitaminkorgen"
        description="Begär offert på fruktkorgar till ert kontor. Gratis provleverans, fri leverans i Stockholm. Fyll i formuläret så kontaktar vi er."
        keywords="offert fruktkorgar, beställ fruktkorg, fruktkorg offert, fruktkorgar pris"
        type="contact"
      />
      <Header />
      <main>
        <QuoteRequestSection />
      </main>
      <Footer />
    </div>
  );
};

export default QuoteRequest;