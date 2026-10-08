import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useResellerAuth } from '../contexts/ResellerAuthContext';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
  const [markup, setMarkup] = useState('10');
  const [scope, setScope] = useState<'all' | 'category' | 'product'>('all');
  const [scopeCategory, setScopeCategory] = useState('');
  const [scopeProduct, setScopeProduct] = useState('');
  const [applying, setApplying] = useState(false);

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

  const applyMarkup = async () => {
    if (!reseller) return;
    const pct = parseFloat(markup.replace(',', '.'));
    if (isNaN(pct) || pct < 0) {
      toast({ title: 'Fel', description: 'Ange ett giltigt procenttal.', variant: 'destructive' });
      return;
    }
    const targets = purchasePrices.filter(pp => {
      if (scope === 'all') return true;
      if (scope === 'product') return pp.product_id === scopeProduct;
      return products.find(p => p.id === pp.product_id)?.category === scopeCategory;
    });
    if (targets.length === 0) {
      toast({ title: 'Inget att uppdatera', description: 'Välj kategori eller produkt med inköpspris.', variant: 'destructive' });
      return;
    }
    setApplying(true);
    const inserts: { reseller_id: string; product_id: string; price: number; size: string | null }[] = [];
    const updates: PromiseLike<{ error: unknown }>[] = [];
    for (const t of targets) {
      const price = Math.round(t.price * (1 + pct / 100) * 100) / 100;
      const existing = standardPrices.find(sp => sp.product_id === t.product_id && sp.size === t.size);
      if (existing?.id) {
        updates.push(supabase.from('reseller_product_prices').update({ price }).eq('id', existing.id));
      } else {
        inserts.push({ reseller_id: reseller.id, product_id: t.product_id, price, size: t.size });
      }
    }
    const results = await Promise.all(updates);
    let failed = results.some(r => r.error);
    if (inserts.length) {
      const { error } = await supabase.from('reseller_product_prices').insert(inserts);
      if (error) failed = true;
    }
    await fetchData();
    setApplying(false);
    toast(failed
      ? { title: 'Delvis fel', description: 'Vissa priser kunde inte sparas.', variant: 'destructive' }
      : { title: 'Klart', description: `${targets.length} priser satta till inköpspris + ${pct}%.` });
  };

  const groupedProducts = products.reduce<Record<string, Product[]>>((acc, p) => {
    (acc[p.category] ??= []).push(p);
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

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Lägg påslag i procent på inköpspriset</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-[120px_180px_1fr_auto] items-end">
            <div>
              <Label htmlFor="markup">Påslag (%)</Label>
              <Input id="markup" type="number" min="0" step="1" value={markup} onChange={e => setMarkup(e.target.value)} />
            </div>
            <div>
              <Label>Gäller</Label>
              <Select value={scope} onValueChange={v => setScope(v as typeof scope)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla artiklar</SelectItem>
                  <SelectItem value="category">En kategori</SelectItem>
                  <SelectItem value="product">En enskild artikel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              {scope === 'category' && (
                <>
                  <Label>Kategori</Label>
                  <Select value={scopeCategory} onValueChange={setScopeCategory}>
                    <SelectTrigger><SelectValue placeholder="Välj kategori" /></SelectTrigger>
                    <SelectContent>
                      {Object.keys(groupedProducts).filter(c => groupedProducts[c].some(p => purchasePrices.some(pp => pp.product_id === p.id))).map(c => (
                        <SelectItem key={c} value={c}>{categoryLabels[c] || c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              )}
              {scope === 'product' && (
                <>
                  <Label>Artikel</Label>
                  <Select value={scopeProduct} onValueChange={setScopeProduct}>
                    <SelectTrigger><SelectValue placeholder="Välj artikel" /></SelectTrigger>
                    <SelectContent>
                      {products.filter(p => purchasePrices.some(pp => pp.product_id === p.id)).map(p => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              )}
            </div>
            <Button onClick={applyMarkup} disabled={applying}>{applying ? 'Sparar...' : 'Lägg på påslag'}</Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Exempel: inköpspris 100 kr + 10 % = 110 kr. Kundpriset skrivs över för valda artiklar. Du kan alltid skriva ett exakt pris i tabellen nedan.
          </p>
        </CardContent>
      </Card>

      <Accordion type="multiple" className="space-y-2">
        {Object.entries(groupedProducts).map(([category, prods]) => {
          const hasPrices = prods.some(p => {
            const sizes = Object.keys(p.prices);
            if (sizes.length > 1) return sizes.some(s => getPurchasePrice(p.id, s) !== null);
            return getPurchasePrice(p.id, null) !== null;
          });
          if (!hasPrices) return null;

          const rowCount = prods.reduce((n, p) => {
            const sizes = Object.keys(p.prices);
            if (sizes.length > 1) return n + sizes.filter(s => getPurchasePrice(p.id, s) !== null).length;
            return n + (getPurchasePrice(p.id, null) !== null ? 1 : 0);
          }, 0);

          return (
            <AccordionItem key={category} value={category} className="border rounded-lg bg-card">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center gap-2 text-base font-medium">
                  {categoryLabels[category] || category}
                  <Badge variant="secondary" className="ml-2">{rowCount}</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-0">
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
                      const isKgProduct = sizes.some(s => /^\d+(?:[.,]\d+)?\s*kg$/i.test(s));
                      const kgRow = isKgProduct ? (
                        <TableRow key={`${product.id}-kg`} className="bg-muted/40">
                          <TableCell />
                          <TableCell>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-xs text-muted-foreground">Kg-pris – ersätter storlekspriserna för kunderna</div>
                          </TableCell>
                          <TableCell />
                          <TableCell className="w-32">
                            <Input
                              type="number" min="0" step="0.5" placeholder="kr/kg"
                              key={getStandardPrice(product.id, 'kg')}
                defaultValue={getStandardPrice(product.id, 'kg')}
                              onBlur={(e) => { if (e.target.value) handleStandardPriceChange(product.id, 'kg', e.target.value); }}
                              className="w-24 h-8 text-sm"
                            />
                          </TableCell>
                        </TableRow>
                      ) : null;
                      return [kgRow, ...sizes.map(size => {
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
                                key={getStandardPrice(product.id, size)}
                defaultValue={getStandardPrice(product.id, size)}
                                onBlur={(e) => { if (e.target.value) handleStandardPriceChange(product.id, size, e.target.value); }}
                                className="w-24 h-8 text-sm"
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })];
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
                            key={getStandardPrice(product.id, null)}
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
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default ResellerProductPricing;
