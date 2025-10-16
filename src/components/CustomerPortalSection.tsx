
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
    <section className="py-20 sm:py-24 px-4 sm:px-8 bg-gray-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Text Content */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 max-w-4xl mx-auto mb-6">
            Enkel hantering av era fruktkorgar
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Som kund hos Vitaminkorgen får ni tillgång till vår smidiga kundportal 
            där ni enkelt kan pausa leveranser, ändra storlek på fruktkorgar eller 
            lägga till extra beställningar. Perfekt när ni har konferens och behöver 
            extra frukt, eller vill pausa under semestern.
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