import React from 'react';

const kaffeTe = [
  { id: 1, name: 'Gevalia' },
  { id: 2, name: 'Arvid Nordkvist' },
  { id: 3, name: 'Nescafe Lyx' }
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
          <div className="p-3 text-center">
            <h3 className="font-medium text-charcoal text-sm">{product.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KaffeTeTab;