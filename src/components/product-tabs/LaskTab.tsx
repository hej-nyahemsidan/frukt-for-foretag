import React from 'react';

const lask = [
  { id: 1, name: 'Coca Cola' },
  { id: 2, name: 'Coca Cola Zero' },
  { id: 3, name: 'Sprite' },
  { id: 4, name: 'Sprite Zero' },
  { id: 5, name: 'Fanta Orange' },
  { id: 6, name: 'Fanta Exotic' },
  { id: 7, name: 'Bonaqua Citron' },
  { id: 8, name: 'Bonaqua Hallon/Lime' },
  { id: 9, name: 'Mer Päron' }
];

const LaskTab = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {lask.map((product) => (
        <div key={product.id} className="bg-lightgray rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="aspect-[3/4] bg-white p-4">
            <div className="w-full h-full bg-gradient-to-b from-blue-100 to-blue-200 rounded flex items-center justify-center">
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

export default LaskTab;