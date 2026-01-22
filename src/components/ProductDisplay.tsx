
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import CartIndicator from '@/components/CartIndicator';
import FruktkorgarTab from '@/components/product-tabs/FruktkorgarTab';
import FruktpaserTab from '@/components/product-tabs/FruktpaserTab';
import LaskTab from '@/components/product-tabs/LaskTab';
import MejeriTab from '@/components/product-tabs/MejeriTab';
import KaffeTeTab from '@/components/product-tabs/KaffeTeTab';
import AnnatTab from '@/components/product-tabs/AnnatTab';
import GronsakerTab from '@/components/product-tabs/GronsakerTab';
import StadTab from '@/components/product-tabs/StadTab';
import FrukostTab from '@/components/product-tabs/FrukostTab';
import SnacksTab from '@/components/product-tabs/SnacksTab';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProductDisplayProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  selectedDays: string[];
  currentDay: string;
  orderType: string;
  onCheckout?: () => void;
}

const ProductDisplay = ({ activeCategory, setActiveCategory, selectedDays, currentDay, orderType, onCheckout }: ProductDisplayProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Cart Indicator */}
      <div className="p-3 sm:p-4 border-b bg-gray-50">
        <div className="flex justify-between sm:justify-end items-center">
          {isMobile && (
            <h2 className="text-sm font-medium text-charcoal">Produkter</h2>
          )}
          <CartIndicator orderType={orderType} onCheckout={onCheckout} />
        </div>
      </div>
      
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="w-full min-w-max sm:min-w-0 justify-start p-0 h-auto bg-transparent border-b rounded-none">
            <TabsTrigger 
              value="fruktkorgar" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white hover:bg-gray-100 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap"
            >
              Fruktkorgar
            </TabsTrigger>
            <TabsTrigger 
              value="fruktpaser" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white hover:bg-gray-100 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap"
            >
              Fruktpåsar
            </TabsTrigger>
            <TabsTrigger 
              value="lask" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white hover:bg-gray-100 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap"
            >
              Läsk
            </TabsTrigger>
            <TabsTrigger 
              value="mejeri" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white hover:bg-gray-100 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap"
            >
              Mejeri
            </TabsTrigger>
            <TabsTrigger 
              value="kaffe-te" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white hover:bg-gray-100 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap"
            >
              Kaffe/Te
            </TabsTrigger>
            <TabsTrigger 
              value="annat" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white hover:bg-gray-100 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap"
            >
              Skafferi
            </TabsTrigger>
            <TabsTrigger 
              value="gronsaker" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white hover:bg-gray-100 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap"
            >
              Grönsaker
            </TabsTrigger>
            <TabsTrigger 
              value="stad" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white hover:bg-gray-100 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap"
            >
              Städ
            </TabsTrigger>
            <TabsTrigger 
              value="frukost" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white hover:bg-gray-100 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap"
            >
              Frukost & mellanmål
            </TabsTrigger>
            <TabsTrigger 
              value="snacks" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white hover:bg-gray-100 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap"
            >
              Snacks
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-4 sm:p-6">
          <TabsContent value="fruktkorgar" className="mt-0">
            <FruktkorgarTab selectedDays={selectedDays} currentDay={currentDay} orderType={orderType} />
          </TabsContent>
          
          <TabsContent value="fruktpaser" className="mt-0">
            <FruktpaserTab selectedDays={selectedDays} currentDay={currentDay} orderType={orderType} />
          </TabsContent>
          
          <TabsContent value="lask" className="mt-0">
            <LaskTab selectedDays={selectedDays} currentDay={currentDay} orderType={orderType} />
          </TabsContent>
          
          <TabsContent value="mejeri" className="mt-0">
            <MejeriTab selectedDays={selectedDays} currentDay={currentDay} orderType={orderType} />
          </TabsContent>
          
          <TabsContent value="kaffe-te" className="mt-0">
            <KaffeTeTab selectedDays={selectedDays} currentDay={currentDay} orderType={orderType} />
          </TabsContent>
          
          <TabsContent value="annat" className="mt-0">
            <AnnatTab selectedDays={selectedDays} currentDay={currentDay} orderType={orderType} />
          </TabsContent>
          
          <TabsContent value="gronsaker" className="mt-0">
            <GronsakerTab selectedDays={selectedDays} currentDay={currentDay} orderType={orderType} />
          </TabsContent>
          
          <TabsContent value="stad" className="mt-0">
            <StadTab selectedDays={selectedDays} currentDay={currentDay} orderType={orderType} />
          </TabsContent>
          
          <TabsContent value="frukost" className="mt-0">
            <FrukostTab selectedDays={selectedDays} currentDay={currentDay} orderType={orderType} />
          </TabsContent>
          
          <TabsContent value="snacks" className="mt-0">
            <SnacksTab selectedDays={selectedDays} currentDay={currentDay} orderType={orderType} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ProductDisplay;