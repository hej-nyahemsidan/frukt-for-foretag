
import qualityGuaranteeFeature from '@/assets/premium-frukt-kvalitetsgaranti.jpg';
import officeWorkersFruit from '@/assets/medarbetare-fruktkorgar-kontor.jpg';
import freeDeliveryFeature from '@/assets/fri-leverans-fruktkorgar-stockholm.jpg';
import seasonalFruits from '@/assets/sasongs-frukt-fruktkorg.jpg';
import happyEmployees from '@/assets/glada-anstallda-fruktkorg-foretag.jpg';
import fruitTruck from '@/assets/fruktleverans-stockholm-hallbar.jpg';

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
      src: fruitTruck,
      alt: 'Miljövänlig fruktleverans med lastbil',
      badge: '🌱 Hållbart & miljövänligt'
    }
  ];

  return (
    <section className="bg-gradient-to-br from-[hsl(142_45%_28%)] via-[hsl(145_40%_34%)] to-[hsl(140_35%_26%)] py-20 sm:py-24 px-4 sm:px-8 overflow-hidden relative">
      {/* Decorative organic shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[hsl(28_85%_58%)]/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="space-y-12">
          {/* Heading */}
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Våra fördelar med frukt på jobbet Stockholm
            </h2>
          </div>

          {/* USP Boxes */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-400 hover:scale-[1.02] hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.3)] group">
              <div className="text-5xl mb-5 transform group-hover:scale-110 transition-transform duration-300">⚡</div>
              <h3 className="text-xl font-bold text-white mb-3 min-h-[56px]">
                Mer energi och bättre fokus
              </h3>
              <p className="text-white/85 text-sm leading-relaxed">
                Naturligt energitillskott som håller längre än kaffe och socker.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-400 hover:scale-[1.02] hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.3)] group">
              <div className="text-5xl mb-5 transform group-hover:scale-110 transition-transform duration-300">🍎</div>
              <h3 className="text-xl font-bold text-white mb-3 min-h-[56px]">
                Färsk frukt av hög kvalitet
              </h3>
              <p className="text-white/85 text-sm leading-relaxed">
                Vi levererar endast den fräschaste och mest smakrika frukten till våra kunder.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-400 hover:scale-[1.02] hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.3)] group">
              <div className="text-5xl mb-5 transform group-hover:scale-110 transition-transform duration-300">😊</div>
              <h3 className="text-xl font-bold text-white mb-3 min-h-[56px]">
                Nöjda kunder över hela Stockholm
              </h3>
              <p className="text-white/85 text-sm leading-relaxed">
                Företag över hela Stockholm litar på oss för att leverera färsk frukt varje vecka.
              </p>
            </div>
          </div>

          {/* Moving Images */}
          <div className="relative">
            <div className="features-carousel-container overflow-hidden rounded-3xl">
              <div className="features-carousel flex gap-6">
                {/* First set of images */}
                {featureImages.map((image, index) => (
                  <div key={`first-${index}`} className="features-card flex-shrink-0 relative group">
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="w-80 h-60 object-cover rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-white/95 backdrop-blur-sm text-foreground px-4 py-2.5 rounded-full text-sm font-semibold shadow-lg">
                        {image.badge}
                      </span>
                    </div>
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {featureImages.map((image, index) => (
                  <div key={`second-${index}`} className="features-card flex-shrink-0 relative group">
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="w-80 h-60 object-cover rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-white/95 backdrop-blur-sm text-foreground px-4 py-2.5 rounded-full text-sm font-semibold shadow-lg">
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