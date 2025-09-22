import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const CustomerPortalSection = () => {
  // Generate 100 fruit emojis
  const fruits = ['🍎', '🍌', '🍊', '🍇', '🍓', '🥝', '🍑', '🍒', '🥭', '🍍'];
  const bouncingFruits = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    emoji: fruits[i % fruits.length],
    animationClass: `animate-float-enhanced-${(i % 10) + 1}`,
    size: `text-${['lg', 'xl', '2xl', '3xl'][i % 4]}`,
    position: {
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 90 + 5}%`,
    },
    zIndex: Math.floor(Math.random() * 30) + 1, // Random z-index from 1-30
    opacity: Math.random() * 0.4 + 0.6, // Random opacity between 0.6-1.0
  }));

  return (
    <section className="py-20 px-8 bg-gray-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Text Content */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 max-w-4xl mx-auto mb-6">
            Hantera dina fruktleveranser enkelt med vår smidiga kundportal
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Med vår kundportal kan du enkelt logga in och hantera din prenumeration och leveranser. 
            Du kan ändra, avboka och lägga till leveranser från fruktbud, på ett enkelt och smidigt sätt.
          </p>
        </div>

        {/* Call-to-Action */}
        <div className="text-center">
          <Button 
            asChild
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-lg inline-flex items-center gap-3"
          >
            <a href="/kundportal">
              Kundportalen
              <ExternalLink className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CustomerPortalSection;