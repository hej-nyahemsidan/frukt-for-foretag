import React from 'react';
import officeWorkersImage from '@/assets/office-workers-fruit.jpg';
import deliveryBoxesImage from '@/assets/fruit-delivery-boxes.jpg';
import arrangementImage from '@/assets/fresh-fruit-arrangements.jpg';
import happyEmployeesImage from '@/assets/happy-employees.jpg';
import professionalDisplayImage from '@/assets/professional-fruit-display.jpg';

const FeaturesSection = () => {
  const featureImages = [
    {
      src: officeWorkersImage,
      alt: 'Office workers enjoying fresh fruit',
      badge: '🔒 Ingen Bindningstid'
    },
    {
      src: deliveryBoxesImage,
      alt: 'Premium fruit delivery boxes',
      badge: '📱 Hantera via appen'
    },
    {
      src: arrangementImage,
      alt: 'Fresh fruit arrangements',
      badge: '⭐ 98% nöjda kunder'
    },
    {
      src: happyEmployeesImage,
      alt: 'Happy employees eating fruit',
      badge: '🚚 Leverans varje vecka'
    },
    {
      src: professionalDisplayImage,
      alt: 'Professional fruit display',
      badge: '🔒 Ingen Bindningstid'
    }
  ];

  return (
    <section className="bg-[#166534] py-20 px-8 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <h2 className="text-5xl font-bold text-white leading-tight">
              Kvalitet som levererar resultat
            </h2>
            
            <p className="text-xl text-white leading-relaxed">
              Vi levererar endast premium frukt från certifierade leverantörer – våra kunder får den kvalitet och service som skapar nöjda medarbetare.
            </p>
          </div>

          {/* Right Column - Moving Images */}
          <div className="relative">
            <div className="features-carousel-container overflow-hidden rounded-xl">
              <div className="features-carousel flex gap-6">
                {/* First set of images */}
                {featureImages.map((image, index) => (
                  <div key={`first-${index}`} className="features-card flex-shrink-0 relative">
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="w-80 h-60 object-cover rounded-xl shadow-lg"
                    />
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-white text-slate-800 px-4 py-2 rounded-full text-sm font-medium shadow-md">
                        {image.badge}
                      </span>
                    </div>
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {featureImages.map((image, index) => (
                  <div key={`second-${index}`} className="features-card flex-shrink-0 relative">
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="w-80 h-60 object-cover rounded-xl shadow-lg"
                    />
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-white text-slate-800 px-4 py-2 rounded-full text-sm font-medium shadow-md">
                        {image.badge}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;