import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VitaminKorgenLogo from '@/components/VitaminKorgenLogo';
import SEOHead from '@/components/SEOHead';
import StructuredData from '@/components/StructuredData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Lightbulb, Palette, Coffee, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const SodermalmFruktkorgar = () => {
  const trendyProducts = [
    {
      name: 'Startup Fruktkorg',
      description: 'Perfekt för kreativa team och växande företag',
      features: ['Energigivande frukter', 'Säsongsvariation', 'Flexibel storlek'],
      price: 'Från 295 kr/vecka'
    },
    {
      name: 'Creative Boost',
      description: 'Exotiska frukter för extra kreativitet',
      features: ['Exotiska smaker', 'Superfood-tillägg', 'Färgglada korgar'],
      price: 'Från 395 kr/vecka'
    }
  ];

  const sodermalmAreas = [
    {
      icon: <Coffee className="w-6 h-6" />,
      area: 'SoFo (South of Folkungagatan)',
      description: 'Trendiga startups och kreativa byråer'
    },
    {
      icon: <Palette className="w-6 h-6" />,
      area: 'Medborgarplatsen',
      description: 'Designstudios och reklambyråer'
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      area: 'Slussen & Gamla Stan gränsen',
      description: 'Tech-företag och moderna kontor'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Fruktkorgar Södermalm - Kreativ Kontorsfrukt Stockholm"
        description="Fruktkorgar till Södermalm. Vi levererar färska fruktkorgar till startups, kreativa byråer och företag på SoFo, Medborgarplatsen och hela Södermalm."
        keywords="fruktkorgar södermalm, kontorsfrukt södermalm, startup fruktleverans, södermalm frukt"
      />
      <StructuredData type="products" />
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-secondary/20 via-background to-lightgreen/10">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-lightgreen/5"></div>
          
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
                  <Palette className="w-8 h-8 text-secondary mr-3" />
                  <span className="text-secondary font-semibold">KREATIV LEVERANS</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
                  Fruktkorgar till
                  <span className="text-secondary block">Södermalm</span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  Kreativa fruktkorgar för Stockholms mest trendiga stadsdel. Vi levererar 
                  inspiration och energi till startups, designstudios och innovativa företag 
                  på hela Södermalm.
                </p>
                
                <div className="flex items-center space-x-4 mb-8">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1 text-secondary" />
                    Leverans: Tisdag
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1 text-secondary" />
                    Tid: 08:00-15:00
                  </div>
                </div>
                
                <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white">
                  <Link to="/offertforfragan">
                    Starta kreativ fruktleverans
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Creative Products */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                Kreativa Fruktkorgar för Södermalm
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Färgglada och inspirerande fruktkorgar som matchar Södermalms kreativa anda 
                och entreprenörsanda.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              {trendyProducts.map((product, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow border-2 hover:border-secondary/30 bg-gradient-to-br from-white to-secondary/5">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Lightbulb className="w-5 h-5 text-secondary mr-2" />
                      <span className="text-xs font-semibold text-secondary uppercase tracking-wide">Kreativ</span>
                    </div>
                    <CardTitle className="text-xl text-charcoal">{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="text-2xl font-bold text-secondary mb-4">{product.price}</div>
                    <Button asChild className="w-full bg-secondary hover:bg-secondary/90">
                      <Link to="/offertforfragan">
                        Beställ kreativ korg
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Södermalm Areas */}
        <section className="py-16 bg-gradient-to-br from-secondary/5 to-lightgreen/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                Vi levererar till hela Södermalm
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Från SoFo till Slussen - vi känner Södermalms unika kreativa miljö och 
                anpassar våra leveranser efter områdets behov.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {sodermalmAreas.map((area, index) => (
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

        {/* Creative Service Details */}
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="bg-gradient-to-br from-white to-secondary/5 rounded-lg shadow-lg border border-secondary/20 p-8">
              <h2 className="text-2xl font-bold text-charcoal mb-6 text-center">
                Anpassad Service för Södermalm
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center">
                    <MapPin className="w-5 h-5 text-secondary mr-2" />
                    Kreativa Leveransområden
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• SoFo (South of Folkungagatan)</li>
                    <li>• Medborgarplatsen & Björns trädgård</li>
                    <li>• Götgatan & Maria Bangata</li>
                    <li>• Slussen & Katarina-området</li>
                    <li>• Hornstull & Långholmen</li>
                    <li>• Mariatorget & Hornsgatan</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center">
                    <Coffee className="w-5 h-5 text-secondary mr-2" />
                    Startup-Vänlig Service
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Flexibla leveranstider (08:00-15:00)</li>
                    <li>• Startup-rabatter tillgängliga</li>
                    <li>• Skalbar service (växer med er)</li>
                    <li>• Kreativa presentationer</li>
                    <li>• Miljövänliga förpackningar</li>
                    <li>• Enkel onlinebokning</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-secondary/10 rounded-lg border border-secondary/30">
                <div className="flex items-start">
                  <Lightbulb className="w-5 h-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-charcoal mb-2">Startup-Friendly</h4>
                    <p className="text-sm text-gray-600">
                      Vi förstår att många företag på Södermalm är växande startups. 
                      Därför erbjuder vi flexibla avtal, skalbar service och specialpriser för nystartade företag.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-secondary text-white">
          <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ge kreativiteten näring
            </h2>
            <p className="text-xl mb-8 text-secondary-foreground/90">
              Inspirera era team på Södermalm med färska, kreativa fruktkorgar som matchar er innovativa anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="bg-white text-secondary hover:bg-gray-50">
                <Link to="/offertforfragan">
                  Starta leverans idag
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                <Link to="/produkter">
                  Se alla kreativa korgar
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

export default SodermalmFruktkorgar;