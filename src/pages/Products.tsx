import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Phone, Mail, LogIn, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import FruktkorgarTab from '@/components/product-tabs/FruktkorgarTab';
import FruktpaserTab from '@/components/product-tabs/FruktpaserTab';
import LaskTab from '@/components/product-tabs/LaskTab';
import MejeriTab from '@/components/product-tabs/MejeriTab';
import KaffeTeTab from '@/components/product-tabs/KaffeTeTab';
import AnnatTab from '@/components/product-tabs/AnnatTab';

const Products = () => {
  const [activeTab, setActiveTab] = useState('fruktkorgar');
  // No selectedDays needed for Products page - just display products
  const selectedDays: string[] = [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Våra Produkter
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Upptäck vårt sortiment av färska frukter, mejerivaror, drycker och kaffe
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 gap-1 sm:gap-2 mb-6 sm:mb-8 bg-gray-100 p-1 rounded-lg h-auto">
            <TabsTrigger 
              value="fruktkorgar" 
              className="text-xs sm:text-sm py-2 sm:py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Fruktkorgar
            </TabsTrigger>
            <TabsTrigger 
              value="fruktpasar" 
              className="text-xs sm:text-sm py-2 sm:py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Fruktpåsar
            </TabsTrigger>
            <TabsTrigger 
              value="lask" 
              className="text-xs sm:text-sm py-2 sm:py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Läsk
            </TabsTrigger>
            <TabsTrigger 
              value="mejeri" 
              className="text-xs sm:text-sm py-2 sm:py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Mjölk
            </TabsTrigger>
            <TabsTrigger 
              value="kaffe" 
              className="text-xs sm:text-sm py-2 sm:py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Kaffe
            </TabsTrigger>
            <TabsTrigger 
              value="annat" 
              className="text-xs sm:text-sm py-2 sm:py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Skafferi
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fruktkorgar" className="mt-6">
            <FruktkorgarTab selectedDays={selectedDays} currentDay="" />
          </TabsContent>

          <TabsContent value="fruktpasar" className="mt-6">
            <FruktpaserTab selectedDays={selectedDays} currentDay="" />
          </TabsContent>

          <TabsContent value="lask" className="mt-6">
            <LaskTab selectedDays={selectedDays} currentDay="" />
          </TabsContent>

          <TabsContent value="mejeri" className="mt-6">
            <MejeriTab selectedDays={selectedDays} currentDay="" />
          </TabsContent>

          <TabsContent value="kaffe" className="mt-6">
            <KaffeTeTab selectedDays={selectedDays} currentDay="" />
          </TabsContent>

          <TabsContent value="annat" className="mt-6">
            <AnnatTab selectedDays={selectedDays} currentDay="" />
          </TabsContent>
        </Tabs>

        {/* Enhanced CTA Section */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 sm:p-8 border border-primary/20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Redo att Beställa?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-4">
              Logga in på ditt konto för att lägga beställningar eller begär en offert
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8">
              <Link to="/kundportal" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto gap-2 text-sm sm:text-base px-6 sm:px-8">
                  <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                  Logga in
                </Button>
              </Link>
              <Link to="/offertforfragan" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 text-sm sm:text-base px-6 sm:px-8">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                  Begär offert
                </Button>
              </Link>
            </div>
            
            <div className="pt-6 sm:pt-8 border-t border-gray-200">
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Har du frågor? Kontakta oss</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-center text-xs sm:text-sm">
                <a href="tel:0735052062" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>073-505 20 62</span>
                </a>
                <a href="mailto:info@vitaminkorgen.se" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>info@vitaminkorgen.se</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Floating CTA Button - Mobile Only */}
      <div className="sm:hidden fixed bottom-4 right-4 z-50">
        <Link to="/offertforfragan">
          <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-all">
            <FileText className="w-5 h-5 mr-2" />
            Begär offert
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Products;
