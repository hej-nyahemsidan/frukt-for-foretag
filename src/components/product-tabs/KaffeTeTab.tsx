import React from 'react';
import AddToCartButton from '@/components/AddToCartButton';
import gevaliaImage from '@/assets/gevalia-coffee.jpg';
import premiumCoffeeImage from '@/assets/premium-coffee.jpg';
import nescafeImage from '@/assets/nescafe.jpg';

interface KaffeTeTabProps {
  selectedDays: string[];
}

const kaffeTe = [
  { id: 'gevalia', name: 'Gevalia', price: 45, image: gevaliaImage },
  { id: 'arvid-nordkvist', name: 'Arvid Nordkvist', price: 42, image: premiumCoffeeImage },
  { id: 'nescafe-lyx', name: 'Nescafe Lyx', price: 38, image: nescafeImage }
];

const KaffeTeTab: React.FC<KaffeTeTabProps> = ({ selectedDays }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {kaffeTe.map((product) => (
        <div key={product.id} className="bg-lightgray rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="aspect-[3/4] bg-white p-4">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain rounded"
            />
          </div>
          <div className="p-3 space-y-3">
            <h3 className="font-medium text-charcoal text-sm text-center">{product.name}</h3>
            <p className="font-bold text-[#4CAF50] text-sm text-center">{product.price} kr</p>
            <AddToCartButton 
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                category: 'kaffe-te',
                image: product.image
              }}
              className="w-full text-xs px-2 py-1"
              showQuantitySelector={true}
              showSizeSelector={false}
              selectedDays={selectedDays}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default KaffeTeTab;