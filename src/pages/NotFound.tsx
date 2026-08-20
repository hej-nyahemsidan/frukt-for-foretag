import { Link } from "react-router-dom";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Sidan hittades inte | Vitaminkorgen"
        description="Sidan du letar efter kunde inte hittas. Gå tillbaka till startsidan eller se våra fruktkorgar."
        type="minimal"
        noindex={true}
      />
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center py-24">
          <p className="mb-2 text-5xl font-bold text-primary">404</p>
          <h1 className="mb-4 text-3xl font-bold">Sidan hittades inte</h1>
          <p className="mb-6 text-lg text-muted-foreground">
            Sidan du letar efter finns inte längre. Prova någon av länkarna nedan.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/" className="text-primary underline hover:text-primary/80 transition-colors">
              Till startsidan
            </Link>
            <Link to="/produkter" className="text-primary underline hover:text-primary/80 transition-colors">
              Se våra fruktkorgar
            </Link>
            <Link to="/kontakt" className="text-primary underline hover:text-primary/80 transition-colors">
              Kontakta oss
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
