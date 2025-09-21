import React from 'react';
import AddToCartButton from '@/components/AddToCartButton';

const mejeri = [
  { id: 'eko-standard', name: 'Eko Standardmjölk', price: 18 },
  { id: 'eko-latt', name: 'Eko Lättmjölk', price: 18 },
  { id: 'eko-laktosfri', name: 'Eko Laktosfri Mellanmjölk', price: 22 },
  { id: 'eko-mellan', name: 'Eko Mellanmjölk', price: 18 },
  { id: 'oatly-kaffe', name: 'Oatly iKaffe', price: 28 },
  { id: 'oatly', name: 'Oatly', price: 25 },
  { id: 'latte-art', name: 'Latte Art', price: 32 },
  { id: 'alpro', name: 'Alpro', price: 26 }
];

const MejeriTab = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {mejeri.map((product) => (
        <div key={product.id} className="bg-lightgray rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="aspect-[3/4] bg-white p-4">
            <div className="w-full h-full bg-gradient-to-b from-blue-50 to-white rounded flex items-center justify-center border">
              <span className="text-xs text-charcoal text-center px-2">{product.name}</span>
            </div>
          </div>
            <div className="p-3 text-center space-y-2">
              <h3 className="font-medium text-charcoal text-xs">{product.name}</h3>
              <p className="font-bold text-[#4CAF50] text-xs">{product.price} kr</p>
              <AddToCartButton 
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  category: 'mejeri'
                }}
                className="w-full text-xs px-1 py-1"
              />
            </div>
        </div>
      ))}
    </div>
  );
};

export default MejeriTab;