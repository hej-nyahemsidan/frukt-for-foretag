import React from 'react';
import AddToCartButton from '@/components/AddToCartButton';
import fruktpaseImage from '@/assets/fruktpase-new.jpg';

interface FruktpaserTabProps {
  selectedDays: string[];
}

const fruktpaser = [
  {
    id: 'fruktpase-extra',
    name: 'Fruktpåse Extra',
    image: fruktpaseImage
  },
  {
    id: 'bananpase-extra',
    name: 'Bananpåse Extra',
    image: fruktpaseImage
  }
];

const FruktpaserTab: React.FC<FruktpaserTabProps> = ({ selectedDays }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {fruktpaser.map((product) => (
        <div key={product.id} className="bg-lightgray rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="aspect-[3/4] bg-white p-4">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className="p-3 space-y-3">
            <h3 className="font-medium text-charcoal text-sm text-center">{product.name}</h3>
            <AddToCartButton 
              product={{
                id: product.id,
                name: product.name,
                category: 'fruktpaser',
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

export default FruktpaserTab;