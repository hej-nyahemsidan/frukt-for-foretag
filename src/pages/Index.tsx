
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CustomerReviewsSection from '@/components/CustomerReviewsSection';
import FeaturesSection from '@/components/FeaturesSection';
import ProductShowcase from '@/components/ProductShowcase';
import CustomerPortalSection from '@/components/CustomerPortalSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import PromoPopup from '@/components/PromoPopup';
import SEOHead from '@/components/SEOHead';
import { usePromoPopup } from '@/hooks/usePromoPopup';

const Index = () => {
  const { isOpen, closePopup } = usePromoPopup();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead type="homepage" />
      <Header />
      <main className="space-y-0">
        <HeroSection />
        <CustomerReviewsSection />
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