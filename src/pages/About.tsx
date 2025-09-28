
import Header from '@/components/Header';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead type="about" />
      <Header />
      <main>
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default About;