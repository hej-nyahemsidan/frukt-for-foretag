import React from 'react';

const fruktpaser = [
  {
    id: 1,
    name: 'Fruktpåse Extra',
    image: '/src/assets/fresh-fruit-arrangements.jpg'
  },
  {
    id: 2,
    name: 'Bananpåse Extra',
    image: '/src/assets/picnic-basket-fruits.jpg'
  }
];

const FruktpaserTab = () => {
  return (
    <div className="grid grid-cols-2 gap-6 max-w-2xl">
      {fruktpaser.map((product) => (
        <div key={product.id} className="bg-lightgray rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="aspect-square bg-white p-4">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className="p-4 text-center">
            <h3 className="font-semibold text-charcoal">{product.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FruktpaserTab;