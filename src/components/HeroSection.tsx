import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 min-h-screen flex items-center">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8 z-10">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight" style={{ color: '#2d4a3e' }}>
                Professionella fruktleveranser för framgångsrika företag
              </h1>
              
              <p className="text-lg text-gray-700 leading-relaxed max-w-xl">
                Fruktexperten levererar färska, näringsrika fruktkorgar direkt till ditt kontor sedan 2024. 
                Vårt mål är att förbättra välmåendet på arbetsplatsen med premium frukt av högsta kvalitet.
              </p>
            </div>

            {/* CTA Button */}
            <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg rounded-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105">
              Beställ Gratis Provkorg
            </Button>
          </div>

          {/* Right Side - Animated Fruits */}
          <div className="relative h-[600px] lg:h-[700px]">
            {/* Orange 1 */}
            <div className="absolute top-16 left-12 animate-float-1">
              <svg width="80" height="80" viewBox="0 0 80 80" className="drop-shadow-lg">
                <defs>
                  <radialGradient id="orangeGrad1" cx="0.3" cy="0.3" r="0.8">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="70%" stopColor="#ff8c00" />
                    <stop offset="100%" stopColor="#e6670a" />
                  </radialGradient>
                </defs>
                <circle cx="40" cy="40" r="35" fill="url(#orangeGrad1)" />
                <ellipse cx="40" cy="10" rx="8" ry="4" fill="#22c55e" />
                <rect x="38" y="6" width="4" height="8" fill="#8B4513" rx="2" />
              </svg>
            </div>

            {/* Banana */}
            <div className="absolute top-32 right-16 animate-float-2">
              <svg width="90" height="40" viewBox="0 0 90 40" className="drop-shadow-lg">
                <path d="M10 25 Q30 10, 50 15 Q70 20, 80 25 Q70 30, 50 25 Q30 30, 10 25" fill="#FFD700" stroke="#FFA500" strokeWidth="2" />
                <ellipse cx="8" cy="25" rx="3" ry="8" fill="#8B4513" />
              </svg>
            </div>

            {/* Apple */}
            <div className="absolute top-48 left-20 animate-float-3">
              <svg width="70" height="75" viewBox="0 0 70 75" className="drop-shadow-lg">
                <defs>
                  <radialGradient id="appleGrad" cx="0.3" cy="0.3" r="0.8">
                    <stop offset="0%" stopColor="#ff6b6b" />
                    <stop offset="70%" stopColor="#dc2626" />
                    <stop offset="100%" stopColor="#991b1b" />
                  </radialGradient>
                </defs>
                <ellipse cx="35" cy="45" rx="30" ry="25" fill="url(#appleGrad)" />
                <ellipse cx="35" cy="15" rx="6" ry="3" fill="#22c55e" />
                <rect x="33" y="10" width="4" height="8" fill="#8B4513" rx="2" />
              </svg>
            </div>

            {/* Grapes */}
            <div className="absolute bottom-32 right-8 animate-float-4">
              <svg width="60" height="80" viewBox="0 0 60 80" className="drop-shadow-lg">
                <defs>
                  <radialGradient id="grapeGrad" cx="0.3" cy="0.3" r="0.8">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="70%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#5b21b6" />
                  </radialGradient>
                </defs>
                {/* Grape cluster */}
                <circle cx="30" cy="20" r="8" fill="url(#grapeGrad)" />
                <circle cx="22" cy="28" r="8" fill="url(#grapeGrad)" />
                <circle cx="38" cy="28" r="8" fill="url(#grapeGrad)" />
                <circle cx="30" cy="36" r="8" fill="url(#grapeGrad)" />
                <circle cx="22" cy="44" r="8" fill="url(#grapeGrad)" />
                <circle cx="38" cy="44" r="8" fill="url(#grapeGrad)" />
                <circle cx="30" cy="52" r="8" fill="url(#grapeGrad)" />
                <ellipse cx="30" cy="8" rx="8" ry="4" fill="#22c55e" />
              </svg>
            </div>

            {/* Orange 2 */}
            <div className="absolute bottom-48 left-8 animate-float-5">
              <svg width="65" height="65" viewBox="0 0 65 65" className="drop-shadow-lg">
                <defs>
                  <radialGradient id="orangeGrad2" cx="0.3" cy="0.3" r="0.8">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="70%" stopColor="#ff8c00" />
                    <stop offset="100%" stopColor="#e6670a" />
                  </radialGradient>
                </defs>
                <circle cx="32" cy="32" r="28" fill="url(#orangeGrad2)" />
                <ellipse cx="32" cy="8" rx="6" ry="3" fill="#22c55e" />
                <rect x="30" y="5" width="4" height="6" fill="#8B4513" rx="2" />
              </svg>
            </div>

            {/* Green Apple */}
            <div className="absolute top-64 right-24 animate-float-6">
              <svg width="75" height="80" viewBox="0 0 75 80" className="drop-shadow-lg">
                <defs>
                  <radialGradient id="greenAppleGrad" cx="0.3" cy="0.3" r="0.8">
                    <stop offset="0%" stopColor="#84cc16" />
                    <stop offset="70%" stopColor="#65a30d" />
                    <stop offset="100%" stopColor="#365314" />
                  </radialGradient>
                </defs>
                <ellipse cx="37" cy="47" rx="32" ry="27" fill="url(#greenAppleGrad)" />
                <ellipse cx="37" cy="15" rx="7" ry="4" fill="#22c55e" />
                <rect x="35" y="10" width="4" height="8" fill="#8B4513" rx="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-300/20 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;