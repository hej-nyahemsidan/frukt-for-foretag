import { Button } from '@/components/ui/button';
import fruitPlatter2 from '@/assets/hero-fruit-platter.jpg';

const HeroSection = () => {
  return (
    <section 
      id="home" 
      className="hero-background relative overflow-hidden min-h-[60vh] sm:min-h-[70vh] flex items-center py-16 sm:py-20 pt-24 sm:pt-28 md:pt-32"
    >
      {/* Background Image Container with Proper Clipping */}
      <div 
        className="absolute inset-0 w-full h-full animate-moveBasketHorizontal"
        style={{
          backgroundImage: `url(${fruitPlatter2})`,
          backgroundSize: '200% auto',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: '0% center',
          backgroundColor: '#f0f9ff',
        }}
      >
        {/* Gradient Fade Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-50/95 via-green-50/70 to-green-50/20" style={{
          background: 'linear-gradient(to right, rgba(240,253,244,0.95) 0%, rgba(240,253,244,0.7) 40%, rgba(240,253,244,0.2) 70%, transparent 100%)'
        }}></div>
      </div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="lg:relative lg:h-[500px]">
          {/* Left Side - Text Content */}
          <div className="space-y-4 sm:space-y-6 max-w-md sm:max-w-lg lg:max-w-lg lg:ml-8 lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight text-slate-800 shadow-sm">
                Fruktkorgar på jobbet<br />
                som gör skillnad
              </h1>
              
              <p className="text-base sm:text-lg leading-relaxed text-slate-600 max-w-lg">
                Vi levererar noggrant utvalda fruktkorgar av högsta kvalitet direkt till ert kontor i Stockholm. Med färska frukter och personlig service hjälper vi företag att främja energi, fokus och välmående på arbetsplatsen. Våra nöjda kunder uppskattar vår pålitlighet, höga standard och smidiga leveranser – varje vecka.
              </p>
              
              {/* Promotional Button */}
              <Button 
                asChild
                className="bg-gradient-to-r from-secondary to-primary-light text-white px-4 sm:px-6 py-3 sm:py-4 rounded-full shadow-lg animate-float hover:shadow-xl transition-shadow border-0 font-semibold text-sm sm:text-base"
              >
                <a href="/offertforfragan" className="flex items-center justify-center gap-2">
                  <span>🎉</span>
                  <span>Beställ en gratis provkorg</span>
                </a>
              </Button>
              
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;