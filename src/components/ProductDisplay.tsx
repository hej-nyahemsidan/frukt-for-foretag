import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import CartIndicator from '@/components/CartIndicator';
import FruktkorgarTab from '@/components/product-tabs/FruktkorgarTab';
import FruktpaserTab from '@/components/product-tabs/FruktpaserTab';
import LaskTab from '@/components/product-tabs/LaskTab';
import MejeriTab from '@/components/product-tabs/MejeriTab';
import KaffeTeTab from '@/components/product-tabs/KaffeTeTab';

interface ProductDisplayProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  selectedDays: string[];
}

const ProductDisplay = ({ activeCategory, setActiveCategory, selectedDays }: ProductDisplayProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Cart Indicator */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex justify-end">
          <CartIndicator />
        </div>
      </div>
      
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="w-full justify-start p-0 h-auto bg-transparent border-b rounded-none">
          <TabsTrigger 
            value="fruktkorgar" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white hover:bg-gray-100 px-6 py-4"
          >
            Fruktkorgar
          </TabsTrigger>
          <TabsTrigger 
            value="fruktpaser" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white hover:bg-gray-100 px-6 py-4"
          >
            Fruktpåsar
          </TabsTrigger>
          <TabsTrigger 
            value="lask" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white hover:bg-gray-100 px-6 py-4"
          >
            Läsk
          </TabsTrigger>
          <TabsTrigger 
            value="mejeri" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white hover:bg-gray-100 px-6 py-4"
          >
            Mejeri
          </TabsTrigger>
          <TabsTrigger 
            value="kaffe-te" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white hover:bg-gray-100 px-6 py-4"
          >
            Kaffe/Te
          </TabsTrigger>
        </TabsList>

        <div className="p-6">
          <TabsContent value="fruktkorgar" className="mt-0">
            <FruktkorgarTab selectedDays={selectedDays} />
          </TabsContent>
          
          <TabsContent value="fruktpaser" className="mt-0">
            <FruktpaserTab selectedDays={selectedDays} />
          </TabsContent>
          
          <TabsContent value="lask" className="mt-0">
            <LaskTab selectedDays={selectedDays} />
          </TabsContent>
          
          <TabsContent value="mejeri" className="mt-0">
            <MejeriTab selectedDays={selectedDays} />
          </TabsContent>
          
          <TabsContent value="kaffe-te" className="mt-0">
            <KaffeTeTab selectedDays={selectedDays} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ProductDisplay;