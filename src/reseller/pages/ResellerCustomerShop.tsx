import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useResellerCustomerAuth } from '../contexts/ResellerCustomerAuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LogOut, ShoppingCart, Plus, Minus, Trash2, Send, Package, User, History, CalendarIcon, Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  category: string;
  image_url: string;
  prices: Record<string, number>;
  description: string | null;
}

interface CartItem {
  product: Product;
  size: string | null;
  quantity: number;
  price: number;
}

interface StandardPrice {
  product_id: string;
  price: number;
  size: string | null;
}

interface CustomerPrice {
  product_id: string;
  price: number;
  size: string | null;
}

interface ResellerOrder {
  id: string;
  items: any;
  total_price: number | null;
  notes: string | null;
  status: string;
  selected_days: string[] | null;
  created_at: string;
}

const categoryLabels: Record<string, string> = {
  fruktkorgar: 'Fruktkorgar', fruktpasar: 'Fruktpåsar', lask: 'Läsk',
  mejeri: 'Mejeri', kaffe: 'Kaffe & Te', frukost: 'Frukost',
  snacks: 'Snacks', grönsaker: 'Grönsaker', stad: 'Städ', annat: 'Annat',
};

const statusLabels: Record<string, string> = {
  pending: 'Väntande',
  confirmed: 'Bekräftad',
  delivered: 'Levererad',
  cancelled: 'Avbruten',
};

const ResellerCustomerShop = () => {
  const { user, customerProfile, reseller, logout } = useResellerCustomerAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [standardPrices, setStandardPrices] = useState<StandardPrice[]>([]);
  const [customerPrices, setCustomerPrices] = useState<CustomerPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [orderNotes, setOrderNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mainTab, setMainTab] = useState('shop');
  const [orders, setOrders] = useState<ResellerOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (customerProfile && reseller) {
      fetchData();
    }
  }, [customerProfile, reseller]);

  useEffect(() => {
    if (mainTab === 'history' && customerProfile) {
      fetchOrders();
    }
  }, [mainTab, customerProfile]);

  const fetchData = async () => {
    if (!customerProfile || !reseller) return;

    const [productsRes, standardRes, customerRes] = await Promise.all([
      supabase.from('products').select('*').order('display_order', { ascending: true, nullsFirst: false }),
      supabase.from('reseller_product_prices').select('product_id, price, size').eq('reseller_id', reseller.id),
      supabase.from('reseller_customer_prices').select('product_id, price, size').eq('reseller_customer_id', customerProfile.id),
    ]);

    if (productsRes.data) {
      setProducts(productsRes.data.map(p => ({
        ...p,
        prices: (typeof p.prices === 'object' && p.prices !== null ? p.prices : {}) as Record<string, number>,
      })));
    }
    if (standardRes.data) setStandardPrices(standardRes.data);
    if (customerRes.data) setCustomerPrices(customerRes.data);
    setLoading(false);
  };

  const fetchOrders = async () => {
    if (!customerProfile) return;
    setOrdersLoading(true);
    const { data } = await supabase
      .from('reseller_orders')
      .select('id, items, total_price, notes, status, selected_days, created_at')
      .eq('reseller_customer_id', customerProfile.id)
      .order('created_at', { ascending: false });
    if (data) setOrders(data);
    setOrdersLoading(false);
  };

  const getPrice = (productId: string, size: string | null): number | null => {
    const cp = customerPrices.find(p => p.product_id === productId && p.size === size);
    if (cp) return cp.price;
    const sp = standardPrices.find(p => p.product_id === productId && p.size === size);
    if (sp) return sp.price;
    return null;
  };

  const getAvailableProducts = (): Product[] => {
    return products.filter(p => {
      const sizes = Object.keys(p.prices);
      if (sizes.length > 1) {
        return sizes.some(s => getPrice(p.id, s) !== null);
      }
      return getPrice(p.id, null) !== null;
    });
  };

  const addToCart = (product: Product, size: string | null, price: number) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.size === size);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, size, quantity: 1, price }];
    });
    toast({ title: 'Tillagd', description: `${product.name} ${size ? `(${size})` : ''} tillagd i varukorgen.` });
  };

  const updateCartQuantity = (productId: string, size: string | null, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.product.id === productId && i.size === size) {
        const newQty = i.quantity + delta;
        return newQty <= 0 ? null! : { ...i, quantity: newQty };
      }
      return i;
    }).filter(Boolean));
  };

  const removeFromCart = (productId: string, size: string | null) => {
    setCart(prev => prev.filter(i => !(i.product.id === productId && i.size === size)));
  };

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleSubmitOrder = async () => {
    if (!customerProfile || !reseller || cart.length === 0) return;

    if (!deliveryDate) {
      toast({ title: 'Välj leveransdatum', description: 'Du måste välja ett leveransdatum.', variant: 'destructive' });
      return;
    }

    setSubmitting(true);

    try {
      const items = cart.map(i => ({
        product_id: i.product.id,
        product_name: i.product.name,
        size: i.size,
        quantity: i.quantity,
        unit_price: i.price,
        total: i.price * i.quantity,
      }));

      const { error } = await supabase.from('reseller_orders').insert({
        reseller_id: reseller.id,
        reseller_customer_id: customerProfile.id,
        items,
        total_price: totalPrice,
        notes: orderNotes || null,
        selected_days: [format(deliveryDate, 'yyyy-MM-dd')],
        status: 'pending',
      });

      if (error) {
        toast({ title: 'Fel', description: 'Kunde inte skicka beställningen.', variant: 'destructive' });
      } else {
        toast({ title: 'Beställning skickad!', description: `Leveransdatum: ${format(deliveryDate, 'PPP', { locale: sv })}` });
        setCart([]);
        setOrderNotes('');
        setDeliveryDate(undefined);
        setShowOrderDialog(false);
        setShowCart(false);
      }
    } catch {
      toast({ title: 'Fel', description: 'Något gick fel.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/af/kund/login');
  };

  const availableProducts = getAvailableProducts();
  const groupedProducts = availableProducts.reduce<Record<string, Product[]>>((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {});
  const categories = Object.keys(groupedProducts);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {reseller?.logo_url ? (
              <img src={reseller.logo_url} alt={reseller?.name} className="h-8 object-contain" />
            ) : (
              <span className="font-bold text-lg">{reseller?.name}</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {customerProfile?.company_name}
            </span>

            <Button
              variant="outline"
              size="sm"
              className="relative"
              onClick={() => setShowCart(!showCart)}
            >
              <ShoppingCart className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>

            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Main navigation tabs */}
        <Tabs value={mainTab} onValueChange={setMainTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="shop" className="gap-1.5">
              <Store className="w-4 h-4" />
              <span className="hidden sm:inline">Beställ</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-1.5">
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">Historik</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-1.5">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profil</span>
            </TabsTrigger>
          </TabsList>

          {/* === SHOP TAB === */}
          <TabsContent value="shop" className="space-y-4">
            {/* Cart */}
            {showCart && cart.length > 0 && (
              <div className="bg-white rounded-xl border border-border p-4 space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" /> Varukorg ({totalItems} artiklar)
                </h3>
                {cart.map(item => (
                  <div key={`${item.product.id}-${item.size}`} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex-1">
                      <span className="font-medium text-sm">{item.product.name}</span>
                      {item.size && <span className="text-xs text-muted-foreground ml-1">({item.size})</span>}
                      <span className="text-sm text-muted-foreground ml-2">{item.price} kr/st</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateCartQuantity(item.product.id, item.size, -1)}>
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateCartQuantity(item.product.id, item.size, 1)}>
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeFromCart(item.product.id, item.size)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2">
                  <span className="font-semibold">Totalt: {totalPrice} kr</span>
                  <Button onClick={() => setShowOrderDialog(true)}>
                    <Send className="w-4 h-4 mr-1" /> Skicka beställning
                  </Button>
                </div>
              </div>
            )}

            {/* Products */}
            {categories.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Inga produkter tillgängliga just nu.</p>
                </CardContent>
              </Card>
            ) : (
              <Tabs defaultValue={categories[0]} className="space-y-4">
                <TabsList className="flex-wrap h-auto gap-1">
                  {categories.map(cat => (
                    <TabsTrigger key={cat} value={cat} className="text-xs sm:text-sm">
                      {categoryLabels[cat] || cat}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {categories.map(cat => (
                  <TabsContent key={cat} value={cat}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                      {groupedProducts[cat].map(product => {
                        const sizes = Object.keys(product.prices);
                        const hasSizes = sizes.length > 1;

                        return (
                          <Card
                            key={product.id}
                            className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => setSelectedProduct(product)}
                          >
                            <div className="aspect-square bg-slate-100">
                              <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                onError={(e) => { (e.target as HTMLImageElement).src = '/assets/product-placeholder.jpg'; }}
                              />
                            </div>
                            <CardContent className="p-3 space-y-2">
                              <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
                              {hasSizes ? (
                                <div className="space-y-1">
                                  {sizes.map(size => {
                                    const price = getPrice(product.id, size);
                                    if (price === null) return null;
                                    return (
                                      <div key={size} className="flex items-center justify-between gap-1">
                                        <span className="text-xs text-muted-foreground">{size}</span>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="h-7 text-xs"
                                          onClick={(e) => { e.stopPropagation(); addToCart(product, size, price); }}
                                        >
                                          {price} kr
                                        </Button>
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                (() => {
                                  const price = getPrice(product.id, null);
                                  if (price === null) return null;
                                  return (
                                    <Button
                                      size="sm"
                                      className="w-full h-8 text-xs"
                                      onClick={(e) => { e.stopPropagation(); addToCart(product, null, price); }}
                                    >
                                      {price} kr – Lägg till
                                    </Button>
                                  );
                                })()
                              )}
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </TabsContent>

          {/* === HISTORY TAB === */}
          <TabsContent value="history" className="space-y-4">
            <h2 className="text-xl font-semibold">Orderhistorik</h2>
            {ordersLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : orders.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Inga beställningar ännu.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {orders.map(order => {
                  const items = Array.isArray(order.items) ? order.items : [];
                  const deliveryDateStr = order.selected_days?.[0];
                  return (
                    <Card key={order.id}>
                      <CardContent className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium text-sm">
                              {format(new Date(order.created_at), 'PPP', { locale: sv })}
                            </span>
                            {deliveryDateStr && (
                              <span className="text-xs text-muted-foreground ml-2">
                                Leverans: {deliveryDateStr}
                              </span>
                            )}
                          </div>
                          <span className={cn(
                            "text-xs font-medium px-2 py-1 rounded-full",
                            order.status === 'pending' && "bg-yellow-100 text-yellow-800",
                            order.status === 'confirmed' && "bg-blue-100 text-blue-800",
                            order.status === 'delivered' && "bg-green-100 text-green-800",
                            order.status === 'cancelled' && "bg-red-100 text-red-800",
                          )}>
                            {statusLabels[order.status] || order.status}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-0.5">
                          {items.map((item: any, idx: number) => (
                            <div key={idx}>
                              {item.quantity}x {item.product_name} {item.size ? `(${item.size})` : ''} — {item.total} kr
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t">
                          <span className="font-semibold text-sm">Totalt: {order.total_price} kr</span>
                          {order.notes && (
                            <span className="text-xs text-muted-foreground italic">"{order.notes}"</span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* === PROFILE TAB === */}
          <TabsContent value="profile" className="space-y-4">
            <h2 className="text-xl font-semibold">Min profil</h2>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label className="text-muted-foreground text-xs">Företag</Label>
                    <p className="font-medium">{customerProfile?.company_name || '—'}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Kontaktperson</Label>
                    <p className="font-medium">{customerProfile?.contact_person || '—'}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">E-post</Label>
                    <p className="font-medium">{customerProfile?.email || '—'}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Telefon</Label>
                    <p className="font-medium">{customerProfile?.phone || '—'}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="text-muted-foreground text-xs">Adress</Label>
                    <p className="font-medium">{customerProfile?.address || '—'}</p>
                  </div>
                </div>
                {reseller?.contact_email && (
                  <p className="text-xs text-muted-foreground pt-2 border-t">
                    Behöver du ändra dina uppgifter? Kontakta{' '}
                    <a href={`mailto:${reseller.contact_email}`} className="underline hover:text-primary">
                      {reseller.contact_email}
                    </a>
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Product detail dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => { if (!open) setSelectedProduct(null); }}>
        <DialogContent className="sm:max-w-lg">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProduct.name}</DialogTitle>
              </DialogHeader>
              <img
                src={selectedProduct.image_url}
                alt={selectedProduct.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              {selectedProduct.description && (
                <p className="text-sm text-muted-foreground">{selectedProduct.description}</p>
              )}
              <div className="space-y-2">
                {(() => {
                  const sizes = Object.keys(selectedProduct.prices);
                  if (sizes.length > 1) {
                    return sizes.map(size => {
                      const price = getPrice(selectedProduct.id, size);
                      if (price === null) return null;
                      return (
                        <div key={size} className="flex items-center justify-between">
                          <span>{size}</span>
                          <Button size="sm" onClick={() => { addToCart(selectedProduct, size, price); setSelectedProduct(null); }}>
                            {price} kr – Lägg till
                          </Button>
                        </div>
                      );
                    });
                  }
                  const price = getPrice(selectedProduct.id, null);
                  if (price === null) return <p className="text-muted-foreground">Pris ej satt.</p>;
                  return (
                    <Button className="w-full" onClick={() => { addToCart(selectedProduct, null, price); setSelectedProduct(null); }}>
                      {price} kr – Lägg till i varukorg
                    </Button>
                  );
                })()}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Order confirmation dialog with delivery date */}
      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Bekräfta beställning</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border rounded-lg p-3 space-y-1 max-h-48 overflow-y-auto">
              {cart.map(item => (
                <div key={`${item.product.id}-${item.size}`} className="flex justify-between text-sm">
                  <span>{item.quantity}x {item.product.name} {item.size ? `(${item.size})` : ''}</span>
                  <span>{item.price * item.quantity} kr</span>
                </div>
              ))}
              <div className="border-t pt-1 mt-2 flex justify-between font-semibold text-sm">
                <span>Totalt</span>
                <span>{totalPrice} kr</span>
              </div>
            </div>

            {/* Delivery date picker */}
            <div className="space-y-2">
              <Label className="font-medium">Önskat leveransdatum *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !deliveryDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {deliveryDate ? format(deliveryDate, 'PPP', { locale: sv }) : 'Välj leveransdatum'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={deliveryDate}
                    onSelect={setDeliveryDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Meddelande / anteckningar (valfritt)</Label>
              <Textarea
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="T.ex. leveranstid, specialönskemål..."
                rows={3}
              />
            </div>

            <Button className="w-full" onClick={handleSubmitOrder} disabled={submitting}>
              {submitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Skickar...
                </div>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-1" /> Skicka beställning
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating cart button for mobile */}
      {totalItems > 0 && !showCart && (
        <button
          onClick={() => { setMainTab('shop'); setShowCart(true); }}
          className="fixed bottom-6 right-6 bg-primary text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow sm:hidden z-50"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        </button>
      )}
    </div>
  );
};

export default ResellerCustomerShop;
