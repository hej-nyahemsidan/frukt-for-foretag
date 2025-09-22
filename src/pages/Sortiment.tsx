import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OrderSidebar from '@/components/OrderSidebar';
import ProductDisplay from '@/components/ProductDisplay';
import { useAuth } from '@/contexts/AuthContext';

const Sortiment = () => {
  const [packagePlan, setPackagePlan] = useState('weekly');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('fruktpaser');
  const { user, customer } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-charcoal mb-2">
            Beställ Fruktkorg
          </h1>
          {user && customer ? (
            <p className="text-muted-foreground">
              Välkommen tillbaka, {customer.contact_person} från {customer.company_name}
            </p>
          ) : (
            <p className="text-muted-foreground">
              Välkommen! Du kan beställa som gäst eller <a href="/kundportal" className="text-primary hover:underline">logga in</a> för att spara dina uppgifter.
            </p>
          )}
        </div>
        
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