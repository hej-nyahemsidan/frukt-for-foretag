import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import FruktkorgarTab from '@/components/product-tabs/FruktkorgarTab';
import FruktpaserTab from '@/components/product-tabs/FruktpaserTab';
import LaskTab from '@/components/product-tabs/LaskTab';
import MejeriTab from '@/components/product-tabs/MejeriTab';
import KaffeTeTab from '@/components/product-tabs/KaffeTeTab';

interface ProductDisplayProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const ProductDisplay = ({ activeCategory, setActiveCategory }: ProductDisplayProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-charcoal">Välj produkter</h2>
            <a 
              href="/sortiment" 
              className="text-[#4CAF50] hover:text-[#45a049] font-medium text-sm"
            >
              Se hela sortimentet →
            </a>
          </div>
          
          <TabsContent value="fruktkorgar" className="mt-0">
            <FruktkorgarTab />
          </TabsContent>
          
          <TabsContent value="fruktpaser" className="mt-0">
            <FruktpaserTab />
          </TabsContent>
          
          <TabsContent value="lask" className="mt-0">
            <LaskTab />
          </TabsContent>
          
          <TabsContent value="mejeri" className="mt-0">
            <MejeriTab />
          </TabsContent>
          
          <TabsContent value="kaffe-te" className="mt-0">
            <KaffeTeTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ProductDisplay;