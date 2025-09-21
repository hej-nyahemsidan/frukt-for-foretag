import React from 'react';

const mejeri = [
  { id: 1, name: 'Eko Standardmjölk' },
  { id: 2, name: 'Eko Lättmjölk' },
  { id: 3, name: 'Eko Laktosfri Mellanmjölk' },
  { id: 4, name: 'Eko Mellanmjölk' },
  { id: 5, name: 'Oatly iKaffe' },
  { id: 6, name: 'Oatly' },
  { id: 7, name: 'Latte Art' },
  { id: 8, name: 'Alpro' }
];

const MejeriTab = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {mejeri.map((product) => (
        <div key={product.id} className="bg-lightgray rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="aspect-[3/4] bg-white p-4">
            <div className="w-full h-full bg-gradient-to-b from-blue-50 to-white rounded flex items-center justify-center border">
              <span className="text-xs text-charcoal text-center px-2">{product.name}</span>
            </div>
          </div>
          <div className="p-3 text-center">
            <h3 className="font-medium text-charcoal text-xs">{product.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MejeriTab;