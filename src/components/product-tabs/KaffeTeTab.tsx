import React from 'react';
import AddToCartButton from '@/components/AddToCartButton';

const kaffeTe = [
  { id: 'gevalia', name: 'Gevalia', price: 45 },
  { id: 'arvid-nordkvist', name: 'Arvid Nordkvist', price: 42 },
  { id: 'nescafe-lyx', name: 'Nescafe Lyx', price: 38 }
];

const KaffeTeTab = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {kaffeTe.map((product) => (
        <div key={product.id} className="bg-lightgray rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="aspect-[3/4] bg-white p-4">
            <div className="w-full h-full bg-gradient-to-b from-amber-50 to-amber-100 rounded flex items-center justify-center">
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
                category: 'kaffe-te'
              }}
              className="w-full text-xs px-2 py-1"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default KaffeTeTab;