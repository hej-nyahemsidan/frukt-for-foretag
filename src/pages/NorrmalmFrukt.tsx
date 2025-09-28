import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VitaminKorgenLogo from '@/components/VitaminKorgenLogo';
import SEOHead from '@/components/SEOHead';
import StructuredData from '@/components/StructuredData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Building2, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const NorrmalmFrukt = () => {
  const businessProducts = [
    {
      name: 'Business Fruktkorg',
      description: 'Professionell fruktkorg för affärsmöten',
      features: ['Presentabel utseende', 'Näringsrikt urval', 'Leverans på kontorstid'],
      price: 'Från 425 kr/vecka'
    },
    {
      name: 'Corporate Plus',
      description: 'Stor fruktkorg för företag med många anställda',
      features: ['Extra stor storlek', 'Varierat urval', 'Veckovis påfyllning'],
      price: 'Från 675 kr/vecka'
    }
  ];

  const businessAreas = [
    {
      icon: <Building2 className="w-6 h-6" />,
      area: 'Norrmalms City',
      description: 'Affärsdistrikt med banker och kontor'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      area: 'Vasastan',
      description: 'Moderna kontor och konsultbolag'
    },
    {
      icon: <Users className="w-6 h-6" />,
      area: 'Regeringsgatan',
      description: 'Stora företag och myndigheter'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Kontorsfrukt Norrmalm - Professionell Fruktleverans City"
        description="Kontorsfrukt till Norrmalm och City. Vi levererar professionella fruktkorgar till företag i affärsdistriktet, Vasastan och centrala Stockholm."
        keywords="kontorsfrukt norrmalm, frukt city stockholm, norrmalm fruktleverans, business fruktkorgar"
      />
      <StructuredData type="products" />
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/15 via-background to-secondary/15">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
          
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
                  <Building2 className="w-8 h-8 text-primary mr-3" />
                  <span className="text-primary font-semibold">BUSINESS LEVERANS</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
                  Kontorsfrukt till
                  <span className="text-primary block">Norrmalm & City</span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  Professionella fruktkorgar för Stockholms affärshjärta. Vi levererar 
                  kvalitetsfrukt till företag i Norrmalm, City och Vasastan - perfekt 
                  för affärsmöten och vardagsenergi.
                </p>
                
                <div className="flex items-center space-x-4 mb-8">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1 text-primary" />
                    Leverans: Måndag & Tisdag
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1 text-primary" />
                    Tid: 07:30-14:00
                  </div>
                </div>
                
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  <Link to="/offertforfragan">
                    Begär business offert
                  </Link>
                </Button>
              </div>
              
              <div className="lg:text-right">
                <img 
                  src="/assets/professional-fruit-display.jpg" 
                  alt="Business kontorsfrukt Norrmalm"
                  className="rounded-lg shadow-xl w-full max-w-md ml-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Business Products */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                Professionella Fruktkorgar för Affärslivet
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Våra fruktkorgar är designade för att passa Norrmalmts professionella miljö 
                och imponera på både medarbetare och kunder.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              {businessProducts.map((product, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow border-2 hover:border-primary/30 bg-gradient-to-br from-white to-primary/5">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Building2 className="w-5 h-5 text-primary mr-2" />
                      <span className="text-xs font-semibold text-primary uppercase tracking-wide">Business</span>
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
                        Beställ business korg
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Business Areas */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                Vi levererar till hela Norrmalm
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Från City till Vasastan - vi täcker hela Norrmalmts affärsområden med 
                professionell service och punktlig leverans.
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

        {/* Professional Service Details */}
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="bg-gradient-to-br from-white to-primary/5 rounded-lg shadow-lg border border-primary/20 p-8">
              <h2 className="text-2xl font-bold text-charcoal mb-6 text-center">
                Professionell Service för Norrmalm
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center">
                    <MapPin className="w-5 h-5 text-primary mr-2" />
                    Affärsområden vi täcker
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• T-Centralen & Sergels torg</li>
                    <li>• Drottninggatan & Regeringsgatan</li>
                    <li>• Vasastan & Odenplan</li>
                    <li>• Hötorget & Konserthuset</li>
                    <li>• Norra Bantorget</li>
                    <li>• Rådmansgatan & Upplandsgatan</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 text-primary mr-2" />
                    Business Service
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Leverans under kontorstid (07:30-14:00)</li>
                    <li>• Professionell presentation</li>
                    <li>• Fakturering enligt era rutiner</li>
                    <li>• Anpassning för affärsmöten</li>
                    <li>• Säsongsanpassade urval</li>
                    <li>• Flexibla avtal och pauser</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/30">
                <div className="flex items-start">
                  <Building2 className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-charcoal mb-2">City-Specialiserad Service</h4>
                    <p className="text-sm text-gray-600">
                      Vi förstår Norrmalmts affärstempo och levererar därför tidigt på dagen 
                      för att säkerställa att era fruktkorgar är redo när medarbetarna kommer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-white">
          <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Professionell fruktleverans för affärslivet
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Imponera på kunder och motivera medarbetare med våra professionella fruktkorgar till Norrmalm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-50">
                <Link to="/offertforfragan">
                  Begär business offert
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                <Link to="/kontakt">
                  Diskutera era behov
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

export default NorrmalmFrukt;