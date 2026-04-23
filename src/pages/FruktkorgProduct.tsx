import { useParams, Navigate, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Check, Truck, Star, ShieldCheck, Phone, ArrowRight } from 'lucide-react';
import { getFruktkorgBySlug, fruktkorgProducts } from '@/data/fruktkorg-products';
import fruktkorgOriginal from '@/assets/fruktkorg-standard-new.jpg';
import fruktkorgPremium from '@/assets/fruktkorg-premium-new.jpg';
import fruktkorgBanan from '@/assets/fruktkorg-banan-new.jpg';
import fruktkorgSicilien from '@/assets/fruktkorg-sicilien.jpg';

const imageMap: Record<string, string> = {
  'fruktkorg-standard-new': fruktkorgOriginal,
  'fruktkorg-premium-new': fruktkorgPremium,
  'fruktkorg-banan-new': fruktkorgBanan,
  'fruktkorg-sicilien': fruktkorgSicilien,
};

const FruktkorgProduct = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getFruktkorgBySlug(slug) : undefined;

  if (!product) {
    return <Navigate to="/produkter" replace />;
  }

  const otherProducts = fruktkorgProducts.filter(p => p.slug !== product.slug);
  const img = imageMap[product.image] || fruktkorgOriginal;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={product.seoTitle}
        description={product.seoDescription}
        keywords={product.seoKeywords}
        type="products"
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img src={img} alt={product.name} className="w-full h-full object-cover" loading="eager" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-900 mb-4">
                  {product.name}
                </h1>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Prices */}
                <div className="bg-green-50 rounded-xl p-6 mb-6">
                  <h3 className="font-bold text-green-900 mb-3">Priser per vecka</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {product.sizes.map(s => (
                      <div key={s.kg} className="bg-white rounded-lg p-3 text-center shadow-sm">
                        <div className="text-sm text-gray-500">{s.kg}</div>
                        <div className="text-xl font-bold text-green-800">{s.price} kr</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/provkorg">
                    <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold shadow-lg border-2 border-black/10 text-lg px-8 w-full sm:w-auto">
                      Beställ gratis provkorg
                    </Button>
                  </Link>
                  <a href="tel:010-18398 36">
                    <Button size="lg" variant="outline" className="text-lg px-8 w-full sm:w-auto">
                      <Phone className="h-5 w-5 mr-2" /> Ring oss
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-6">
                  Vad ingår i {product.name}?
                </h2>
                <div className="space-y-3">
                  {product.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Truck, text: 'Fri leverans i hela Stockholm' },
                  { icon: Star, text: '150+ nöjda företagskunder' },
                  { icon: ShieldCheck, text: '100% nöjdhetsgaranti' },
                  { icon: Check, text: 'Gratis provkorg' },
                ].map(({ icon: Icon, text }, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 text-center shadow-sm">
                    <Icon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <span className="text-sm font-medium text-green-900">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-green-900 mb-10">
              Vanliga frågor om {product.name}
            </h2>
            <div className="space-y-6">
              {[
                { q: `Vad kostar ${product.name}?`, a: `${product.name} finns i storlekar från ${product.sizes[0].kg} (${product.sizes[0].price} kr/vecka) upp till ${product.sizes[product.sizes.length-1].kg} (${product.sizes[product.sizes.length-1].price} kr/vecka). Leveransen är alltid kostnadsfri.` },
                { q: 'Kan vi testa innan vi bestämmer oss?', a: 'Absolut! Vi erbjuder en kostnadsfri provkorg så att ni kan uppleva kvaliteten själva. Ingen förpliktelse.' },
                { q: 'Hur ofta levereras fruktkorgen?', a: 'Ni väljer leveransdag själva. De flesta kunder får leverans en gång per vecka, men vi anpassar efter era behov.' },
              ].map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-green-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other products */}
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-green-900 mb-8">
              Se även våra andra fruktkorgar
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {otherProducts.map(p => (
                <Link key={p.slug} to={`/produkt/${p.slug}`} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
                  <img src={imageMap[p.image]} alt={p.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div>
                    <h3 className="font-bold text-green-900">{p.name}</h3>
                    <p className="text-sm text-gray-500">Från {p.sizes[0].price} kr/vecka</p>
                    <span className="text-sm text-green-600 flex items-center gap-1 mt-1">
                      Läs mer <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-green-800 to-green-900">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Testa {product.name} gratis
            </h2>
            <p className="text-gray-200 mb-8 max-w-xl mx-auto">
              Vi bjuder på den första fruktkorgen. Fri leverans, ingen bindningstid.
            </p>
            <Link to="/provkorg">
              <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold shadow-lg border-2 border-black/10 text-lg px-8">
                Beställ gratis provkorg
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FruktkorgProduct;
