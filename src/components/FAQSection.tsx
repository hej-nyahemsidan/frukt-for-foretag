import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

const FAQSection = () => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const faqItems = [
    {
      question: "Vart kommer frukten ifrån?",
      answer: "Vi samarbetar med certifierade leverantörer från hela Europa för att säkerställa högsta kvalitet på vår frukt. All frukt levereras färsk och genomgår kvalitetskontroller innan leverans."
    },
    {
      question: "Är frukten ekologisk?",
      answer: "Vi erbjuder både ekologisk och konventionell frukt. Alla våra produkter är tydligt märkta så att du enkelt kan välja det alternativ som passar dig bäst."
    },
    {
      question: "Hur paketeras frukten?",
      answer: "Vår frukt paketeras i miljövänliga förpackningar som håller frukten färsk under transport. Vi använder återvinningsbart material och minimerar förpackningsmängden."
    },
    {
      question: "Hur sker leveransen?",
      answer: "Vi levererar direkt till din arbetsplats varje vecka på en tid som passar er. Våra chaufförer ser till att frukten placeras på rätt plats och att allt ser bra ut."
    },
    {
      question: "Levererar ni till hela Sverige?",
      answer: "Ja, vi levererar till de flesta orter i Sverige. Kontakta oss för att bekräfta leverans till er specifika adress och få information om leveranstider."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleItem = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section ref={sectionRef} className="py-20 px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-800">
              Har du en fråga
            </h2>
            <p className="text-lg text-gray-600">
              Har du en fråga? Vi har svaret.
            </p>
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full">
              Kontakta Oss
            </Button>
          </div>

          {/* Right Column - FAQ Items */}
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className={`transform transition-all duration-700 ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="text-lg text-gray-800 font-medium">
                      {item.question}
                    </span>
                    <div className="flex-shrink-0 ml-4">
                      {expandedItems.includes(index) ? (
                        <Minus className="w-5 h-5 text-gray-600" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                  </button>
                  
                  <div 
                    className={`transition-all duration-300 ease-in-out ${
                      expandedItems.includes(index) 
                        ? 'max-h-96 opacity-100' 
                        : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                  >
                    <div className="px-6 pb-5 pt-0">
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-gray-600 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;