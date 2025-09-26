import React from 'react';
import { Button } from '@/components/ui/button';
import picnicBasket from '@/assets/picnic-basket-fruits.jpg';

const HeroSection = () => {
  return (
    <section 
      id="home" 
      className="hero-background relative overflow-hidden min-h-[70vh] flex items-center py-12"
      style={{
        backgroundImage: `url(${picnicBasket})`,
        backgroundSize: '150% auto',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0% center',
        backgroundAttachment: 'scroll',
        backgroundColor: '#f0f9ff', // Fallback background color
        animation: 'moveBasket 25s ease-in-out infinite'
      }}
    >
      {/* Gradient Fade Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-50/95 via-green-50/70 to-green-50/20" style={{
        background: 'linear-gradient(to right, rgba(240,253,244,0.95) 0%, rgba(240,253,244,0.7) 40%, rgba(240,253,244,0.2) 70%, transparent 100%)'
      }}></div>
      
      <div className="relative z-10 w-full">
        <div className="lg:relative lg:h-[500px]">
          {/* Left Side - Text Content */}
          <div className="space-y-6 max-w-md pl-4 lg:max-w-lg lg:pl-0 lg:ml-8 lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black leading-tight text-slate-800 shadow-sm">
                Fruktkorgar på jobbet<br />
                som gör skillnad
              </h1>
              
              <p className="text-lg leading-relaxed text-slate-600 max-w-lg">
                Vi levererar handplockade fruktkorgar direkt till ert kontor i Stockholm. 
                Sedan 2024 har vi försett över 500 företag med färsk energi, ökad produktivitet och 
                bättre välmående genom våra premiumprodukter.
              </p>
              
              {/* Promotional Button */}
              <Button 
                asChild
                className="inline-block bg-gradient-to-r from-secondary to-primary-light text-white px-6 py-3 rounded-full shadow-lg animate-float hover:shadow-xl transition-shadow border-0 font-semibold"
              >
                <a href="/offertforfragan">
                  🎉 Testa fruktkorgar i två veckor gratis
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