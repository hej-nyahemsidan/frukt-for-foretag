import { Button } from '@/components/ui/button';
import fruitPlatter2 from '@/assets/fruitplatter-2.jpg';

const HeroSection = () => {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="hero-background relative overflow-hidden min-h-[100vh] sm:min-h-[70vh] flex items-center py-8 sm:py-12 pt-24 sm:pt-28 md:pt-32"
    >
      {/* Background Image Container with Mobile Optimizations */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${fruitPlatter2})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundColor: '#f0f9ff',
        }}
      >
        {/* Enhanced Mobile Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/98 via-green-50/85 to-green-50/40 sm:bg-gradient-to-r sm:from-green-50/95 sm:via-green-50/70 sm:to-green-50/20"></div>
      </div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="lg:relative lg:h-[500px] flex items-center justify-center lg:justify-start">
          {/* Text Content - Centered on Mobile, Left-aligned on Desktop */}
          <div className="text-center lg:text-left space-y-6 sm:space-y-8 max-w-xl sm:max-w-2xl lg:max-w-lg lg:ml-8 lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] text-slate-800 drop-shadow-sm">
                Fruktkorgar på jobbet<br />
                <span className="text-secondary">som gör skillnad</span>
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-xl leading-relaxed text-slate-700 max-w-2xl mx-auto lg:mx-0 font-medium drop-shadow-sm">
                Vi levererar handplockade fruktkorgar direkt till ert kontor i Stockholm. 
                Sedan 2021 har vi försett över 150 företag med färsk energi och 
                bättre välmående.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start justify-center lg:justify-start">
                <Button 
                  asChild
                  className="w-full sm:w-auto bg-gradient-to-r from-secondary to-primary-light text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 font-semibold text-base sm:text-lg hover:scale-105"
                >
                  <a href="/offertforfragan">
                    🎉 Testa gratis i två veckor
                  </a>
                </Button>
                
                <Button 
                  onClick={scrollToProducts}
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-slate-600 text-slate-600 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full font-semibold hover:bg-slate-600 hover:text-white transition-all duration-300"
                >
                  Se våra produkter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated Background Pattern - Hidden on Mobile for Performance */}
      <div className="absolute inset-0 -z-10 hidden sm:block">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl animate-float-delayed"></div>
      </div>
    </section>
  );
};

export default HeroSection;