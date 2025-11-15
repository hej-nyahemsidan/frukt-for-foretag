
import qualityGuaranteeFeature from '@/assets/quality-guarantee-feature.jpg';
import officeWorkersFruit from '@/assets/office-workers-fruit.jpg';
import freeDeliveryFeature from '@/assets/free-delivery-feature.jpg';
import seasonalFruits from '@/assets/seasonal-fruits.jpg';
import happyEmployees from '@/assets/happy-employees.jpg';
import ecoMilk from '@/assets/eco-milk.jpg';

const FeaturesSection = () => {
  const featureImages = [
    {
      src: qualityGuaranteeFeature,
      alt: 'Högkvalitativa premium frukter med kvalitetsgaranti',
      badge: '🏆 100% Kvalitetsgaranti'
    },
    {
      src: officeWorkersFruit,
      alt: 'Kontorsanställda njuter av färska frukter',
      badge: '📅 Flexibla leveransalternativ'
    },
    {
      src: freeDeliveryFeature,
      alt: 'Färsk frukt levererad till ditt kontor i Stockholm',
      badge: '🚚 Fri leverans i Stockholm'
    },
    {
      src: seasonalFruits,
      alt: 'Färska säsongsfrukter',
      badge: '🍎 Färska frukter dagligen'
    },
    {
      src: happyEmployees,
      alt: 'Glada medarbetare på kontoret',
      badge: '💪 Ökar produktiviteten'
    },
    {
      src: ecoMilk,
      alt: 'Ekologiska produkter',
      badge: '🌱 Hållbart & miljövänligt'
    }
  ];

  return (
    <section className="bg-[#166534] py-20 sm:py-24 px-4 sm:px-8 overflow-hidden">
      <div className="container mx-auto">
        <div className="space-y-12">
          {/* Heading */}
          <div className="text-center">
            <h2 className="text-5xl font-bold text-white leading-tight">
              Våra fördelar med frukt på jobbet Stockholm
            </h2>
          </div>

          {/* USP Boxes */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-white mb-3 min-h-[56px]">
                Mer energi och bättre fokus
              </h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Naturligt energitillskott som håller längre än kaffe och socker.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl mb-4">🍎</div>
              <h3 className="text-xl font-bold text-white mb-3 min-h-[56px]">
                Färsk frukt av hög kvalitet
              </h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Vi levererar endast den fräschaste och mest smakrika frukten till våra kunder.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl mb-4">😊</div>
              <h3 className="text-xl font-bold text-white mb-3 min-h-[56px]">
                Nöjda kunder över hela Stockholm
              </h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Företag över hela Stockholm litar på oss för att leverera färsk frukt varje vecka.
              </p>
            </div>
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