import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

const FAQSection = () => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const faqItems = [
    {
      question: "Hur fungerar fruktkorgar på jobbet från Vitaminkorgen?",
      answer: "Vi levererar färska fruktkorgar direkt till ert kontor i Stockholm varje vecka. Ni väljer storlek och leveransdag, sedan sköter vi resten. Flexibla avtal som kan pausas vid semester."
    },
    {
      question: "Vilka områden levererar ni fruktkorgar till?",
      answer: "Vi levererar fruktkorgar på jobbet till hela Stockholmsområdet. Från city till förorterna – fri leverans överallt inom tullarna."
    },
    {
      question: "Kan vi få en provleverans av fruktkorg på kontoret?",
      answer: "Absolut! Testa våra fruktkorgar i två veckor helt gratis. Ingen bindningstid, inget krångel."
    },
    {
      question: "Hur mycket kostar fruktkorgar från Vitaminkorgen?",
      answer: "Priserna för våra fruktkorgar på jobbet börjar från 230 kr per vecka. Kontakta oss för en skräddarsydd offert baserad på antal medarbetare."
    },
    {
      question: "Kan man anpassa fruktkorgar efter allergier?",
      answer: "Självklart! Vi skapar skräddarsydda fruktkorgar där vi tar bort specifika frukter och ersätter dem med andra. Bara meddela oss vid beställning eller i kundportalen."
    },
    {
      question: "Hur anpassar ni utbudet efter säsongen?",
      answer: "Vi följer säsongerna och erbjuder alltid den fräschaste frukten som är i säsong. På vintern fokuserar vi på citrusfrukter och äpplen, på sommaren på bär och stenfrukter."
    },
    {
      question: "Vad är minsta beställning för fruktkorgar på jobbet?",
      answer: "Vår minsta leverans är en fruktkorg från 4kg per vecka. Detta räcker för cirka 15-20 personer beroende på konsumtion och passar perfekt för mindre kontor."
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