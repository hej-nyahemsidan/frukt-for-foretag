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
            
            <div className="prose prose-lg max-w-none space-y-10">
              
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Leveranser
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Vitaminkorgen levererar i hela stor Stockholm. Fruktkorgarna levereras på överenskomna dagar och platser mellan kl. 07.00 -15.00.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  Vid röda dagar sker alltid den ordinarie leveransen nästkommande vardag om inget annat är överenskommet.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Ändringar i abonnemang
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Behörig beställare måste skriftligen meddela Vitaminkorgen senast 3 arbetsdagar före önskad ändring.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  Maila då vår kundtjänst på <a href="mailto:info@vitaminkorgen.se" className="text-primary hover:underline">info@vitaminkorgen.se</a> eller ring oss på <a href="tel:010-183 98 36" className="text-primary hover:underline">010-183 98 36</a>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Kundens ansvar
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Kunden har ansvaret att för överenskomna leveranstider och platser hålla lokaler och tillhörande områden tillgängliga för leverans.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Leveransuppehåll
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Behörig beställare måste skriftligen meddela Vitaminkorgen senast 10 arbetsdagar före önskat leveransuppehåll till <a href="mailto:info@vitaminkorgen.se" className="text-primary hover:underline">info@vitaminkorgen.se</a> eller ringa till vår kundservice.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  Leveransuppehållet får ej nyttjas under uppsägningstid (gäller kunder med avtal innehållande villkor för uppsägningstid). Under uppsägningstiden får volymen/beställningen inte justeras ner med mer än maximalt 10 %.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Fruktgaranti
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Genom att teckna ett fruktabonnemang med Vitaminkorgen Ab erhåller kunden en garanti för att all frukt som levereras är av fullgod kvalitet. Vi garanterar att vi väljer de lämpligaste frukterna ur säsongens breda utbud, att vi omsorgsfullt handplockar ut den fräschaste frukten och att alltid vara snabba med att rätta till om det ändå skulle bli något fel.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Uppsägning av abonnemang
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Uppsägningstider gäller i första hand efter avtal. Om inget annat avtalats gäller följande uppsägningstider:
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-3 space-y-2">
                  <li>1 till 2 korgar per vecka: 5 månader ca 12kg</li>
                  <li>3 till 4 korgar per vecka månader ca 21kg eller mer 12 månader.</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-3">
                  Korgar och returlådor hämtas veckan efter sista leveransen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Reklamation
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Behörig beställare som anser att leverans inte uppfyller Vitaminkorgens garanti för fullgod kvalitet skall göra en reklamation senast 24 timmar efter erhållen leverans.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  Vid sådan reklamation åligger det Vitaminkorgen Ab att samma dag eller senast nästa helgfria leveransdag kostnadsfritt för kunden leverera ny frukt av fullgod kvalitet.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Priser och betalningsvillkor
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Samtliga priser är exklusive moms. I abonnemanget ingår också lån av korg. Samtliga priser justeras upp till 1 till 3 gånger årligen. Faktura i efterskott. 15 dagar kredittid. Vi debiterar 39 kr i faktureringsavgift för pappersfakturor och inga faktura-avgifter för E-fakturor och PDF-fakturor.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Returkorgar
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Som en del av våra miljömål tillämpar vi ett retursystem för våra korgar.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  För korgar som inte returneras debiterar vi en kostnad om 79 kr per korg.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  GDPR
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Vitaminkorgen AB arbetar efter att skydda och säkra alla individers integritet, vi är otroligt noga i hur vi hanterar/lagrar och skyddar personuppgifter.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  Uppgifter som personuppgifter menas allt som kan knytas till en fysisk person. Det kan vara namn, kontaktinformation. Vår lagring av personuppgifter baseras alltid på lag, avtal, samtycke eller intresseavvägning.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  Vi behåller dina personuppgifter i våra interna system även efter avslutat avtal baserat på samtycke eller intresseavvägning.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  Du kan alltid flytta, ändra i eller begära att få dina uppgifter borttagna genom att kontakta oss via mail eller telefon.
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
