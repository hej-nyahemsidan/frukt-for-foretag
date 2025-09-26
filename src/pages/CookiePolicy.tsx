import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-32">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Cookiepolicy
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Vi använder cookies för att förbättra din upplevelse på vår webbplats och för att leverera bättre tjänster.
              </p>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Vad är cookies?
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Cookies är små textfiler som lagras på din enhet när du besöker vår webbplats. 
                  De hjälper oss att komma ihåg dina preferenser och förbättra funktionaliteten på webbplatsen.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Vilka cookies använder vi?
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Nödvändiga cookies</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Dessa cookies är nödvändiga för att webbplatsen ska fungera korrekt och 
                      för att du ska kunna använda våra tjänster.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Prestanda cookies</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Dessa cookies hjälper oss att förstå hur besökare använder vår webbplats 
                      så att vi kan förbättra prestanda och användarvänlighet.
                    </p>
                  </div>
                </div>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Hantera dina cookie-inställningar
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Du kan när som helst ändra dina cookie-inställningar i din webbläsare. 
                  Observera att vissa funktioner på webbplatsen kanske inte fungerar korrekt 
                  om du väljer att inaktivera cookies.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Kontakta oss
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Har du frågor om vår cookiepolicy? 
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

export default CookiePolicy;