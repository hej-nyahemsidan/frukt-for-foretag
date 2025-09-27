
import deliveryBoxesImage from '@/assets/fruit-delivery-boxes.jpg';
import arrangementImage from '@/assets/fresh-fruit-arrangements.jpg';
import happyEmployeesImage from '@/assets/happy-employees.jpg';
import professionalDisplayImage from '@/assets/professional-fruit-display.jpg';
import freshFruitsArrangement2 from '@/assets/fresh-fruits-arrangement-2.jpg';

const FeaturesSection = () => {
  const featureImages = [
    {
      src: freshFruitsArrangement2,
      alt: 'Fresh fruit arrangement with copy space',
      badge: '🚚 Fri leverans i Stockholm'
    },
    {
      src: deliveryBoxesImage,
      alt: 'Premium fruit delivery boxes',
      badge: '🏆 100% Kvalitetsgaranti'
    },
    {
      src: arrangementImage,
      alt: 'Fresh fruit arrangements',
      badge: '📅 Flexibla leveransalternativ'
    },
    {
      src: happyEmployeesImage,
      alt: 'Happy employees eating fruit',
      badge: '🚚 Fri leverans i Stockholm'
    },
    {
      src: professionalDisplayImage,
      alt: 'Professional fruit display',
      badge: '🏆 100% Kvalitetsgaranti'
    }
  ];

  return (
    <section className="bg-[#166534] py-20 px-8 overflow-hidden">
      <div className="container mx-auto">
        <div className="space-y-12">
          {/* Text Content */}
          <div className="text-center space-y-6">
            <h2 className="text-5xl font-bold text-white leading-tight">
              Våra fördelar med fruktkorgar på jobbet
            </h2>
            
            <p className="text-xl text-white leading-relaxed max-w-3xl mx-auto">
              <strong>Mer energi och bättre fokus</strong> - Naturligt energitillskott som håller längre än kaffe och socker.<br/>
              <strong>Minskad sjukfrånvaro</strong> - Stärker immunförsvaret och minskar risken för förkylningar.<br/>
              <strong>Starkare arbetskultur</strong> - Skapar naturliga mötesplatser som bygger gemenskap och teamkänsla.
            </p>
          </div>

          {/* Moving Images */}
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