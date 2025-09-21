import React from 'react';
import { Button } from '@/components/ui/button';
import fruktkorgrStandardImg from '@/assets/fruktkorg-standard.jpg';
import fruktkorgrPremiumImg from '@/assets/fruktkorg-premium.jpg';
import fruktkorgrEkoImg from '@/assets/fruktkorg-eko.jpg';
import fruktkorgrBananImg from '@/assets/fruktkorg-banan.jpg';
import fruktladaImg from '@/assets/fruktlada.jpg';

const ProductShowcase = () => {
  const products = [
    {
      id: 'standard',
      name: 'Fruktkorg Standard',
      image: fruktkorgrStandardImg,
      weight: 'Starting at 4kg',
      currentPrice: '230 kr',
      originalPrice: '271 kr',
      showPrice: true
    },
    {
      id: 'premium',
      name: 'Fruktkorg Premium',
      image: fruktkorgrPremiumImg,
      weight: 'Starting at 4kg',
      currentPrice: '263 kr',
      originalPrice: '310 kr',
      showPrice: true
    },
    {
      id: 'eko',
      name: 'Fruktkorg Eko',
      image: fruktkorgrEkoImg,
      weight: 'Starting at 4kg',
      currentPrice: '289 kr',
      originalPrice: '340 kr',
      showPrice: true
    },
    {
      id: 'banan',
      name: 'Fruktkorg Banan+',
      image: fruktkorgrBananImg,
      weight: 'Starting at 4kg',
      currentPrice: '242 kr',
      originalPrice: '285 kr',
      showPrice: true
    },
    {
      id: 'lada',
      name: 'Fruktlåda',
      image: fruktladaImg,
      weight: 'Starting at 4kg',
      currentPrice: 'Begär offert',
      originalPrice: null,
      showPrice: false
    }
  ];

  return (
    <section id="products" className="py-16 px-8 bg-white">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Fruktkorgar i olika format
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
            Som fruktbud erbjuder vi fruktkorgar i fyra varianter, på fyra kilo och uppåt. 
            Läs vidare om var och en av våra fruktkorgar här nedan.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
          {products.map((product) => (
            <div 
              key={product.id}
              className="bg-green-50 rounded-xl shadow-md p-6 flex flex-col h-full"
            >
              {/* Product Image */}
              <div className="mb-4">
                <img
                  src={product.image}
                  alt={`${product.name} - premium fruit basket from Fruktexperten`}
                  className="w-full aspect-square object-cover rounded-lg"
                />
              </div>

              {/* Product Content */}
              <div className="flex-1 flex flex-col">
                {/* Weight */}
                <p className="text-gray-500 text-sm mb-2">
                  {product.weight}
                </p>

                {/* Product Name */}
                <h3 className="font-semibold text-gray-800 mb-4 text-base">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="mb-4">
                  {product.showPrice ? (
                    <div className="flex items-center gap-2">
                      <span className="text-red-600 font-bold text-xl">
                        {product.currentPrice}
                      </span>
                      {product.originalPrice && (
                        <span className="text-gray-400 line-through text-sm">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-green-600 font-bold text-lg">
                      {product.currentPrice}
                    </span>
                  )}
                </div>

                {/* Buttons */}
                <div className="mt-auto space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Visa
                  </Button>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Beställ Nu
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-lg">
            Se hela Sortimentet
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;