import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VitaminKorgenLogo from '@/components/VitaminKorgenLogo';
import SEOHead from '@/components/SEOHead';
import StructuredData from '@/components/StructuredData';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Home, Truck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const AlvsjoFruktleverans = () => {
  const alvsjoAreas = [
    {
      icon: <Home className="w-6 h-6" />,
      area: 'Älvsjö Centrum',
      description: 'Vårt hemmaområde med extra service'
    },
    {
      icon: <Truck className="w-6 h-6" />,
      area: 'Sturebyvägen',
      description: 'Närliggande företagsområden'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      area: 'Varuvägen',
      description: 'Vårt huvudkontor - din granne!'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Fruktleverans Älvsjö - Lokala Fruktkorgar från Grannen"
        description="Fruktleverans till Älvsjö från vårt huvudkontor på Varuvägen. Lokala fruktkorgar med grannservice och specialpriser för vårt hemmaområde."
        keywords="fruktleverans älvsjö, lokala fruktkorgar älvsjö, kontorsfrukt älvsjö, varuvägen frukt"
      />
      <StructuredData type="products" />
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-lightgreen/20 via-background to-secondary/15">
          <div className="absolute inset-0 bg-gradient-to-r from-lightgreen/5 via-transparent to-secondary/5"></div>
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-6">
                  <VitaminKorgenLogo 
                    size="medium" 
                    variant="horizontal"
                    animated={true}
                    className="h-16 w-auto"
                  />
                </div>
                
                <div className="flex items-center mb-4">
                  <Home className="w-8 h-8 text-secondary mr-3" />
                  <span className="text-secondary font-semibold">HEMMAOMRÅDE</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
                  Fruktleverans till
                  <span className="text-secondary block">Älvsjö - vårt hem</span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  Välkommen till vårt hemmaområde! Från vårt huvudkontor på Varuvägen 9 
                  levererar vi färska fruktkorgar till företag i hela Älvsjö. Som våra 
                  grannar får ni extra omtanke och service.
                </p>
                
                <div className="flex items-center space-x-4 mb-8">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1 text-secondary" />
                    Leverans: Torsdag
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1 text-secondary" />
                    Tid: 08:00-16:00
                  </div>
                </div>
                
                <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white">
                  <Link to="/offertforfragan">
                    Grannrabatt - begär offert
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Älvsjö Areas */}
        <section className="py-16 bg-gradient-to-br from-lightgreen/10 to-secondary/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                Vi levererar till hela Älvsjö
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Från vårt kontor på Varuvägen når vi enkelt alla delar av Älvsjö - 
                vi känner området som våra egna fickor!
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {alvsjoAreas.map((area, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm border border-secondary/10">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 text-secondary rounded-full mb-4">
                    {area.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal mb-2">
                    {area.area}
                  </h3>
                  <p className="text-gray-600">
                    {area.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Service Details */}
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="bg-gradient-to-br from-white to-lightgreen/5 rounded-lg shadow-lg border border-secondary/20 p-8">
              <h2 className="text-2xl font-bold text-charcoal mb-6 text-center">
                Grannservice i Älvsjö
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center">
                    <MapPin className="w-5 h-5 text-secondary mr-2" />
                    Vårt Närområde
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Varuvägen (vårt huvudkontor)</li>
                    <li>• Älvsjö Centrum & Stationsområdet</li>
                    <li>• Sturebyvägen & företagsområden</li>
                    <li>• Älvsjö Industriområde</li>
                    <li>• Årstaberg & närområdet</li>
                    <li>• Långholmen Business Park</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center">
                    <Heart className="w-5 h-5 text-secondary mr-2" />
                    Grannfördelar
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Samma dag leverans möjlig</li>
                    <li>• Extra kvalitetskontroll</li>
                    <li>• Personlig service från grundarna</li>
                    <li>• Flexibla leveranstider (08:00-16:00)</li>
                    <li>• Specialpriser för närområdet</li>
                    <li>• Snabb hjälp vid problem</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-secondary/10 rounded-lg border border-secondary/30">
                <div className="flex items-start">
                  <Home className="w-5 h-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-charcoal mb-2">Vårt Hemmaområde</h4>
                    <p className="text-sm text-gray-600">
                      Älvsjö är inte bara vårt affärsområde - det är vårt hem. Vi bor och arbetar här, 
                      vilket betyder att vi bryr oss extra mycket om våra grannar och deras upplevelse.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="py-16 bg-gradient-to-br from-secondary/5 to-lightgreen/10">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
              Träffa era grannar på Varuvägen 9
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Vi på Vitaminkorgen arbetar varje dag från vårt kontor på Varuvägen 9 i Älvsjö. 
              Som era grannar förstår vi lokala behov och kan erbjuda personlig service som 
              stora leverantörer inte kan matcha.
            </p>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-secondary/10">
              <p className="text-charcoal font-medium">
                "Vi startade Vitaminkorgen här i Älvsjö och är stolta över att kunna erbjuda 
                våra grannar den allra bästa servicen. Kom gärna förbi vårt kontor för en kopp kaffe!"
              </p>
              <p className="text-sm text-gray-600 mt-2">- Vitaminkorgen teamet</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-secondary text-white">
          <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Välkommen hem till oss!
            </h2>
            <p className="text-xl mb-8 text-secondary-foreground/90">
              Som våra grannar i Älvsjö får ni vår allra bästa service och de fräschaste fruktkorgar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="bg-white text-secondary hover:bg-gray-50">
                <Link to="/offertforfragan">
                  Begär grannoffert
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                <Link to="/kontakt">
                  Kom förbi vårt kontor
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AlvsjoFruktleverans;