import React from 'react';
import AddToCartButton from '@/components/AddToCartButton';
import colaImage from '@/assets/coca-cola.jpg';
import colaZeroImage from '@/assets/coca-cola-zero.jpg';
import spriteImage from '@/assets/sprite.jpg';
import fantaImage from '@/assets/fanta-orange.jpg';
import bonaquaImage from '@/assets/bonaqua.jpg';
import softDrinksImage from '@/assets/soft-drinks-collection.jpg';

interface LaskTabProps {
  selectedDays: string[];
}

const lask = [
  { id: 'coca-cola', name: 'Coca Cola', price: 25, image: colaImage },
  { id: 'coca-cola-zero', name: 'Coca Cola Zero', price: 25, image: colaZeroImage },
  { id: 'sprite', name: 'Sprite', price: 25, image: spriteImage },
  { id: 'sprite-zero', name: 'Sprite Zero', price: 25, image: spriteImage },
  { id: 'fanta-orange', name: 'Fanta Orange', price: 25, image: fantaImage },
  { id: 'fanta-exotic', name: 'Fanta Exotic', price: 25, image: fantaImage },
  { id: 'bonaqua-citron', name: 'Bonaqua Citron', price: 20, image: bonaquaImage },
  { id: 'bonaqua-hallon', name: 'Bonaqua Hallon/Lime', price: 20, image: bonaquaImage },
  { id: 'mer-paron', name: 'Mer Päron', price: 22, image: softDrinksImage }
];

const LaskTab: React.FC<LaskTabProps> = ({ selectedDays }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {lask.map((product) => (
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