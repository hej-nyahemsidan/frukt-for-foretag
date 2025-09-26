import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-32">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Villkor
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Genom att använda FruktPortalens tjänster accepterar du dessa allmänna villkor.
              </p>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Våra tjänster
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  FruktPortalen erbjuder leverans av färsk frukt, drycker och andra produkter 
                  till kontor och företag i Stockholmsområdet. Vi strävar efter att leverera 
                  produkter av högsta kvalitet och tillhandahålla excellent service.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Beställningar och leveranser
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Beställningar görs via vår webbplats eller genom kontakt med vår kundservice. 
                  Vi levererar inom våra angivna leveransområden och arbetstider. 
                  Leveranstider kan variera beroende på väder och andra omständigheter.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Priser och betalning
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Alla priser anges inklusive moms där inget annat anges. 
                  Betalning sker enligt överenskomna betalningsvillkor. 
                  Vi förbehåller oss rätten att ändra priser med rimlig varsel.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Kvalitetsgaranti
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Vi garanterar kvaliteten på våra produkter. Om du inte är nöjd med en leverans, 
                  kontakta oss omedelbart så löser vi problemet. Vi ersätter eller återbetalar 
                  produkter som inte uppfyller våra kvalitetsstandarder.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Ansvarsbegränsning
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Vårt ansvar är begränsat till värdet av den levererade produkten. 
                  Vi ansvarar inte för indirekta skador eller följdskador som kan uppstå 
                  i samband med användning av våra tjänster.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Kontakta oss
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Har du frågor om våra villkor? 
                  Kontakta oss på <a href="mailto:info@vitaminkorgen.se" className="text-primary hover:underline">info@vitaminkorgen.se</a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;