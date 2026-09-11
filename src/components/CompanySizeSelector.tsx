import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShoppingBasket, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { trackCompanySizeSelected, trackRecommendationClick } from '@/lib/gtm';
import { trackConversionEvent } from '@/lib/conversionAnalytics';

type PriceMap = Record<string, Record<string, number>>;

const basketDetails = {
  Original: {
    name: 'Original',
    product: 'Fruktkorg Original',
    image: '/assets/fruktkorg-standard-new.jpg',
    contents: 'Äpplen, päron, citrus, bananer och säsongens frukt.',
  },
  Banan: {
    name: 'Banan',
    product: 'Fruktkorg Banan Plus',
    image: '/assets/fruktkorg-banan-new.jpg',
    contents: 'Extra mycket bananer tillsammans med utvald blandfrukt.',
  },
  Premium: {
    name: 'Premium',
    product: 'Fruktkorg Premium',
    image: '/assets/fruktkorg-premium-new.jpg',
    contents: 'En varierad blandning med fler exklusiva frukter efter säsong.',
  },
} as const;

type BasketKey = keyof typeof basketDetails;

const CompanySizeSelector = () => {
  const [selectedBasket, setSelectedBasket] = useState<BasketKey>('Original');
  const [selectedEmployees, setSelectedEmployees] = useState(24);
  const [prices, setPrices] = useState<PriceMap>({});

  useEffect(() => {
    const loadPrices = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('name, prices')
        .eq('category', 'fruktkorgar');

      if (error) {
        console.error('Kunde inte hämta priser till företagsväljaren:', error);
        return;
      }

      const nextPrices = (data || []).reduce<PriceMap>((result, product) => {
        result[product.name] = product.prices as Record<string, number>;
        return result;
      }, {});
      setPrices(nextPrices);
    };

    void loadPrices();
  }, []);

  useEffect(() => {
    void trackConversionEvent('basket_selector_viewed');
    const handleConsent = (event: Event) => {
      const settings = (event as CustomEvent<{ analytics?: boolean }>).detail;
      if (settings?.analytics) void trackConversionEvent('basket_selector_viewed');
    };
    window.addEventListener('cookie-consent-updated', handleConsent);
    return () => window.removeEventListener('cookie-consent-updated', handleConsent);
  }, []);

  const calculation = useMemo(() => {
    const employees = Math.max(1, selectedEmployees);
    let size = '4kg';
    let quantity = 1;

    if (employees > 12 && employees <= 25) size = '9kg';
    if (employees > 25 && employees <= 35) size = '11kg';
    if (employees > 35) {
      size = '9kg';
      quantity = Math.ceil(employees / 25);
    }

    const basket = basketDetails[selectedBasket];
    const unitPrice = prices[basket.product]?.[size];
    return {
      basket,
      size,
      quantity,
      unitPrice: typeof unitPrice === 'number' ? unitPrice : null,
      weeklyPrice: typeof unitPrice === 'number' ? unitPrice * quantity : null,
    };
  }, [prices, selectedBasket, selectedEmployees]);

  const selectSize = (employees: number) => {
    setSelectedEmployees(employees);
    trackCompanySizeSelected(employees);
    void trackConversionEvent('employee_count_selected', { basketType: selectedBasket, employeeCount: employees });
  };

  useEffect(() => {
    if (calculation.weeklyPrice === null) return;
    const timeout = window.setTimeout(() => {
      void trackConversionEvent('price_viewed', {
        basketType: selectedBasket,
        employeeCount: selectedEmployees,
        price: calculation.weeklyPrice,
        metadata: { size: calculation.size, quantity: calculation.quantity },
      });
    }, 800);
    return () => window.clearTimeout(timeout);
  }, [calculation.quantity, calculation.size, calculation.weeklyPrice, selectedBasket, selectedEmployees]);

  const selectBasket = (basketKey: BasketKey) => {
    setSelectedBasket(basketKey);
    void trackConversionEvent('basket_selected', { basketType: basketKey, employeeCount: selectedEmployees });
  };

  const startQuote = () => {
    trackRecommendationClick(selectedEmployees, 'quote');
    void trackConversionEvent('quote_started', {
      basketType: selectedBasket,
      employeeCount: selectedEmployees,
      price: calculation.weeklyPrice,
    });
  };

  return (
    <section className="bg-sky-50 py-14 sm:py-16 px-4" aria-labelledby="company-size-heading">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-primary mb-2">Välj korg och beräkna mängd</p>
          <h2 id="company-size-heading" className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Vilken fruktkorg passar er?
          </h2>
          <p className="text-muted-foreground">Välj först korg och ange sedan hur många ni är på kontoret.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-8" role="group" aria-label="Välj fruktkorg">
          {(Object.keys(basketDetails) as BasketKey[]).map(basketKey => {
            const basket = basketDetails[basketKey];
            const isSelected = selectedBasket === basketKey;
            return (
            <Button
              key={basketKey}
              type="button"
              variant="outline"
              className={`h-auto p-0 overflow-hidden flex flex-col items-stretch text-left ${isSelected ? 'border-primary ring-2 ring-primary' : ''}`}
              aria-pressed={isSelected}
              onClick={() => selectBasket(basketKey)}
            >
              <img src={basket.image} alt={`Fruktkorg ${basket.name}`} className="w-full h-44 object-cover" loading="lazy" />
              <span className="p-4 whitespace-normal">
                <span className="flex items-center gap-2 font-bold text-base mb-2">
                  <ShoppingBasket className="h-4 w-4 text-primary" aria-hidden="true" /> {basket.name}
                </span>
                <span className="block text-sm font-normal leading-relaxed text-muted-foreground">{basket.contents}</span>
                <span className="flex items-center gap-2 text-sm font-semibold text-primary mt-3">
                  {isSelected && <CheckCircle2 className="h-4 w-4" aria-hidden="true" />}
                  {isSelected ? 'Vald korg' : 'Välj denna korg'}
                </span>
              </span>
            </Button>
            );
          })}
        </div>

        <div className="border border-border bg-background rounded-lg p-5 sm:p-7">
          <div className="mb-6">
            <p className="text-sm font-semibold text-primary mb-3">Hur många är ni?</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="relative sm:w-48">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  type="number"
                  min={1}
                  max={500}
                  value={selectedEmployees}
                  onChange={event => selectSize(Math.max(1, Number(event.target.value) || 1))}
                  className="pl-10"
                  aria-label="Antal personer på kontoret"
                />
              </div>
              <div className="flex flex-wrap gap-2" aria-label="Vanliga antal personer">
                {[10, 24, 50, 100].map(count => (
                  <Button key={count} type="button" size="sm" variant={selectedEmployees === count ? 'default' : 'outline'} onClick={() => selectSize(count)}>
                    {count === 100 ? '100+' : count}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center border-t border-border pt-6">
            <div>
              <p className="text-sm font-semibold text-primary mb-1">Beräknat för {selectedEmployees} personer</p>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {calculation.quantity} × {calculation.basket.name} {calculation.size}
              </h3>
              <p className="text-muted-foreground mb-4">Ett enkelt förslag för en leverans per vecka.</p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-foreground">
                <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Vald korg: {calculation.basket.name}</span>
                <span className="font-semibold">{calculation.weeklyPrice === null ? 'Vi räknar fram rätt pris' : `Cirka ${calculation.weeklyPrice} kr per vecka`}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:min-w-52">
              <Button asChild size="lg">
                <Link to={`/kontakt?anstallda=${selectedEmployees}&korg=${selectedBasket.toLowerCase()}`} onClick={startQuote}>
                  Fortsätt med valet <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/produkter" onClick={() => trackRecommendationClick(selectedEmployees, 'products')}>
                  Se alla storlekar
                </Link>
              </Button>
            </div>
          </div>

        </div>
        <p className="text-sm text-muted-foreground text-center mt-4 max-w-3xl mx-auto">
          Beräkningen är ett förslag. Ni kan ändra korg, storlek och leveransdag innan ni skickar förfrågan och senare i kundportalen.
        </p>
      </div>
    </section>
  );
};

export default CompanySizeSelector;