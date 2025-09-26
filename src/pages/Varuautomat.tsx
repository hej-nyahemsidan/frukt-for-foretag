import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Monitor, 
  Smartphone, 
  Apple, 
  Headphones, 
  Users, 
  Cog,
  CheckCircle2,
  Phone,
  Mail,
  MessageCircle,
  Zap,
  Coffee,
  CreditCard,
  Wrench
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Varuautomat = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Monitor className="w-16 h-16 text-blue-600" />
                <Coffee className="w-6 h-6 text-purple-500 absolute -top-1 -right-1 bg-white rounded-full p-1" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Varuautomat på jobbet – smidig service för en trevligare arbetsdag
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Vill ni göra arbetsplatsen ännu mer trivsam, effektiv och omtyckt? Då är vår lösning med 
              varuautomat på jobbet precis vad ni letar efter. Vi på Vitaminkorgen erbjuder moderna, 
              smarta och skräddarsydda automater för företag – fyllda med det era medarbetare vill ha.
            </p>
          </div>
        </section>

        {/* Service Description */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Snacks, drycker, kaffe – och självklart har ni även möjlighet att lägga till frukt på jobbet 
                med våra fruktkorgar. Det är en komplett pauslösning som levererar energi, glädje och 
                bekvämlighet – direkt till kontoret.
              </p>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                  Därför ska ni välja Vitaminkorgen:
                </h2>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Smidig installation */}
              <Card className="p-6 bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <Wrench className="w-12 h-12 text-blue-600" />
                      <Cog className="w-4 h-4 text-purple-500 absolute -top-1 -right-1 animate-spin" style={{animationDuration: '3s'}} />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-center">Smidig installation – vi sköter allt</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    Från leverans och installation till påfyllning och underhåll – vi tar hand om hela 
                    processen så att ni slipper. Automaterna fungerar smidigt och diskret i bakgrunden, 
                    utan att ni behöver tänka på det.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Moderna betalningsalternativ */}
              <Card className="p-6 bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <Smartphone className="w-12 h-12 text-blue-600" />
                      <CreditCard className="w-4 h-4 text-green-500 absolute -bottom-1 -right-1 bg-white rounded p-0.5" />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-center">Moderna och kontantlösa betalningsalternativ</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    Våra automater är uppdaterade med kontaktlös betalning, kort, Swish och mobilbetalning. 
                    Enkelt och snabbt för alla.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Kombinera med frukt */}
              <Card className="p-6 bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <Apple className="w-12 h-12 text-green-600" />
                      <Zap className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1 bg-white rounded-full p-0.5" />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-center">Kombinera med frukt på jobbet</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    Vill ni ha ett hälsosammare alternativ? Då kan ni kombinera varuautomaten med våra 
                    populära fruktkorgar. Vi levererar färska, säsongsanpassade frukter direkt till kontoret 
                    – perfekt för en energikick under arbetsdagen.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Snabb kundsupport */}
              <Card className="p-6 bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    <Headphones className="w-12 h-12 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl text-center">Snabb och personlig kundsupport</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    Skulle något hända finns vi alltid nära till hands. Vi erbjuder snabb service och 
                    support så att ni kan känna er trygga.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Förhöjd trivsel */}
              <Card className="p-6 bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    <Users className="w-12 h-12 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl text-center">Förhöjd trivsel och nöjdare medarbetare</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    Att erbjuda snacks, dryck och frukt direkt på arbetsplatsen är en liten detalj som 
                    gör stor skillnad. Det ger energi, skapar gemenskap och visar att ni bryr er om 
                    personalens välbefinnande.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Flexibelt */}
              <Card className="p-6 bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    <CheckCircle2 className="w-12 h-12 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl text-center">Flexibelt och anpassningsbart</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    Behöver ni ändra utbudet? Pausa leveranser under semestern? Lägga till något extra 
                    inför ett firande på kontoret? Inga problem – vi anpassar oss efter era behov, oavsett 
                    om det gäller frukt, kaffe eller snacks.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Summary */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
                Skapa en arbetsplats att trivas på
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed text-center mb-6">
                Med en varuautomat på jobbet och frukt på jobbet från Vitaminkorgen får ni en helhetslösning 
                som både förenklar vardagen och höjer stämningen på kontoret. Det är en tjänst som bara 
                rullar på – lätt att komma igång med, och ännu lättare att uppskatta.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Energi & glädje
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Skapar gemenskap
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Nöjdare personal
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Helt automatiskt
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Kontakta oss idag för en skräddarsydd lösning
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Vi hjälper gärna till att skapa en trevligare, friskare och mer energifylld miljö på jobbet 
              som passar just er arbetsplats.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/kontakt">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Kontakta oss
                </Button>
              </Link>
              
              <Link to="/offertforfragan">
                <Button size="lg" variant="outline" className="border-2 border-white/80 text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-blue-600 shadow-lg">
                  Begär offert
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center items-center text-sm opacity-90">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>08-21 85 85</span>
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

export default Varuautomat;