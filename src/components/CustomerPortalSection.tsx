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
    <section className="py-20 px-8 bg-gray-50">
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

        {/* Bouncing Fruits Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gray-100 h-48 mb-12 shadow-lg">
          {bouncingFruits.map((fruit) => (
            <div
              key={fruit.id}
              className={`absolute ${fruit.animationClass} ${fruit.size}`}
              style={{
                top: fruit.position.top,
                left: fruit.position.left,
                zIndex: fruit.zIndex,
                opacity: fruit.opacity,
              }}
            >
              {fruit.emoji}
            </div>
          ))}
        </div>

        {/* Call-to-Action */}
        <div className="text-center">
          <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-lg inline-flex items-center gap-3">
            Kundportalen
            <ExternalLink className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CustomerPortalSection;