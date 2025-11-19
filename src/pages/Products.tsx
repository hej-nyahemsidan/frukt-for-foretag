import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Phone, Mail, LogIn, FileText, ShoppingCart, X, Plus, Minus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { usePublicCart } from '@/contexts/PublicCartContext';
import FruktkorgarTab from '@/components/product-tabs/FruktkorgarTab';
import FruktpaserTab from '@/components/product-tabs/FruktpaserTab';
import LaskTab from '@/components/product-tabs/LaskTab';
import MejeriTab from '@/components/product-tabs/MejeriTab';
import KaffeTeTab from '@/components/product-tabs/KaffeTeTab';
import AnnatTab from '@/components/product-tabs/AnnatTab';

const Products = () => {
  const [activeTab, setActiveTab] = useState('fruktkorgar');
  const navigate = useNavigate();
  const { items, getTotalItems, getTotalPrice, updateQuantity, removeItem } = usePublicCart();
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
            <FruktkorgarTab selectedDays={selectedDays} currentDay="" isPublicPage={true} />
          </TabsContent>

          <TabsContent value="fruktpasar" className="mt-6">
            <FruktpaserTab selectedDays={selectedDays} currentDay="" isPublicPage={true} />
          </TabsContent>

          <TabsContent value="lask" className="mt-6">
            <LaskTab selectedDays={selectedDays} currentDay="" isPublicPage={true} />
          </TabsContent>

          <TabsContent value="mejeri" className="mt-6">
            <MejeriTab selectedDays={selectedDays} currentDay="" isPublicPage={true} />
          </TabsContent>

          <TabsContent value="kaffe" className="mt-6">
            <KaffeTeTab selectedDays={selectedDays} currentDay="" isPublicPage={true} />
          </TabsContent>

          <TabsContent value="annat" className="mt-6">
            <AnnatTab selectedDays={selectedDays} currentDay="" isPublicPage={true} />
          </TabsContent>
        </Tabs>

        {/* Cart Summary Section */}
        {items.length > 0 && (
          <div className="mt-12 sm:mt-16 bg-white rounded-xl p-6 sm:p-8 border-2 border-primary shadow-lg">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <ShoppingCart className="h-7 w-7 text-primary" />
                Din varukorg ({getTotalItems()} produkter)
              </h2>
              
              <div className="space-y-6 mb-6 max-h-[400px] overflow-y-auto">
                {Object.entries(
                  items.reduce((acc, item) => {
                    if (!acc[item.deliveryDay]) {
                      acc[item.deliveryDay] = [];
                    }
                    acc[item.deliveryDay].push(item);
                    return acc;
                  }, {} as Record<string, typeof items>)
                ).map(([day, dayItems]) => (
                  <div key={day} className="space-y-4">
                    <h3 className="font-bold text-lg text-primary border-b-2 border-primary/20 pb-2">{day}</h3>
                    {dayItems.map((item) => (
                      <div key={`${item.id}-${item.deliveryDay}`} className="flex gap-4 pb-4 border-b last:border-b-0">
                        {item.image && (
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm sm:text-base truncate">{item.name}</h4>
                          <p className="text-primary font-bold text-lg">{item.price} kr</p>
                          <div className="flex items-center gap-3 mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.deliveryDay, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-semibold w-12 text-center">{item.quantity} st</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.deliveryDay, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-auto text-destructive hover:text-destructive"
                              onClick={() => removeItem(item.id, item.deliveryDay)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Ta bort
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-xl text-primary">{item.price * item.quantity} kr</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="border-t pt-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-2xl font-bold text-gray-900">Totalt:</span>
                  <span className="text-3xl font-bold text-primary">{getTotalPrice()} kr</span>
                </div>
                
                <Button 
                  onClick={() => navigate('/offertforfragan')}
                  size="lg"
                  className="w-full text-lg"
                >
                  <FileText className="h-5 w-5 mr-2" />
                  Gå till offertförfrågan
                </Button>
              </div>
            </div>
          </div>
        )}

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
