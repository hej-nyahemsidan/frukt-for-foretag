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
    <div className="grid grid-cols-2 gap-6">
      {fruktkorgar.map((product, index) => (
        <div 
          key={product.id} 
          className={`bg-lightgray rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
            index === 4 ? 'col-span-2 max-w-sm mx-auto' : ''
          }`}
        >
          <div className="aspect-square bg-white p-4">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className="p-4 text-center">
            <h3 className="font-semibold text-charcoal mb-2">{product.name}</h3>
            <a 
              href="#" 
              className="text-secondary hover:text-secondary/80 text-sm font-medium"
            >
              Läs mer
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FruktkorgarTab;