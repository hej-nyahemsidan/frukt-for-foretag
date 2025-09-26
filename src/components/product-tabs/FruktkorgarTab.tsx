import React from 'react';
import AddToCartButton from '@/components/AddToCartButton';
import fruktkorgrPremiumImg from '@/assets/fruktkorg-premium-updated.jpg';
import fruktkorgrSupremeImg from '@/assets/fruktkorg-eko-new.jpg';
import fruktkorgrOriginalImg from '@/assets/fruktkorg-standard-new.jpg';
import fruktkorgrBananImg from '@/assets/fruktkorg-banan-updated.jpg';
import fruktkorgrBasImg from '@/assets/fruktlada-new.jpg';

interface FruktkorgarTabProps {
  selectedDays: string[];
}

const fruktkorgar = [
  {
    id: 'frukt-premium',
    name: 'Fruktkorg Premium',
    image: fruktkorgrPremiumImg
  },
  {
    id: 'frukt-supreme',
    name: 'Fruktkorg Supreme',
    image: fruktkorgrSupremeImg
  },
  {
    id: 'frukt-original',
    name: 'Fruktkorg Original',
    image: fruktkorgrOriginalImg
  },
  {
    id: 'frukt-banan',
    name: 'Fruktkorg Banan Plus',
    image: fruktkorgrBananImg
  },
  {
    id: 'frukt-bas',
    name: 'Fruktkorg Bas',
    image: fruktkorgrBasImg
  }
];

const FruktkorgarTab: React.FC<FruktkorgarTabProps> = ({ selectedDays }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {fruktkorgar.map((product) => (
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
                category: 'fruktkorgar',
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

export default FruktkorgarTab;