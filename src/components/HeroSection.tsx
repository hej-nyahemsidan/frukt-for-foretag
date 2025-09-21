import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 min-h-screen flex items-center py-20 px-8">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8 z-10">
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

          {/* Right Side - Fruits Floating from Basket */}
          <div className="relative h-[600px] lg:h-[700px]">
            {/* Fruit Basket - Anchor Point */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-basket-sway text-9xl drop-shadow-xl z-10">
              🧺
            </div>

            {/* Fruits floating up from basket in layers */}
            
            {/* Layer 1 - Close to basket */}
            <div className="absolute bottom-24 left-1/2 transform -translate-x-8 animate-float-from-basket-1 text-6xl drop-shadow-lg">
              🍊
            </div>
            
            <div className="absolute bottom-28 left-1/2 transform translate-x-4 animate-float-from-basket-2 text-7xl drop-shadow-lg">
              🍎
            </div>

            {/* Layer 2 - Medium height */}
            <div className="absolute bottom-40 left-1/2 transform -translate-x-16 animate-float-from-basket-3 text-6xl drop-shadow-lg">
              🍌
            </div>

            <div className="absolute bottom-36 left-1/2 transform translate-x-12 animate-float-from-basket-4 text-7xl drop-shadow-lg">
              🍓
            </div>

            <div className="absolute bottom-44 left-1/2 transform translate-x-0 animate-float-from-basket-5 text-6xl drop-shadow-lg">
              🥝
            </div>

            {/* Layer 3 - Higher up */}
            <div className="absolute bottom-56 left-1/2 transform -translate-x-24 animate-float-from-basket-6 text-8xl drop-shadow-lg">
              🍇
            </div>

            <div className="absolute bottom-60 left-1/2 transform translate-x-20 animate-float-from-basket-7 text-6xl drop-shadow-lg">
              🍍
            </div>

            <div className="absolute bottom-52 left-1/2 transform -translate-x-6 animate-float-from-basket-8 text-7xl drop-shadow-lg">
              🍒
            </div>

            {/* Layer 4 - Highest level */}
            <div className="absolute bottom-72 left-1/2 transform translate-x-16 animate-float-from-basket-9 text-8xl drop-shadow-lg">
              🍏
            </div>

            <div className="absolute bottom-68 left-1/2 transform -translate-x-20 animate-float-from-basket-10 text-6xl drop-shadow-lg">
              🍊
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