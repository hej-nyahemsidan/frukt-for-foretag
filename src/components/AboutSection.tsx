import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronDown, ChevronRight } from 'lucide-react';

// Import images
import happyEmployeesImage from '@/assets/happy-employees.jpg';
import professionalDisplayImage from '@/assets/professional-fruit-display.jpg';
import fruitBoxImage from '@/assets/fruit-box.jpg';
import seasonalFruitsImage from '@/assets/seasonal-fruits.jpg';
import officeWellnessImage from '@/assets/office-wellness.jpg';

const AboutSection = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number[]>([]);

  const faqItems = [
    {
      question: "Kan man beställa hur många korgar som helst?",
      answer: "Ja, vi anpassar oss efter era behov! Vi levererar allt från en enda fruktkorg för små kontor till hundratals korgar för stora företag. Det finns ingen övre eller nedre gräns - vi skräddarsyr lösningen efter er verksamhet."
    },
    {
      question: "Vi är inte nöjda med vår korg, får vi ersättning?",
      answer: "Absolut! Vi har 100% nöjdhetsgaranti. Är ni inte helt nöjda med kvaliteten eller innehållet ersätter vi korgen eller återbetalar beloppet. Kontakta oss inom 24 timmar efter leverans så löser vi det direkt."
    },
    {
      question: "Hur går beställningen till?",
      answer: "Beställning görs enkelt via vår webbplats eller genom att kontakta oss direkt. Vi skapar en skräddarsydd lösning baserat på era behov och levererar sedan varje vecka på en tid som passar er."
    },
    {
      question: "Vad kostar det?",
      answer: "Priset varierar beroende på volym, frukttyper och leveransfrekvens. Vi erbjuder konkurrenskraftiga priser och ger gärna en kostnadsfri offert anpassad efter era behov."
    },
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-50 py-20 px-8 overflow-hidden">
        <div className="absolute top-10 right-10 opacity-30 hidden min-[700px]:block">
          <img 
            src={seasonalFruitsImage} 
            alt="Fresh seasonal fruits" 
            className="w-96 h-96 object-cover rounded-full"
          />
        </div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-6xl font-bold text-gray-900 mb-6">
              Stockholms ledande leverantör av fruktkorgar på jobbet
            </h1>
            <p className="text-2xl text-gray-600 leading-relaxed">
              Sedan 2021 har vi på Vitaminkorgen gjort det enkelt för företag i Stockholm att erbjuda fruktkorgar på jobbet.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1 - Company Story */}
      <section className="py-20 px-8 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            {/* Text Content - 60% */}
            <div className="lg:col-span-3 space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                Enkelt att erbjuda fruktkorgar på jobbet
              </h2>
              
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  Sedan 2021 har vi på Vitaminkorgen gjort det enkelt för företag i Stockholm 
                  att erbjuda fruktkorgar på jobbet. Vi startade med en enkel vision: färsk 
                  frukt på kontoret ska vara lika självklart som morgonkaffet.
                </p>
                
                <p>
                  Idag levererar vi fruktkorgar till över 150 företag varje vecka – från
                  innovativa startups på Östermalm till etablerade storkontor i Kista. Alla 
                  får samma personliga service och handplockade kvalitet.
                </p>
                
                <p>
                  Vi förstår att varje arbetsplats är unik. Därför erbjuder vi flexibla 
                  lösningar som anpassas efter era behov – oavsett om ni är 5 eller 150 
                  medarbetare. Våra fruktkorgar innehåller alltid säsongens bästa frukt, 
                  noggrant utvald för optimal smak och näring.
                </p>
                
                <p>
                  En fruktkorg på kontoret är mer än bara frukt – det är en investering i:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Ökad energi och produktivitet</li>
                  <li>Färre sjukdagar och bättre immunförsvar</li>
                  <li>Starkare teamkänsla och trivsel</li>
                  <li>Enkel och uppskattad personalförmån</li>
                </ul>
              </div>
            </div>

            {/* Image - 40% */}
            <div className="lg:col-span-2">
              <img 
                src={fruitBoxImage} 
                alt="Fresh fruit basket" 
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Mission Statement */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            {/* Image - 40% */}
            <div className="lg:col-span-2">
              <img 
                src={officeWellnessImage} 
                alt="Person working at desk with healthy snacks" 
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </div>

            {/* Text Content - 60% */}
            <div className="lg:col-span-3 space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                En hälsosam livsstil börjar på arbetsplatsen.
              </h2>
              
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  Vår mission är att förbättra välmåendet på svenska arbetsplatser. När medarbetare har tillgång till näringsrik frukt ökar både produktivitet och arbetstillfredsställelse. Vi tror på att små förändringar kan göra stor skillnad.
                </p>
              </div>

              {/* Signature */}
              <div className="pt-4">
                <div className="text-2xl font-handwriting text-green-600" style={{ fontFamily: 'cursive' }}>
                  Med vänliga hälsningar, Fruktexperten
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Values/Impact */}
      <section className="relative py-20 px-8 bg-green-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={seasonalFruitsImage} 
            alt="Sustainable farming" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-green-800/80"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-bold text-white">
              En plats för engagemang hela vägen i kedjan
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Vi arbetar nära våra leverantörer för att säkerställa hållbara odlingsmetoder och rättvisa arbetsförhållanden. Från jord till bord tar vi ansvar för hela kedjan och stödjer lokala odlare där det är möjligt.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 - Environmental Policy */}
      <section className="py-20 px-8 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold text-gray-900 text-center">
              Miljöpolicy
            </h2>
            
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                På Fruktexperten tar vi miljöansvar på allvar. Vår miljöpolicy genomsyrar hela vår verksamhet, från val av leverantörer till förpackning och transport.
              </p>
              
              <p>
                Vi prioriterar naturliga och närproducerade produkter när det är möjligt och arbetar endast med certifierade leverantörer som följer strikta miljöstandarder. Våra förpackningar är återvinningsbara och vi strävar kontinuerligt efter att minska vårt klimatavtryck.
              </p>
              
              <p>
                Transport optimeras för att minimera utsläpp och vi använder miljövänliga fordon där det är praktiskt möjligt. Vi mäter och rapporterar vårt miljöarbete för att säkerställa kontinuerlig förbättring.
              </p>
              
              <p>
                Genom att välja Fruktexperten bidrar ditt företag till en mer hållbar framtid. Vi tror att affärer och miljöansvar går hand i hand och strävar efter att vara ett föredöme inom vår bransch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 - FAQ */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            Vill du veta mer?
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Column - Contact Form */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Kontakta oss
                </h3>
                
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600 font-medium">Namn</label>
                    <Input 
                      placeholder="Ditt namn" 
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600 font-medium">E-post</label>
                    <Input 
                      type="email" 
                      placeholder="Din e-post" 
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600 font-medium">Företag</label>
                    <Input 
                      placeholder="Företag" 
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600 font-medium">Meddelande</label>
                    <Textarea 
                      placeholder="Meddelande" 
                      rows={4}
                      className="w-full"
                    />
                  </div>
                  
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3">
                    Kontakta oss
                  </Button>
                </form>
              </div>
            </div>

            {/* Right Column - FAQ */}
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="text-lg text-gray-800 font-medium">
                      {item.question}
                    </span>
                    <div className="flex-shrink-0 ml-4">
                      {expandedFAQ.includes(index) ? (
                        <ChevronDown className="w-5 h-5 text-green-600" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                  </button>
                  
                  <div 
                    className={`transition-all duration-300 ease-in-out ${
                      expandedFAQ.includes(index) 
                        ? 'max-h-96 opacity-100' 
                        : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                  >
                    <div className="px-6 pb-5">
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-gray-600 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;