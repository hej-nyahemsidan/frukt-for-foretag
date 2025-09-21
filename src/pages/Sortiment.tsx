import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OrderSidebar from '@/components/OrderSidebar';
import ProductDisplay from '@/components/ProductDisplay';

const Sortiment = () => {
  const [packagePlan, setPackagePlan] = useState('weekly');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('fruktpaser');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-charcoal text-center mb-8">
          Beställ
        </h1>
        
        <div className="flex gap-8">
          {/* Left Sidebar - 30% width */}
          <div className="w-[30%]">
            <OrderSidebar 
              packagePlan={packagePlan}
              setPackagePlan={setPackagePlan}
              selectedDays={selectedDays}
              setSelectedDays={setSelectedDays}
            />
          </div>
          
          {/* Right Main Area - 70% width */}
          <div className="w-[70%]">
            <ProductDisplay 
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sortiment;