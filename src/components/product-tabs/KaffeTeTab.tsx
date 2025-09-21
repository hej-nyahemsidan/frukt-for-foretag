import React from 'react';

const kaffeTe = [
  { id: 1, name: 'Gevalia' },
  { id: 2, name: 'Arvid Nordkvist' },
  { id: 3, name: 'Nescafe Lyx' }
];

const KaffeTeTab = () => {
  return (
    <div className="flex gap-6 justify-center max-w-2xl mx-auto">
      {kaffeTe.map((product) => (
        <div key={product.id} className="bg-lightgray rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="aspect-[3/4] bg-white p-4 w-48">
            <div className="w-full h-full bg-gradient-to-b from-amber-50 to-amber-100 rounded flex items-center justify-center">
              <span className="text-sm text-charcoal text-center px-2 font-medium">{product.name}</span>
            </div>
          </div>
          <div className="p-4 text-center">
            <h3 className="font-semibold text-charcoal">{product.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KaffeTeTab;