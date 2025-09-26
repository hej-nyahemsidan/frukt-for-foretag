import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-32">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Integritetspolicy
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Vi på VitaminKorgen värnar om din integritet och är transparenta med hur vi behandlar dina personuppgifter.
              </p>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Vilka uppgifter samlar vi in?
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Vi samlar in de personuppgifter som du lämnar till oss när du använder våra tjänster, 
                  såsom namn, e-postadress, telefonnummer och företagsinformation. 
                  Detta sker endast med ditt samtycke och för att kunna tillhandahålla våra tjänster.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Hur använder vi dina uppgifter?
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Dina personuppgifter används för att leverera våra fruktleveranser, 
                  hantera din beställning och förbättra våra tjänster. Vi använder aldrig dina uppgifter 
                  för andra ändamål utan ditt samtycke.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Dina rättigheter
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Du har rätt att få information om vilka personuppgifter vi behandlar om dig, 
                  rätt till rättelse och radering samt rätt att begära att behandlingen begränsas. 
                  Du har även rätt att invända mot behandlingen och rätt till dataportabilitet.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Kontakta oss
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Har du frågor om vår integritetspolicy eller hur vi behandlar dina personuppgifter? 
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

export default PrivacyPolicy;