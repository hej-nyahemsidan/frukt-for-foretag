import Header from '@/components/Header';
import ContactSection from '@/components/ContactSection';
import QuoteRequestSection from '@/components/QuoteRequestSection';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { usePublicCart } from '@/contexts/PublicCartContext';

const Contact = () => {
  const { items } = usePublicCart();
  const hasCartItems = items.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead type="contact" />
      <Header />
      <main>
        {hasCartItems ? <QuoteRequestSection /> : <ContactSection />}
      </main>
      <Footer />
    </div>
  );
};

export default Contact;