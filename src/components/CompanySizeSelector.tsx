import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { trackCompanySizeSelected, trackRecommendationClick } from '@/lib/gtm';

type PriceMap = Record<string, Record<string, number>>;

const recommendations = [
  {
    employees: 10,
    label: 'Cirka 10',
    title: 'Original 4 kg',
    description: 'En lagom veckoleverans för det mindre kontoret.',
    frequency: '1 leverans per vecka',
    items: [{ product: 'Fruktkorg Original', size: '4kg', quantity: 1 }],
  },
  {
    employees: 25,
    label: 'Cirka 25',
    title: 'Original + Banan',
    description: 'Variation och extra bananer för ett mellanstort team.',
    frequency: '1–2 leveranser per vecka',
    items: [
      { product: 'Fruktkorg Original', size: '9kg', quantity: 1 },
      { product: 'Fruktkorg Banan Plus', size: '4kg', quantity: 1 },
    ],
  },
  {
    employees: 50,
    label: 'Cirka 50',
    title: 'Original, Banan + Premium',
    description: 'Ett varierat upplägg som håller frukten påfylld hela veckan.',
    frequency: '2 leveranser per vecka',
    items: [
      { product: 'Fruktkorg Original', size: '11kg', quantity: 2 },
      { product: 'Fruktkorg Banan Plus', size: '6kg', quantity: 2 },
      { product: 'Fruktkorg Premium', size: '4kg', quantity: 1 },
    ],
  },
  {
    employees: 100,
    label: '100+',
    title: 'Anpassat företagsupplägg',
    description: 'Vi dimensionerar antal korgar, sorter och leveransdagar efter kontoret.',
    frequency: 'Flera leveranser vid behov',
    items: [],
  },
] as const;

const CompanySizeSelector = () => {
  const [selectedEmployees, setSelectedEmployees] = useState(10);
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

  const selected = recommendations.find(item => item.employees === selectedEmployees) ?? recommendations[0];
  const weeklyPrice = useMemo(() => {
    if (selected.items.length === 0) return null;
    const itemPrices = selected.items.map(item => prices[item.product]?.[item.size]);
    if (itemPrices.some(price => typeof price !== 'number')) return null;
    return selected.items.reduce((sum, item, index) => sum + (itemPrices[index] ?? 0) * item.quantity, 0);
  }, [prices, selected]);

  const selectSize = (employees: number) => {
    setSelectedEmployees(employees);
    trackCompanySizeSelected(employees);
  };

  return (
    <section className="bg-sky-50 py-14 sm:py-16 px-4" aria-labelledby="company-size-heading">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-primary mb-2">Hitta rätt mängd direkt</p>
          <h2 id="company-size-heading" className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Hur många är ni på kontoret?
          </h2>
          <p className="text-muted-foreground">Välj ungefärligt antal medarbetare så visar vi ett lämpligt upplägg.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6" role="group" aria-label="Antal medarbetare">
          {recommendations.map(option => (
            <Button
              key={option.employees}
              type="button"
              variant={selectedEmployees === option.employees ? 'default' : 'outline'}
              className="h-12 gap-2"
              aria-pressed={selectedEmployees === option.employees}
              onClick={() => selectSize(option.employees)}
            >
              <Users className="h-4 w-4" />
              {option.label}
            </Button>
          ))}
        </div>

        <div className="border border-border bg-background rounded-lg p-5 sm:p-7 grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <p className="text-sm font-semibold text-primary mb-1">Vår rekommendation</p>
            <h3 className="text-2xl font-bold text-foreground mb-2">{selected.title}</h3>
            <p className="text-muted-foreground mb-4">{selected.description}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-foreground">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> {selected.frequency}
              </span>
              <span className="font-semibold">
                {weeklyPrice === null ? 'Vi räknar fram rätt pris' : `Cirka ${weeklyPrice} kr per vecka`}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:min-w-52">
            <Button asChild size="lg">
              <Link to="/kontakt" onClick={() => trackRecommendationClick(selectedEmployees, 'quote')}>
                Få prisförslag <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/produkter" onClick={() => trackRecommendationClick(selectedEmployees, 'products')}>
                Se fruktkorgarna
              </Link>
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-3">
          Rekommendationen är en uppskattning. Vi anpassar mängd och leveransdagar efter er arbetsplats.
        </p>
      </div>
    </section>
  );
};

export default CompanySizeSelector;