import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, Clock, Users } from 'lucide-react';
import fruitBox from '@/assets/fruit-box.jpg';
import seasonalFruits from '@/assets/seasonal-fruits.jpg';
import officeWellness from '@/assets/office-wellness.jpg';

const ProductShowcase = () => {
  const products = [
    {
      id: 'classic',
      name: 'Klassisk Fruktkorg',
      description: 'Vårt mest populära val med säsongens bästa frukter. Perfekt för medelstora företag.',
      image: fruitBox,
      price: 'Från 850 kr/vecka',
      features: ['8-12 personer', 'Blandade frukter', 'Leverans varje måndag'],
      badge: 'Mest Populär',
      badgeColor: 'bg-accent-orange/10 text-accent-orange border-accent-orange/20'
    },
    {
      id: 'seasonal',
      name: 'Säsongsfrukt Premium',
      description: 'Handplockade säsongsfrukter av högsta kvalitet. Exklusivt urval som varierar månadsvis.',
      image: seasonalFruits,
      price: 'Från 1 200 kr/vecka',
      features: ['12-20 personer', 'Säsongsfrukter', 'Premiumkvalitet'],
      badge: 'Premium',
      badgeColor: 'bg-primary/10 text-primary border-primary/20'
    },
    {
      id: 'wellness',
      name: 'Hälso & Wellness',
      description: 'Komplett hälsopaket med frukter, nötter och hälsosamma snacks för den moderna arbetsplatsen.',
      image: officeWellness,
      price: 'Från 950 kr/vecka',
      features: ['10-15 personer', 'Frukt + snacks', 'Näringsoptimerat'],
      badge: 'Ny!',
      badgeColor: 'bg-accent-green/10 text-accent-green border-accent-green/20'
    }
  ];

  return (
    <section id="products" className="section-padding bg-background">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="heading-lg text-foreground">
            Vårt Sortiment
          </h2>
          {/* Our Selection */}
          <p className="text-lead max-w-3xl mx-auto">
            Tre noggrant utformade paket som passar olika företagsstorlekar och behov. 
            Alla leveranser inkluderar färska, näringsrika frukter från pålitliga leverantörer.
          </p>
          {/* Three carefully designed packages that suit different company sizes and needs. All deliveries include fresh, nutritious fruits from reliable suppliers. */}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className="card-product group hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Product Image */}
              <div className="relative mb-6 overflow-hidden rounded-xl">
                <img
                  src={product.image}
                  alt={`${product.name} - professional fruit delivery for Swedish offices`}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {product.badge && (
                  <Badge className={`absolute top-4 left-4 ${product.badgeColor}`}>
                    {product.badge}
                  </Badge>
                )}
              </div>

              {/* Product Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="heading-md text-foreground mb-2">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="pt-4 border-t border-border">
                  <p className="text-lg font-semibold text-foreground mb-4">
                    {product.price}
                  </p>
                  
                  <Button className="w-full btn-secondary group">
                    Läs Mer
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    {/* Read More */}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center space-y-6 bg-muted/50 rounded-3xl p-8 lg:p-12">
          <div className="space-y-4">
            <h3 className="heading-md text-foreground">
              Osäker på vilket paket som passar er?
            </h3>
            {/* Unsure which package suits you? */}
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Vårt team hjälper gärna er att hitta den perfekta lösningen för ert företag. 
              Kontakta oss för en kostnadsfri konsultation.
            </p>
            {/* Our team is happy to help you find the perfect solution for your company. Contact us for a free consultation. */}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-hero">
              Boka Konsultation
              {/* Book Consultation */}
            </Button>
            <Button variant="outline" className="btn-secondary">
              Ring Oss: 08-123 45 67
              {/* Call Us: 08-123 45 67 */}
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 pt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-accent-yellow fill-current" />
              <span>4.8/5 kundbetyg</span>
              {/* 4.8/5 customer rating */}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Snabb uppsättning</span>
              {/* Quick setup */}
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-accent-green" />
              <span>500+ nöjda företag</span>
              {/* 500+ satisfied companies */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;