import React from 'react';
import AddToCartButton from '@/components/AddToCartButton';
import fruktkorgrPremiumImg from '@/assets/fruktkorg-premium-new.jpg';
import fruktkorgrSupremeImg from '@/assets/fruktkorg-supreme-new.jpg';
import fruktkorgrOriginalImg from '@/assets/fruktkorg-original-new.jpg';
import fruktkorgrBananImg from '@/assets/fruktkorg-bas-new.jpg';
import fruktkorgrBasImg from '@/assets/fruktkorg-bas-new.jpg';

const fruktkorgar = [
  {
    id: 'frukt-premium',
    name: 'Fruktkorg Premium',
    image: fruktkorgrPremiumImg,
    prices: {
      '4kg': 263,
      '6kg': 395,
      '9kg': 592,
      '11kg': 724
    }
  },
  {
    id: 'frukt-supreme',
    name: 'Fruktkorg Supreme',
    image: fruktkorgrSupremeImg,
    prices: {
      '4kg': 230,
      '6kg': 345,
      '9kg': 518,
      '11kg': 633
    }
  },
  {
    id: 'frukt-original',
    name: 'Fruktkorg Original',
    image: fruktkorgrOriginalImg,
    prices: {
      '4kg': 289,
      '6kg': 434,
      '9kg': 651,
      '11kg': 796
    }
  },
  {
    id: 'frukt-banan',
    name: 'Fruktkorg Banan Plus',
    image: fruktkorgrBananImg,
    prices: {
      '4kg': 249,
      '6kg': 374,
      '9kg': 560,
      '11kg': 686
    }
  },
  {
    id: 'frukt-bas',
    name: 'Fruktkorg Bas',
    image: fruktkorgrBasImg,
    prices: {
      '4kg': 199,
      '6kg': 299,
      '9kg': 449,
      '11kg': 549
    }
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
          <div className="p-3 space-y-3">
            <h3 className="font-medium text-charcoal text-sm text-center">{product.name}</h3>
            <AddToCartButton 
              product={{
                id: product.id,
                name: product.name,
                prices: product.prices,
                category: 'fruktkorgar',
                image: product.image
              }}
              className="w-full text-xs px-2 py-1"
              showQuantitySelector={true}
              showSizeSelector={true}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FruktkorgarTab;