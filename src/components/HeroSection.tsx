import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Leaf, Truck, Users } from 'lucide-react';
import heroFruits from '@/assets/hero-fruits.jpg';

const HeroSection = () => {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Content */}
          <div className="space-y-8 animate-fade-up">
            {/* Campaign Badge */}
            <Badge className="bg-accent-green/10 text-accent-green border-accent-green/20 px-4 py-2 rounded-full">
              🎉 Specialerbjudande: 2 veckor gratis provperiod! {/* Special offer: 2 weeks free trial! */}
            </Badge>
            
            <div className="space-y-6">
              <h1 className="heading-xl text-foreground">
                Frisk frukt
                <span className="block text-primary">
                  till din arbetsplats
                </span>
                {/* Fresh fruit to your workplace */}
              </h1>
              
              <p className="text-lead max-w-2xl">
                Vi levererar näringsrik frukt direkt till ditt kontor. Sedan 1986 har vi hjälpt svenska företag att 
                skapa hälsosammare arbetsplatser med färska, handplockade frukter varje vecka.
                {/* We deliver nutritious fruit directly to your office. Since 1986, we have helped Swedish companies create healthier workplaces with fresh, hand-picked fruits every week. */}
              </p>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Ekologisk</p>
                  <p className="text-sm text-muted-foreground">Certifierad frukt</p>
                  {/* Organic - Certified fruit */}
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Leverans</p>
                  <p className="text-sm text-muted-foreground">Varje vecka</p>
                  {/* Delivery - Every week */}
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Flexibel</p>
                  <p className="text-sm text-muted-foreground">Ingen bindningstid</p>
                  {/* Flexible - No binding period */}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-hero text-lg px-8 py-4">
                Starta Gratis Provperiod
                {/* Start Free Trial */}
              </Button>
              <Button variant="outline" className="btn-secondary text-lg px-8 py-4">
                Se Vårt Sortiment
                {/* View Our Selection */}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                ✅ Över 500 nöjda företag
                {/* Over 500 satisfied companies */}
              </span>
              <span className="flex items-center gap-2">
                ✅ 35+ års erfarenhet
                {/* 35+ years of experience */}
              </span>
              <span className="flex items-center gap-2">
                ✅ Hållbar leverantörskedja
                {/* Sustainable supply chain */}
              </span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative lg:h-[600px] animate-float">
            <div className="relative h-full">
              <img
                src={heroFruits}
                alt="Fresh fruits for corporate delivery - colorful arrangement of apples, oranges, berries in modern office setting"
                className="w-full h-full object-cover rounded-3xl shadow-card"
              />
              
              {/* Floating Badge */}
              <div className="absolute top-6 right-6 bg-card/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-soft">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">1986</p>
                  <p className="text-xs text-muted-foreground">Grundat år</p>
                  {/* Founded in */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-green/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;