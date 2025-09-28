import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VitaminKorgenLogo from '@/components/VitaminKorgenLogo';
import SEOHead from '@/components/SEOHead';
import StructuredData from '@/components/StructuredData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Factory, Building2, Zap, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const SolnaSundbybergFrukt = () => {
  const businessParkProducts = [
    {
      name: 'Företagspark Fruktkorg',
      description: 'Stor fruktkorg för företagsparker och industriområden',
      features: ['Stor kapacitet', 'Robust förpackning', 'Veckovis påfyllning'],
      price: 'Från 525 kr/vecka'
    },
    {
      name: 'Campus Corporate',
      description: 'Designad för stora kontorskomplex',
      features: ['Flera leveranspunkter', 'Koordinerad leverans', 'Bulk-rabatter'],
      price: 'Från 750 kr/vecka'
    }
  ];

  const businessAreas = [
    {
      icon: <Factory className="w-6 h-6" />,
      area: 'Solna Business Park',
      description: 'Stora företag och industrianläggningar'
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      area: 'Sundbyberg Centrum',
      description: 'Kontorskomplex och affärsområden'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      area: 'Industriområden',
      description: 'Produktionsföretag och lager'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Kontorsfrukt Solna Sundbyberg - Företagsparker Fruktleverans"
        description="Kontorsfrukt till Solna och Sundbyberg. Vi levererar fruktkorgar till företagsparker, industriområden och kontorskomplex i norra Stockholm."
        keywords="kontorsfrukt solna, sundbyberg fruktleverans, företagspark frukt, solna business park fruktkorgar"
      />
      <StructuredData type="products" />
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-lightgreen/15">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-lightgreen/5"></div>
          
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
                  <Factory className="w-8 h-8 text-primary mr-3" />
                  <span className="text-primary font-semibold">FÖRETAGSPARK SPECIALIST</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
                  Kontorsfrukt till
                  <span className="text-primary block">Solna & Sundbyberg</span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  Specialiserad fruktleverans till företagsparker och industriområden i 
                  Solna och Sundbyberg. Vi levererar stora volymer till kontorskomplex, 
                  företagsparker och industrianläggningar i norra Stockholm.
                </p>
                
                <div className="flex items-center space-x-4 mb-8">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1 text-primary" />
                    Leverans: Onsdag
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1 text-primary" />
                    Tid: 07:00-15:00
                  </div>
                </div>
                
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  <Link to="/offertforfragan">
                    Begär företagspark offert
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Business Park Products */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                Skalbar Service för Företagsparker
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Vi förstår stora företags behov och erbjuder robusta lösningar som 
                fungerar för kontorskomplex och industrianläggningar.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              {businessParkProducts.map((product, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow border-2 hover:border-primary/30 bg-gradient-to-br from-white to-primary/5">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Factory className="w-5 h-5 text-primary mr-2" />
                      <span className="text-xs font-semibold text-primary uppercase tracking-wide">Storskalig</span>
                    </div>
                    <CardTitle className="text-xl text-charcoal">{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-primary mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="text-2xl font-bold text-primary mb-4">{product.price}</div>
                    <Button asChild className="w-full bg-primary hover:bg-primary/90">
                      <Link to="/offertforfragan">
                        Beställ för företaget
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Business Areas */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-lightgreen/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                Vi levererar till hela området
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Från Solna Business Park till Sundbybergs industriområden - vi täcker alla 
                stora företagsområden i norra Stockholm.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {businessAreas.map((area, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm border border-primary/10">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full mb-4">
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

        {/* Enterprise Service Details */}
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="bg-gradient-to-br from-white to-primary/5 rounded-lg shadow-lg border border-primary/20 p-8">
              <h2 className="text-2xl font-bold text-charcoal mb-6 text-center">
                Företagspark Service Solna & Sundbyberg
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center">
                    <MapPin className="w-5 h-5 text-primary mr-2" />
                    Stora Leveransområden
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Solna Business Park</li>
                    <li>• Solna Centrum & stationsområdet</li>
                    <li>• Sundbyberg Centrum</li>
                    <li>• Industriområden Sundbyberg</li>
                    <li>• Rissne & Hallonbergen</li>
                    <li>• Västra Skogen</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center">
                    <Factory className="w-5 h-5 text-primary mr-2" />
                    Företagspark Service
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Stora volymleveranser</li>
                    <li>• Flera leveranspunkter per område</li>
                    <li>• Koordinerad leverans (07:00-15:00)</li>
                    <li>• Bulk-rabatter för stora beställningar</li>
                    <li>• Robust förpackning för transport</li>
                    <li>• Företagsanpassade faktureringsrutiner</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/30">
                <div className="flex items-start">
                  <Zap className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-charcoal mb-2">Effektiv Storskalig Service</h4>
                    <p className="text-sm text-gray-600">
                      Vi har specialutrustning och rutiner för stora leveranser till företagsparker. 
                      Våra fordon och personal är anpassade för att hantera stora volymer effektivt.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Volume Benefits Section */}
        <section className="py-16 bg-gradient-to-br from-lightgreen/10 to-primary/5">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
              Fördelar för stora företag
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <p className="text-gray-600">Medarbetare per leverans</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">15%</div>
                <p className="text-gray-600">Volymrabatt från 10 korgar</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">1 dag</div>
                <p className="text-gray-600">Leveranstid för hela området</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-white">
          <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Skalbar fruktleverans för stora företag
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Oavsett storleken på ert företag i Solna eller Sundbyberg - vi har lösningen för er.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-50">
                <Link to="/offertforfragan">
                  Begär volymoffert
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                <Link to="/kontakt">
                  Diskutera stora leveranser
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

export default SolnaSundbybergFrukt;