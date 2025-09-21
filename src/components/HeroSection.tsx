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

          {/* Right Side - Enhanced Animated Fruits */}
          <div className="relative h-[600px] lg:h-[700px]">
            {/* Orange 1 */}
            <div className="absolute top-16 left-12 animate-float-enhanced-1 text-6xl drop-shadow-lg">
              🍊
            </div>

            {/* Banana */}
            <div className="absolute top-32 right-16 animate-float-enhanced-2 text-7xl drop-shadow-lg">
              🍌
            </div>

            {/* Apple */}
            <div className="absolute top-48 left-20 animate-float-enhanced-3 text-6xl drop-shadow-lg">
              🍎
            </div>

            {/* Grapes */}
            <div className="absolute bottom-32 right-8 animate-float-enhanced-4 text-8xl drop-shadow-lg">
              🍇
            </div>

            {/* Strawberries */}
            <div className="absolute top-64 right-32 animate-float-enhanced-5 text-6xl drop-shadow-lg">
              🍓
            </div>

            {/* Kiwi */}
            <div className="absolute bottom-48 left-8 animate-float-enhanced-6 text-7xl drop-shadow-lg">
              🥝
            </div>

            {/* Pineapple slice */}
            <div className="absolute top-80 left-32 animate-float-enhanced-7 text-6xl drop-shadow-lg">
              🍍
            </div>

            {/* Cherries */}
            <div className="absolute bottom-64 right-20 animate-float-enhanced-8 text-7xl drop-shadow-lg">
              🍒
            </div>

            {/* Green Apple */}
            <div className="absolute top-96 right-4 animate-float-enhanced-9 text-8xl drop-shadow-lg">
              🍏
            </div>

            {/* Orange 2 */}
            <div className="absolute bottom-16 left-24 animate-float-enhanced-10 text-6xl drop-shadow-lg">
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