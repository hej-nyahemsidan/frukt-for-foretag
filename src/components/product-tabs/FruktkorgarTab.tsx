import React from 'react';
import AddToCartButton from '@/components/AddToCartButton';
import fruktkorgrPremiumImg from '@/assets/fruktkorg-premium-new.jpg';
import fruktkorgrSupremeImg from '@/assets/fruktkorg-supreme-new.jpg';
import fruktkorgrOriginalImg from '@/assets/fruktkorg-original-new.jpg';
import fruktkorgrBananImg from '@/assets/fruktkorg-banan-new.jpg';
import fruktkorgrBasImg from '@/assets/fruktkorg-bas-new.jpg';

const fruktkorgar = [
  {
    id: 'frukt-premium',
    name: 'Fruktkorg Premium',
    image: fruktkorgrPremiumImg,
    price: 149
  },
  {
    id: 'frukt-supreme',
    name: 'Fruktkorg Supreme',
    image: fruktkorgrSupremeImg,
    price: 119
  },
  {
    id: 'frukt-original',
    name: 'Fruktkorg Original',
    image: fruktkorgrOriginalImg,
    price: 99
  },
  {
    id: 'frukt-banan',
    name: 'Fruktkorg Banan Plus',
    image: fruktkorgrBananImg,
    price: 89
  },
  {
    id: 'frukt-bas',
    name: 'Fruktkorg Bas',
    image: fruktkorgrBasImg,
    price: 79
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
              className="w-full h-full object-contain rounded"
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
                category: 'fruktkorgar',
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

export default FruktkorgarTab;