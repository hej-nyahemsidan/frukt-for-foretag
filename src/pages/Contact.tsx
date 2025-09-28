
import Header from '@/components/Header';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead type="contact" />
      <Header />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;