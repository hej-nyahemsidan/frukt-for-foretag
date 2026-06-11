import { Truck, MapPin, Leaf } from 'lucide-react';
import vanAsset from '@/assets/leveransbil-vitaminkorgen.png.asset.json';

const DeliveryVanSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-lightgreen/30">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-secondary uppercase tracking-wider mb-3">
              <Truck className="w-4 h-4" /> Vår leveransbil
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              Färska fruktkorgar – levererade med egen bil
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Vi kör ut till kontor i hela Stockholm med våra egna leveransbilar.
              Det betyder färskare frukt, säkrare leveranser och en personlig service –
              hela vägen från lager till lunchrum.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                <span className="text-charcoal">Leveranser måndag–fredag i hela Stockholm</span>
              </li>
              <li className="flex items-start gap-3">
                <Leaf className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                <span className="text-charcoal">Effektiva rutter för minskad miljöpåverkan</span>
              </li>
              <li className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                <span className="text-charcoal">Egna chaufförer – inga tredjepartsbud</span>
              </li>
            </ul>
          </div>
          <div className="order-1 md:order-2">
            <img
              src={vanAsset.url}
              alt="Vitaminkorgens leveransbil med fruktdesign som kör ut fruktkorgar till företag i Stockholm"
              className="w-full h-auto drop-shadow-2xl"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryVanSection;