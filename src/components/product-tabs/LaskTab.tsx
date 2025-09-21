import React from 'react';
import AddToCartButton from '@/components/AddToCartButton';

const lask = [
  { id: 'coca-cola', name: 'Coca Cola', price: 25 },
  { id: 'coca-cola-zero', name: 'Coca Cola Zero', price: 25 },
  { id: 'sprite', name: 'Sprite', price: 25 },
  { id: 'sprite-zero', name: 'Sprite Zero', price: 25 },
  { id: 'fanta-orange', name: 'Fanta Orange', price: 25 },
  { id: 'fanta-exotic', name: 'Fanta Exotic', price: 25 },
  { id: 'bonaqua-citron', name: 'Bonaqua Citron', price: 20 },
  { id: 'bonaqua-hallon', name: 'Bonaqua Hallon/Lime', price: 20 },
  { id: 'mer-paron', name: 'Mer Päron', price: 22 }
];

const LaskTab = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {lask.map((product) => (
        <div key={product.id} className="bg-lightgray rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="aspect-[3/4] bg-white p-4">
            <div className="w-full h-full bg-gradient-to-b from-blue-100 to-blue-200 rounded flex items-center justify-center">
              <span className="text-xs text-charcoal text-center px-2">{product.name}</span>
            </div>
          </div>
          <div className="p-3 text-center space-y-2">
            <h3 className="font-medium text-charcoal text-sm">{product.name}</h3>
            <p className="font-bold text-[#4CAF50]">{product.price} kr</p>
            <AddToCartButton 
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                category: 'lask'
              }}
              className="w-full text-xs px-2 py-1"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LaskTab;