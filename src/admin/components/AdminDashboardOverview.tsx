import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp, DollarSign, ShoppingBag, Percent, Save } from 'lucide-react';
import type { Json } from '@/integrations/supabase/types';

interface Product {
  id: string;
  name: string;
  category: string;
  prices: Record<string, number>;
  purchase_prices: Record<string, number>;
}

interface OrderItem {
  id?: string;
  name?: string;
  price?: number;
  quantity?: number;
  size?: string;
}

interface Order {
  id: string;
  total_price: number | null;
  items: OrderItem[] | null;
  created_at: string;
}

const getProductSizes = (category: string): string[] => {
  if (category === 'fruktkorgar') return ['4kg', '6kg', '9kg', '11kg'];
  if (category === 'gronsaker') return ['styck', 'pase'];
  return ['default'];
};

const sizeLabel = (size: string) => {
  if (size === 'default') return 'Styckpris';
  if (size === 'styck') return 'Styck';
  if (size === 'pase') return 'Påse';
  return size;
};

const AdminDashboardOverview = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [drafts, setDrafts] = useState<Record<string, Record<string, string>>>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    const [{ data: prodData, error: prodErr }, { data: ordData, error: ordErr }] = await Promise.all([
      supabase.from('products').select('id, name, category, prices, purchase_prices').order('category').order('name'),
      supabase.from('orders').select('id, total_price, items, created_at').order('created_at', { ascending: false }),
    ]);
    if (prodErr || ordErr) {
      toast({ title: 'Fel', description: 'Kunde inte hämta data.', variant: 'destructive' });
    }
    setProducts(
      ((prodData ?? []) as any[]).map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        prices: (p.prices ?? {}) as Record<string, number>,
        purchase_prices: (p.purchase_prices ?? {}) as Record<string, number>,
      })),
    );
    setOrders(
      ((ordData ?? []) as any[]).map((o) => ({
        id: o.id,
        total_price: o.total_price,
        items: Array.isArray(o.items) ? (o.items as OrderItem[]) : [],
        created_at: o.created_at,
      })),
    );
    setLoading(false);
  };

  const purchaseLookup = useMemo(() => {
    const map = new Map<string, Record<string, number>>();
    products.forEach((p) => map.set(p.id, p.purchase_prices ?? {}));
    return map;
  }, [products]);

  const kpis = useMemo(() => {
    let revenue = 0;
    let cost = 0;
    let itemCount = 0;
    orders.forEach((o) => {
      revenue += Number(o.total_price ?? 0);
      (o.items ?? []).forEach((it) => {
        const qty = Number(it.quantity ?? 0);
        itemCount += qty;
        if (!it.id) return;
        const pp = purchaseLookup.get(it.id);
        if (!pp) return;
        const sizeKey = it.size && pp[it.size] !== undefined ? it.size : 'default';
        const unitCost = Number(pp[sizeKey] ?? 0);
        cost += unitCost * qty;
      });
    });
    const profit = revenue - cost;
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
    return { revenue, cost, profit, margin, orderCount: orders.length, itemCount };
  }, [orders, purchaseLookup]);

  const setDraft = (productId: string, size: string, value: string) => {
    setDrafts((prev) => ({
      ...prev,
      [productId]: { ...(prev[productId] ?? {}), [size]: value },
    }));
  };

  const saveProduct = async (product: Product) => {
    const draft = drafts[product.id];
    if (!draft) return;
    const updated: Record<string, number> = { ...product.purchase_prices };
    Object.entries(draft).forEach(([size, val]) => {
      const num = parseFloat(val);
      if (!Number.isNaN(num)) updated[size] = num;
      else if (val === '') delete updated[size];
    });
    const { error } = await supabase
      .from('products')
      .update({ purchase_prices: updated as unknown as Json })
      .eq('id', product.id);
    if (error) {
      toast({ title: 'Fel', description: 'Kunde inte spara inköpspris.', variant: 'destructive' });
      return;
    }
    setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, purchase_prices: updated } : p)));
    setDrafts((prev) => {
      const next = { ...prev };
      delete next[product.id];
      return next;
    });
    toast({ title: 'Sparat', description: `Inköpspris uppdaterat för ${product.name}.` });
  };

  const fmt = (n: number) => `${Math.round(n).toLocaleString('sv-SE')} kr`;

  if (loading) {
    return <div className="py-8 text-center text-gray-500">Laddar översikt...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Översikt & vinst</h2>
        <p className="text-sm text-gray-500 mt-1">Endast synligt för admin. Här hanterar du inköpspriser och ser lönsamhet.</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-medium text-gray-500">Försäljning</CardTitle>
            <DollarSign className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fmt(kpis.revenue)}</div>
            <p className="text-xs text-gray-500 mt-1">{kpis.orderCount} ordrar</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-medium text-gray-500">Inköpskostnad</CardTitle>
            <ShoppingBag className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fmt(kpis.cost)}</div>
            <p className="text-xs text-gray-500 mt-1">{kpis.itemCount} artiklar</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-medium text-gray-500">Vinst</CardTitle>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${kpis.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>{fmt(kpis.profit)}</div>
            <p className="text-xs text-gray-500 mt-1">Försäljning − inköp</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-medium text-gray-500">Marginal</CardTitle>
            <Percent className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.margin.toFixed(1)}%</div>
            <p className="text-xs text-gray-500 mt-1">Vinst / försäljning</p>
          </CardContent>
        </Card>
      </div>

      {/* Purchase prices table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Inköpspriser</CardTitle>
          <p className="text-xs text-gray-500">Sätt vad ni betalar per produkt/storlek. Används för att räkna vinst — visas aldrig för kunder.</p>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produkt</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Storlek</TableHead>
                <TableHead className="text-right">Säljpris</TableHead>
                <TableHead className="text-right">Inköpspris</TableHead>
                <TableHead className="text-right">Vinst/st</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => {
                const sizes = getProductSizes(product.category);
                return sizes.map((size, idx) => {
                  const sellPrice = Number(product.prices?.[size] ?? 0);
                  const draftVal = drafts[product.id]?.[size];
                  const currentPurchase = Number(product.purchase_prices?.[size] ?? 0);
                  const purchaseVal = draftVal !== undefined ? draftVal : currentPurchase ? String(currentPurchase) : '';
                  const profitPerUnit = sellPrice - (parseFloat(purchaseVal || '0') || 0);
                  return (
                    <TableRow key={`${product.id}-${size}`}>
                      {idx === 0 ? (
                        <>
                          <TableCell rowSpan={sizes.length} className="font-medium align-top">{product.name}</TableCell>
                          <TableCell rowSpan={sizes.length} className="text-xs text-gray-500 align-top">{product.category}</TableCell>
                        </>
                      ) : null}
                      <TableCell className="text-sm">{sizeLabel(size)}</TableCell>
                      <TableCell className="text-right">{sellPrice ? `${sellPrice} kr` : '—'}</TableCell>
                      <TableCell className="text-right">
                        <Input
                          type="number"
                          inputMode="decimal"
                          value={purchaseVal}
                          onChange={(e) => setDraft(product.id, size, e.target.value)}
                          className="h-8 w-24 ml-auto text-right"
                          placeholder="0"
                        />
                      </TableCell>
                      <TableCell className={`text-right text-sm font-medium ${profitPerUnit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {sellPrice ? `${profitPerUnit.toFixed(0)} kr` : '—'}
                      </TableCell>
                      {idx === 0 ? (
                        <TableCell rowSpan={sizes.length} className="align-top">
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={!drafts[product.id]}
                            onClick={() => saveProduct(product)}
                            className="gap-1"
                          >
                            <Save className="w-3 h-3" />
                            Spara
                          </Button>
                        </TableCell>
                      ) : null}
                    </TableRow>
                  );
                });
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardOverview;