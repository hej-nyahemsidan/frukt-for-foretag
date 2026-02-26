import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useResellerAuth } from '../contexts/ResellerAuthContext';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: string;
  name: string;
  category: string;
  image_url: string;
  prices: Record<string, number>;
}

interface ResellerPrice {
  product_id: string;
  price: number;
  size: string | null;
}

interface ResellerProductPrice {
  id?: string;
  product_id: string;
  price: number;
  size: string | null;
}

const ResellerProductPricing = () => {
  const { reseller } = useResellerAuth();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [purchasePrices, setPurchasePrices] = useState<ResellerPrice[]>([]);
  const [standardPrices, setStandardPrices] = useState<ResellerProductPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (reseller) {
      fetchData();
    }
  }, [reseller]);

  const fetchData = async () => {
    if (!reseller) return;

    const [productsRes, purchaseRes, standardRes] = await Promise.all([
      supabase.from('products').select('*').order('category'),
      supabase.from('reseller_prices').select('product_id, price, size').eq('reseller_id', reseller.id),
      supabase.from('reseller_product_prices').select('id, product_id, price, size').eq('reseller_id', reseller.id),
    ]);

    if (productsRes.data) {
      setProducts(productsRes.data.map(p => ({
        ...p,
        prices: (typeof p.prices === 'object' && p.prices !== null ? p.prices : {}) as Record<string, number>,
      })));
    }
    if (purchaseRes.data) setPurchasePrices(purchaseRes.data);
    if (standardRes.data) setStandardPrices(standardRes.data);
    setLoading(false);
  };

  const getPurchasePrice = (productId: string, size: string | null): number | null => {
    const p = purchasePrices.find(pp => pp.product_id === productId && pp.size === size);
    return p ? p.price : null;
  };

  const getStandardPrice = (productId: string, size: string | null): string => {
    const p = standardPrices.find(sp => sp.product_id === productId && sp.size === size);
    return p ? p.price.toString() : '';
  };

  const handleStandardPriceChange = async (productId: string, size: string | null, value: string) => {
    if (!reseller) return;
    const price = parseFloat(value);
    if (isNaN(price) || price < 0) return;

    const existing = standardPrices.find(sp => sp.product_id === productId && sp.size === size);

    if (existing?.id) {
      const { error } = await supabase
        .from('reseller_product_prices')
        .update({ price })
        .eq('id', existing.id);

      if (error) {
        toast({ title: 'Fel', description: 'Kunde inte uppdatera pris.', variant: 'destructive' });
        return;
      }
    } else {
      const { error } = await supabase
        .from('reseller_product_prices')
        .insert({ reseller_id: reseller.id, product_id: productId, price, size });

      if (error) {
        toast({ title: 'Fel', description: 'Kunde inte spara pris.', variant: 'destructive' });
        return;
      }
    }

    await fetchData();
    toast({ title: 'Sparat', description: 'Standardpriset har sparats.' });
  };

  const groupedProducts = products.reduce<Record<string, Product[]>>((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {});

  const categoryLabels: Record<string, string> = {
    fruktkorgar: 'Fruktkorgar', fruktpasar: 'Fruktpåsar', lask: 'Läsk',
    mejeri: 'Mejeri', kaffe: 'Kaffe & Te', frukost: 'Frukost',
    snacks: 'Snacks', grönsaker: 'Grönsaker', stad: 'Städ', annat: 'Annat',
  };

  if (loading) return <p className="text-muted-foreground">Laddar produkter...</p>;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Här ser du ert inköpspris och kan sätta det standardpris era kunder ser.
      </p>

      {Object.entries(groupedProducts).map(([category, prods]) => {
        // Only show categories where we have purchase prices
        const hasPrices = prods.some(p => {
          const sizes = Object.keys(p.prices);
          if (sizes.length > 1) return sizes.some(s => getPurchasePrice(p.id, s) !== null);
          return getPurchasePrice(p.id, null) !== null;
        });
        if (!hasPrices) return null;

        return (
          <Card key={category}>
            <CardHeader className="py-3">
              <CardTitle className="text-base">{categoryLabels[category] || category}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Bild</TableHead>
                    <TableHead>Produkt</TableHead>
                    <TableHead>Ert inköpspris</TableHead>
                    <TableHead>Ert kundpris (kr)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prods.map(product => {
                    const sizes = Object.keys(product.prices);
                    if (sizes.length > 1) {
                      return sizes.map(size => {
                        const pp = getPurchasePrice(product.id, size);
                        if (pp === null) return null;
                        return (
                          <TableRow key={`${product.id}-${size}`}>
                            <TableCell>
                              <img src={product.image_url} alt={product.name} className="w-10 h-10 object-cover rounded"
                                onError={(e) => { (e.target as HTMLImageElement).src = '/assets/product-placeholder.jpg'; }} />
                            </TableCell>
                            <TableCell>
                              <div>{product.name}</div>
                              <div className="text-xs text-muted-foreground">{size}</div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">{pp} kr</Badge>
                            </TableCell>
                            <TableCell className="w-32">
                              <Input
                                type="number" min="0" step="1" placeholder="—"
                                defaultValue={getStandardPrice(product.id, size)}
                                onBlur={(e) => { if (e.target.value) handleStandardPriceChange(product.id, size, e.target.value); }}
                                className="w-24 h-8 text-sm"
                              />
                            </TableCell>
                          </TableRow>
                        );
                      });
                    }

                    const pp = getPurchasePrice(product.id, null);
                    if (pp === null) return null;
                    return (
                      <TableRow key={product.id}>
                        <TableCell>
                          <img src={product.image_url} alt={product.name} className="w-10 h-10 object-cover rounded"
                            onError={(e) => { (e.target as HTMLImageElement).src = '/assets/product-placeholder.jpg'; }} />
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell><Badge variant="secondary">{pp} kr</Badge></TableCell>
                        <TableCell className="w-32">
                          <Input
                            type="number" min="0" step="1" placeholder="—"
                            defaultValue={getStandardPrice(product.id, null)}
                            onBlur={(e) => { if (e.target.value) handleStandardPriceChange(product.id, null, e.target.value); }}
                            className="w-24 h-8 text-sm"
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ResellerProductPricing;
