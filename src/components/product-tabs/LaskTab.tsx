import React from 'react';
import AddToCartButton from '@/components/AddToCartButton';
import colaOriginalImage from '@/assets/coca-cola-original.png';
import colaZeroImage from '@/assets/coca-cola-zero-new.png';
import fantaOrangeImage from '@/assets/fanta-orange-new.png';
import fantaExoticImage from '@/assets/fanta-exotic.png';
import prilLemonImage from '@/assets/pril-lemon-lime.png';
import prilZeroImage from '@/assets/pril-zero-sugar.png';
import bonaquaCitronImage from '@/assets/bonaqua-citron-new.png';
import bonaquaHallonImage from '@/assets/bonaqua-hallon-new.png';
import merParonImage from '@/assets/mer-paron-new.png';

interface LaskTabProps {
  selectedDays: string[];
}

const lask = [
  { id: 'coca-cola', name: 'Coca Cola Original', price: 25, image: colaOriginalImage },
  { id: 'coca-cola-zero', name: 'Coca Cola Zero Sugar', price: 25, image: colaZeroImage },
  { id: 'pril-lemon', name: 'Pril Lemon-Lime', price: 25, image: prilLemonImage },
  { id: 'pril-zero', name: 'Pril Zero Sugar', price: 25, image: prilZeroImage },
  { id: 'fanta-orange', name: 'Fanta Orange', price: 25, image: fantaOrangeImage },
  { id: 'fanta-exotic', name: 'Fanta Exotic', price: 25, image: fantaExoticImage },
  { id: 'bonaqua-citron', name: 'Bonaqua Citron/Lime', price: 20, image: bonaquaCitronImage },
  { id: 'bonaqua-hallon', name: 'Bonaqua Hallon/Lime', price: 20, image: bonaquaHallonImage },
  { id: 'mer-paron', name: 'MER Päron', price: 22, image: merParonImage }
];

const LaskTab: React.FC<LaskTabProps> = ({ selectedDays }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {lask.map((product) => (
        <div key={product.id} className="bg-lightgray rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="aspect-[3/4] bg-white overflow-hidden">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-3 space-y-3">
            <h3 className="font-medium text-charcoal text-sm text-center">{product.name}</h3>
            <AddToCartButton 
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                category: 'lask',
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

export default LaskTab;