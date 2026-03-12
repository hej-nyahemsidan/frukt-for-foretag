import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, CheckCircle2, Pause, MessageCircle, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import officeBouquet from '@/assets/office-bouquet.jpg';


const Blommor = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Blommor till kontoret Stockholm – Blomsterabonnemang för företag | Vitaminkorgen"
        description="Blommor till kontoret ✓ Fräscha blomsterarrangemang levererade till ert företag i Stockholm. Skapa en trivsam arbetsplats. Fri leverans & flexibelt abonnemang."
        keywords="blommor kontoret, blomsterabonnemang företag, blommor arbetsplats stockholm, kontorsblommor, blomsterleverans företag"
      />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section 
          className="py-20 px-4 bg-gradient-to-br from-green-50 to-blue-50 relative overflow-hidden"
          style={{
            backgroundImage: `url(${officeBouquet})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Faded overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/90 to-blue-50/90"></div>
          <div className="container mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Blommor & växter till jobbet – enkelt med Vitaminkorgen 🌸
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Visste du att vi på Vitaminkorgen även erbjuder uthyrning av blommor och växter till företag? 
              Det är en smidig och uppskattad tjänst som gör arbetsmiljön både trevligare och mer levande – 
              utan att ni behöver tänka på skötsel eller inköp.
            </p>
          </div>
        </section>

        {/* Service Description with Image */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Vi levererar fräscha växter och vackra blomsterarrangemang till ert kontor, entré eller fikarum. 
                  Allt sköts automatiskt, och ni kan enkelt pausa tjänsten när det behövs – till exempel under 
                  semestertider. Behöver ni lägga till extra blommor till någon som fyller år eller ska avtackas? 
                  Inga problem – det fixar vi med ett enkelt meddelande.
                </p>
              </div>
              
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">🌿 Så funkar det:</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center p-6 bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    <Calendar className="w-12 h-12 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Leverans efter överenskommelse</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    Vi levererar blommor & växter enligt er önskade tidsplan
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center p-6 bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Regelbunden uppdatering</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    Utbyte så allt håller sig fräscht och vackert
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center p-6 bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    <Pause className="w-12 h-12 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Flexibel tjänst</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    Pausa, justera eller lägg till när ni vill
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center p-6 bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    <Users className="w-12 h-12 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Trivsam miljö</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    Perfekt för att skapa en välkomnande arbetsmiljö
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-green-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">
                Perfekt för företag som vill ha det snyggt och ombonat
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed text-center mb-6">
                Tjänsten passar företag som vill ha det snyggt och ombonat utan att behöva tänka på vattning, 
                jord eller vissna blad. Vi tar hand om allt – ni bara njuter av grönskan.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Ingen vattning
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Ingen skötsel
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Automatiskt utbyte
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Alltid fräscht
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Vill du veta mer?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Kontakta oss så berättar vi hur vi kan skapa rätt känsla med blommor och växter på just er arbetsplats.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/kontakt">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Kontakta oss
                </Button>
              </Link>
              
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center items-center text-sm opacity-90">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>010-183 98 36</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>info@vitaminkorgen.se</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blommor;