import React from 'react';
import { Button } from '@/components/ui/button';
import picnicBasket from '@/assets/picnic-basket-fruits.jpg';

const HeroSection = () => {
  return (
    <section id="home" className="hero-background relative overflow-hidden min-h-[70vh] flex items-center py-12 px-8">
      {/* Gradient Fade Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-50/95 via-green-50/70 to-green-50/20" style={{
        background: 'linear-gradient(to right, rgba(240,253,244,0.95) 0%, rgba(240,253,244,0.7) 40%, rgba(240,253,244,0.2) 70%, transparent 100%)'
      }}></div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8 relative">
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-7xl xl:text-8xl font-black leading-tight text-slate-800 shadow-sm max-w-2xl">
                Experterna på företagsfrukt som levererar resultat
              </h1>
              
              <p className="text-xl leading-relaxed text-slate-600 max-w-2xl">
                Vi levererar handplockade fruktkorgar direkt till svenska företag varje vecka. 
                Sedan 2024 har vi hjälpt över 500 företag att öka välmående och produktivitet genom premium frukt av världsklass.
              </p>
              
              {/* Trust Indicator */}
              <div className="flex items-center text-emerald-600 font-medium">
                ✓ Över 10,000 nöjda medarbetare
              </div>
            </div>

            {/* CTA Button */}
            <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 text-lg rounded-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2">
              🧺 Beställ Gratis Provkorg
            </Button>
          </div>

          {/* Right Side - Empty space for background image */}
          <div className="relative h-[600px] lg:h-[700px]">
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