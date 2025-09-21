import React from 'react';
import AddToCartButton from '@/components/AddToCartButton';

const fruktpaser = [
  {
    id: 'fruktpase-extra',
    name: 'Fruktpåse Extra',
    image: '/src/assets/fresh-fruit-arrangements.jpg',
    price: 59
  },
  {
    id: 'bananpase-extra',
    name: 'Bananpåse Extra',
    image: '/src/assets/picnic-basket-fruits.jpg',
    price: 49
  }
];

const FruktpaserTab = () => {
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
          <div className="p-3 text-center space-y-2">
            <h3 className="font-medium text-charcoal text-sm">{product.name}</h3>
            <p className="font-bold text-[#4CAF50]">{product.price} kr</p>
            <AddToCartButton 
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                category: 'fruktpaser',
                image: product.image
              }}
              className="w-full text-xs px-2 py-1"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FruktpaserTab;