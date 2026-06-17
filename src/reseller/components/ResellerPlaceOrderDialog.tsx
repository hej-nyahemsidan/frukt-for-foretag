import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useResellerAuth } from '../contexts/ResellerAuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, Trash2, Send, ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  prices: Record<string, number>;
}

interface PriceRow {
  product_id: string;
  price: number;
  size: string | null;
}

interface CartItem {
  product: Product;
  size: string | null;
  quantity: number;
  price: number;
}

interface Props {
  customerId: string;
  customerName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPlaced?: () => void;
}

const categoryLabels: Record<string, string> = {
  fruktkorgar: 'Fruktkorgar', fruktpasar: 'Fruktpåsar', lask: 'Läsk',
  mejeri: 'Mejeri', kaffe: 'Kaffe & Te', frukost: 'Frukost',
  snacks: 'Snacks', grönsaker: 'Grönsaker', stad: 'Städ', annat: 'Annat',
};

const ResellerPlaceOrderDialog = ({ customerId, customerName, open, onOpenChange, onPlaced }: Props) => {
  const { reseller } = useResellerAuth();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [standardPrices, setStandardPrices] = useState<PriceRow[]>([]);
  const [customerPrices, setCustomerPrices] = useState<PriceRow[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open && reseller) load();
    if (!open) { setCart([]); setNotes(''); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, reseller, customerId]);

  const load = async () => {
    if (!reseller) return;
    setLoading(true);
    const [pRes, spRes, cpRes] = await Promise.all([
      supabase.from('products').select('id, name, category, prices').order('category'),
      supabase.from('reseller_product_prices').select('product_id, price, size').eq('reseller_id', reseller.id),
      supabase.from('reseller_customer_prices').select('product_id, price, size').eq('reseller_customer_id', customerId),
    ]);
    setProducts((pRes.data || []).map(p => ({
      ...p,
      prices: (typeof p.prices === 'object' && p.prices !== null ? p.prices : {}) as Record<string, number>,
    })));
    setStandardPrices(spRes.data || []);
    setCustomerPrices(cpRes.data || []);
    setLoading(false);
  };

  const getPrice = (productId: string, size: string | null): number | null => {
    const cp = customerPrices.find(p => p.product_id === productId && p.size === size);
    if (cp) return cp.price;
    const sp = standardPrices.find(p => p.product_id === productId && p.size === size);
    return sp ? sp.price : null;
  };

  const grouped = useMemo(() => {
    const map: Record<string, Product[]> = {};
    products.forEach(p => {
      const sizes = Object.keys(p.prices);
      const hasPrice = sizes.length > 1
        ? sizes.some(s => getPrice(p.id, s) !== null)
        : getPrice(p.id, null) !== null;
      if (hasPrice) {
        if (!map[p.category]) map[p.category] = [];
        map[p.category].push(p);
      }
    });
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, standardPrices, customerPrices]);

  const addToCart = (product: Product, size: string | null) => {
    const price = getPrice(product.id, size);
    if (price === null) return;
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.size === size);
      if (existing) {
        return prev.map(i => i === existing ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { product, size, quantity: 1, price }];
    });
  };

  const updateQty = (idx: number, delta: number) => {
    setCart(prev => prev.map((i, j) => j === idx ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));
  };

  const removeItem = (idx: number) => setCart(prev => prev.filter((_, j) => j !== idx));

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const submit = async () => {
    if (!reseller || cart.length === 0) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from('reseller_orders').insert({
        reseller_id: reseller.id,
        reseller_customer_id: customerId,
        items: cart.map(i => ({
          product_id: i.product.id,
          name: i.product.name,
          size: i.size,
          quantity: i.quantity,
          price: i.price,
        })),
        total_price: total,
        notes: notes || null,
        status: 'pending',
      });
      if (error) {
        toast({ title: 'Fel', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Order skapad', description: `Order åt ${customerName} har skickats.` });
        onPlaced?.();
        onOpenChange(false);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Lägg order åt {customerName}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 overflow-hidden">
          {/* Products */}
          <div className="md:col-span-2 overflow-y-auto pr-2 space-y-4">
            {loading ? (
              <p className="text-muted-foreground text-sm">Laddar produkter...</p>
            ) : Object.keys(grouped).length === 0 ? (
              <p className="text-muted-foreground text-sm py-8 text-center">
                Inga produkter med pris satt för denna kund. Sätt standardpriser eller kundpriser först.
              </p>
            ) : (
              Object.entries(grouped).map(([cat, prods]) => (
                <div key={cat}>
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                    {categoryLabels[cat] || cat}
                  </h4>
                  <div className="space-y-2">
                    {prods.map(p => {
                      const sizes = Object.keys(p.prices);
                      if (sizes.length > 1) {
                        return sizes.map(size => {
                          const price = getPrice(p.id, size);
                          if (price === null) return null;
                          return (
                            <div key={`${p.id}-${size}`} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30">
                              <div>
                                <div className="text-sm font-medium">{p.name}</div>
                                <div className="text-xs text-muted-foreground">{size} · {price} kr</div>
                              </div>
                              <Button size="sm" variant="outline" onClick={() => addToCart(p, size)}>
                                <Plus className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          );
                        });
                      }
                      const price = getPrice(p.id, null);
                      if (price === null) return null;
                      return (
                        <div key={p.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30">
                          <div>
                            <div className="text-sm font-medium">{p.name}</div>
                            <div className="text-xs text-muted-foreground">{price} kr</div>
                          </div>
                          <Button size="sm" variant="outline" onClick={() => addToCart(p, null)}>
                            <Plus className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart */}
          <div className="border rounded-lg p-4 flex flex-col overflow-hidden bg-muted/20">
            <div className="flex items-center gap-2 mb-3">
              <ShoppingCart className="w-4 h-4" />
              <span className="font-semibold text-sm">Order</span>
              <Badge variant="secondary" className="ml-auto">{cart.length}</Badge>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 mb-3">
              {cart.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-8">
                  Lägg till produkter från listan
                </p>
              ) : (
                cart.map((i, idx) => (
                  <div key={idx} className="bg-background border rounded-md p-2">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="text-xs font-medium flex-1">{i.product.name}</div>
                      <button onClick={() => removeItem(idx)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    {i.size && <div className="text-[10px] text-muted-foreground mb-1">{i.size}</div>}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <button onClick={() => updateQty(idx, -1)} className="w-6 h-6 rounded border flex items-center justify-center hover:bg-muted">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs w-6 text-center">{i.quantity}</span>
                        <button onClick={() => updateQty(idx, 1)} className="w-6 h-6 rounded border flex items-center justify-center hover:bg-muted">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-xs font-medium">{i.price * i.quantity} kr</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="space-y-2">
              <div>
                <Label className="text-xs">Notering</Label>
                <Textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} className="text-xs" placeholder="Önskemål, leveransdag..." />
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm font-semibold">Totalt</span>
                <span className="text-lg font-bold">{total.toLocaleString('sv-SE')} kr</span>
              </div>
              <Button onClick={submit} disabled={cart.length === 0 || submitting} className="w-full" size="sm">
                <Send className="w-3.5 h-3.5 mr-1" />
                {submitting ? 'Skickar...' : 'Skicka order'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResellerPlaceOrderDialog;