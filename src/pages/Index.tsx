import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import ProductShowcase from '@/components/ProductShowcase';
import CustomerPortalSection from '@/components/CustomerPortalSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import PromoPopup from '@/components/PromoPopup';
import { usePromoPopup } from '@/hooks/usePromoPopup';

const Index = () => {
  const { isOpen, closePopup } = usePromoPopup();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ProductShowcase />
        <CustomerPortalSection />
        <FAQSection />
      </main>
      <Footer />
      <PromoPopup isOpen={isOpen} onClose={closePopup} />
    </div>
  );
};

export default Index;