import React from 'react';
import AddToCartButton from '@/components/AddToCartButton';
import ecoMilkImage from '@/assets/eco-milk.jpg';
import oatlyImage from '@/assets/oatly.jpg';
import dairyCollectionImage from '@/assets/dairy-products-collection.jpg';

const mejeri = [
  { id: 'eko-standard', name: 'Eko Standardmjölk', price: 18, image: ecoMilkImage },
  { id: 'eko-latt', name: 'Eko Lättmjölk', price: 18, image: ecoMilkImage },
  { id: 'eko-laktosfri', name: 'Eko Laktosfri Mellanmjölk', price: 22, image: ecoMilkImage },
  { id: 'eko-mellan', name: 'Eko Mellanmjölk', price: 18, image: ecoMilkImage },
  { id: 'oatly-kaffe', name: 'Oatly iKaffe', price: 28, image: oatlyImage },
  { id: 'oatly', name: 'Oatly', price: 25, image: oatlyImage },
  { id: 'latte-art', name: 'Latte Art', price: 32, image: dairyCollectionImage },
  { id: 'alpro', name: 'Alpro', price: 26, image: dairyCollectionImage }
];

const MejeriTab = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {mejeri.map((product) => (
        <div key={product.id} className="bg-lightgray rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="aspect-[3/4] bg-white p-4">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain rounded"
            />
          </div>
          <div className="p-3 space-y-3">
            <h3 className="font-medium text-charcoal text-xs text-center">{product.name}</h3>
            <p className="font-bold text-[#4CAF50] text-xs text-center">{product.price} kr</p>
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
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MejeriTab;