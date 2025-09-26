import React from 'react';
import AddToCartButton from '@/components/AddToCartButton';
import mellanmjolkEkoLaktosfriImg from '@/assets/mellanmjolk-eko-laktosfri.png';
import latteArtMjolkEkoImg from '@/assets/latte-art-mjolk-eko.png';
import mellanmjolkLaktosfriImg from '@/assets/mellanmjolk-laktosfri.png';
import mellanmjolkPortImg from '@/assets/mellanmjolk-port.png';
import kaffemjolkLaktosfriImg from '@/assets/kaffemjolk-laktosfri.png';

interface MejeriTabProps {
  selectedDays: string[];
}

const mejeri = [
  { id: 'mellanmjolk-eko-laktosfri', name: 'Mellanmjölk Eko Laktosfri 1,5%', price: 22, image: mellanmjolkEkoLaktosfriImg },
  { id: 'latte-art-mjolk-eko', name: 'Latte Art Mjölk Eko 2,6%', price: 32, image: latteArtMjolkEkoImg },
  { id: 'mellanmjolk-laktosfri', name: 'Mellanmjölk Laktosfri 1,5%', price: 22, image: mellanmjolkLaktosfriImg },
  { id: 'mellanmjolk-port', name: 'Mellanmjölk Port 1,5%', price: 18, image: mellanmjolkPortImg },
  { id: 'kaffemjolk-laktosfri', name: 'Kaffemjölk Laktosfri 1,5%', price: 28, image: kaffemjolkLaktosfriImg }
];

const MejeriTab: React.FC<MejeriTabProps> = ({ selectedDays }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {mejeri.map((product) => (
        <div key={product.id} className="bg-lightgray rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="aspect-[3/4] bg-white overflow-hidden p-2">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="p-3 space-y-3">
            <h3 className="font-medium text-charcoal text-xs text-center">{product.name}</h3>
            <AddToCartButton 
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                category: 'mejeri',
                image: product.image
              }}
              className="w-full text-xs px-1 py-1"
              showQuantitySelector={true}
              showSizeSelector={false}
              selectedDays={selectedDays}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MejeriTab;