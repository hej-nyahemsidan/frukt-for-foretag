import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import SocialImpactSection from '@/components/SocialImpactSection';
import ProductShowcase from '@/components/ProductShowcase';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <SocialImpactSection />
        <ProductShowcase />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;