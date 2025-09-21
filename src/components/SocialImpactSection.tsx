import React from 'react';
import { Heart, Users, Leaf } from 'lucide-react';

const SocialImpactSection = () => {
  return (
    <section className="bg-muted/50 section-padding">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-soft">
              <Heart className="w-5 h-5 text-accent-red" />
              <span className="text-sm font-medium text-foreground">Socialt Ansvar</span>
              {/* Social Responsibility */}
            </div>
            
            <h2 className="heading-lg text-foreground">
              Tillsammans gör vi skillnad
            </h2>
            {/* Together we make a difference */}
            
            <p className="text-lead max-w-3xl mx-auto">
              För varje beställning donerar vi frukt till lokala välgörenhetsorganisationer. 
              Sedan start har vi delat över 50 000 fruktportioner med behövande familjer.
            </p>
            {/* For every order, we donate fruit to local charities. Since launch, we have shared over 50,000 fruit portions with families in need. */}
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-card transition-all duration-300">
              <div className="w-16 h-16 bg-accent-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-accent-red" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">50 000+</h3>
              <p className="text-muted-foreground">
                Donerade fruktportioner
              </p>
              {/* Donated fruit portions */}
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-card transition-all duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">25</h3>
              <p className="text-muted-foreground">
                Partnerorganisationer
              </p>
              {/* Partner organizations */}
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-card transition-all duration-300">
              <div className="w-16 h-16 bg-accent-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-accent-green" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">100%</h3>
              <p className="text-muted-foreground">
                Hållbart odlade frukter
              </p>
              {/* Sustainably grown fruits */}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
            <h3 className="heading-md text-foreground mb-4">
              Bli en del av förändringen
            </h3>
            {/* Be part of the change */}
            <p className="text-muted-foreground mb-6">
              När ditt företag beställer från oss hjälper ni automatiskt lokala familjer. 
              Tillsammans kan vi skapa en hälsosammare och mer rättvis värld.
            </p>
            {/* When your company orders from us, you automatically help local families. Together we can create a healthier and more just world. */}
            <div className="inline-flex items-center gap-2 text-primary font-medium">
              <span>Läs mer om vårt välgörenhetsarbete</span>
              {/* Read more about our charity work */}
              <Heart className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialImpactSection;