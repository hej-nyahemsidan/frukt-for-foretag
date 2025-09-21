import React from 'react';

const fruktkorgar = [
  {
    id: 1,
    name: 'Fruktkorg Premium',
    image: '/src/assets/fruktkorg-premium.jpg'
  },
  {
    id: 2,
    name: 'Fruktkorg Supreme',
    image: '/src/assets/fruktkorg-standard.jpg'
  },
  {
    id: 3,
    name: 'Fruktkorg Original',
    image: '/src/assets/fruktkorg-eko.jpg'
  },
  {
    id: 4,
    name: 'Fruktkorg Banan Plus',
    image: '/src/assets/fruktkorg-banan.jpg'
  },
  {
    id: 5,
    name: 'Fruktkorg Bas',
    image: '/src/assets/fruit-box.jpg'
  }
];

const FruktkorgarTab = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {fruktkorgar.map((product) => (
        <div key={product.id} className="bg-lightgray rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="aspect-[3/4] bg-white p-4">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className="p-3 text-center">
            <h3 className="font-medium text-charcoal text-sm">{product.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FruktkorgarTab;