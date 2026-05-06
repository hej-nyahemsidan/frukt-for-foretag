import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { FileText, ShoppingCart, X, Plus, Minus } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { usePublicCart } from '@/contexts/PublicCartContext';
import FruktkorgarTab from '@/components/product-tabs/FruktkorgarTab';
import FruktpaserTab from '@/components/product-tabs/FruktpaserTab';
import LaskTab from '@/components/product-tabs/LaskTab';
import MejeriTab from '@/components/product-tabs/MejeriTab';
import KaffeTeTab from '@/components/product-tabs/KaffeTeTab';
import FrukostTab from '@/components/product-tabs/FrukostTab';
import SnacksTab from '@/components/product-tabs/SnacksTab';
import GronsakerTab from '@/components/product-tabs/GronsakerTab';
import StadTab from '@/components/product-tabs/StadTab';
import AnnatTab from '@/components/product-tabs/AnnatTab';

const Products = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam || 'fruktkorgar');
  const selectedDays: string[] = ['Beställning'];
  const currentDay = 'Beställning';
  const navigate = useNavigate();
  const { items, getTotalItems, getTotalPrice, updateQuantity, removeItem, clearCart } = usePublicCart();

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  // Group items by day
  const itemsByDay = items.reduce((acc, item) => {
    const day = item.day || 'Beställning';
    if (!acc[day]) acc[day] = [];
    acc[day].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SEOHead type="products" />
      <Header />
      
      <main className="container mx-auto px-4 py-8 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Våra Produkter
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 mb-4">
            Upptäck vårt sortiment av färska frukter, mejerivaror, drycker och kaffe
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-4xl mx-auto shadow-sm">
            <p className="text-sm sm:text-base text-gray-700 mb-6 text-center">
              <strong>Ny kund?</strong> Lägg till produkter i varukorgen och skicka din beställning. Vi återkommer och sätter upp leveransen!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <span className="text-base font-semibold text-gray-900">Välj Frukt</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/30 text-gray-700 rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <span className="text-base font-semibold text-gray-900">Välj Tillbehör</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/30 text-gray-700 rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <span className="text-base font-semibold text-gray-900">Skicka beställning</span>
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 sm:grid-cols-10 gap-1 sm:gap-2 mb-6 sm:mb-8 bg-gray-100 p-1 rounded-lg h-auto">
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
              value="frukost" 
              className="text-xs sm:text-sm py-2 sm:py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Frukost & mellanmål
            </TabsTrigger>

            <TabsTrigger 
              value="snacks" 
              className="text-xs sm:text-sm py-2 sm:py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Snacks
            </TabsTrigger>
            <TabsTrigger 
              value="annat" 
              className="text-xs sm:text-sm py-2 sm:py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Skafferi
            </TabsTrigger>
            <TabsTrigger 
              value="gronsaker" 
              className="text-xs sm:text-sm py-2 sm:py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Grönsaker
            </TabsTrigger>
            <TabsTrigger 
              value="stad" 
              className="text-xs sm:text-sm py-2 sm:py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Städ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fruktkorgar" className="mt-6">
            <FruktkorgarTab selectedDays={selectedDays} currentDay={currentDay} orderType="onetime" isPublicPage={true} />
          </TabsContent>

          <TabsContent value="fruktpasar" className="mt-6">
            <FruktpaserTab selectedDays={selectedDays} currentDay={currentDay} orderType="onetime" isPublicPage={true} />
          </TabsContent>

          <TabsContent value="lask" className="mt-6">
            <LaskTab selectedDays={selectedDays} currentDay={currentDay} orderType="onetime" isPublicPage={true} />
          </TabsContent>

          <TabsContent value="mejeri" className="mt-6">
            <MejeriTab selectedDays={selectedDays} currentDay={currentDay} orderType="onetime" isPublicPage={true} />
          </TabsContent>

          <TabsContent value="kaffe" className="mt-6">
            <KaffeTeTab selectedDays={selectedDays} currentDay={currentDay} orderType="onetime" isPublicPage={true} />
          </TabsContent>

          <TabsContent value="frukost" className="mt-6">
            <FrukostTab selectedDays={selectedDays} currentDay={currentDay} orderType="onetime" isPublicPage={true} />
          </TabsContent>

          <TabsContent value="snacks" className="mt-6">
            <SnacksTab selectedDays={selectedDays} currentDay={currentDay} orderType="onetime" isPublicPage={true} />
          </TabsContent>

          <TabsContent value="annat" className="mt-6">
            <AnnatTab selectedDays={selectedDays} currentDay={currentDay} orderType="onetime" isPublicPage={true} />
          </TabsContent>

          <TabsContent value="gronsaker" className="mt-6">
            <GronsakerTab selectedDays={selectedDays} currentDay={currentDay} orderType="onetime" isPublicPage={true} />
          </TabsContent>

          <TabsContent value="stad" className="mt-6">
            <StadTab selectedDays={selectedDays} currentDay={currentDay} orderType="onetime" isPublicPage={true} />
          </TabsContent>
        </Tabs>

        {/* Cart Summary Section */}
        {items.length > 0 && (
          <div className="mt-12 sm:mt-16 bg-white rounded-xl p-6 sm:p-8 border-2 border-primary shadow-lg">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingCart className="h-7 w-7 text-primary" />
                  Din varukorg ({getTotalItems()} produkter)
                </h2>
                <Button
                  onClick={clearCart}
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                >
                  <X className="h-4 w-4 mr-1" />
                  Töm varukorg
                </Button>
              </div>
              
              <div className="space-y-6 mb-6 max-h-[400px] overflow-y-auto">
                {Object.entries(itemsByDay).map(([day, dayItems]) => (
                  <div key={day} className="mb-4 last:mb-0">
                    {dayItems.map((item) => (
                      <div key={`${item.id}-${item.day}-${item.size || ''}`} className="flex gap-4 pb-4 border-b last:border-b-0 mb-4 last:mb-0">
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
                              onClick={() => updateQuantity(item.id, item.quantity - 1, item.day, item.size)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-semibold w-12 text-center">{item.quantity} st</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1, item.day, item.size)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-auto text-destructive hover:text-destructive"
                              onClick={() => removeItem(item.id, item.day, item.size)}
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
                  onClick={() => navigate('/kontakt')}
                  size="lg"
                  className="w-full text-lg"
                >
                 <FileText className="h-5 w-5 mr-2" />
                   Skicka din beställning
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Sticky bottom bar */}
        {items.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t shadow-lg p-3 sm:p-4">
            <div className="container mx-auto flex items-center justify-between gap-4 max-w-4xl">
              <div className="flex items-center gap-2 text-sm sm:text-base">
                <ShoppingCart className="h-5 w-5 text-primary" />
                <span className="font-semibold">{getTotalItems()} produkter</span>
                <span className="text-muted-foreground hidden sm:inline">•</span>
                <span className="font-bold text-primary hidden sm:inline">{getTotalPrice()} kr</span>
              </div>
              <Button 
                onClick={() => navigate('/kontakt')}
                size="lg"
                className="text-sm sm:text-base"
              >
                <FileText className="h-4 w-4 mr-2" />
                Skicka din beställning
              </Button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Products;
