import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  LogOut, 
  Home, 
  Package, 
  Calendar, 
  Plus,
  Minus,
  Save,
  ArrowLeft
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface Order {
  id: string;
  package_plan: string;
  selected_days: string[];
  status: string;
  total_price: number;
  next_delivery_date: string | null;
  created_at: string;
  items: any;
}

interface FruitProduct {
  id: string;
  name: string;
  price: number;
  type: 'fruktkorg' | 'einzelprodukt';
}

const CustomerDashboard = () => {
  const { user, customer, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modifiedOrder, setModifiedOrder] = useState<Order | null>(null);

  // Available products
  const availableProducts: FruitProduct[] = [
    { id: 'fruktkorg-bas', name: 'Fruktkorg Bas', price: 450, type: 'fruktkorg' },
    { id: 'fruktkorg-premium', name: 'Fruktkorg Premium', price: 650, type: 'fruktkorg' },
    { id: 'fruktkorg-supreme', name: 'Fruktkorg Supreme', price: 850, type: 'fruktkorg' },
    { id: 'extra-bananer', name: 'Extra Bananer', price: 35, type: 'einzelprodukt' },
    { id: 'extra-äpplen', name: 'Extra Äpplen', price: 40, type: 'einzelprodukt' },
    { id: 'extra-apelsiner', name: 'Extra Apelsiner', price: 45, type: 'einzelprodukt' },
  ];

  // Available delivery days
  const availableDays = ['måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag'];

  useEffect(() => {
    fetchCurrentOrder();
  }, [customer]);

  const fetchCurrentOrder = async () => {
    if (!customer?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_id', customer.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (error) {
        console.error('Error fetching order:', error);
      } else {
        const order = data?.[0] || null;
        setCurrentOrder(order);
        setModifiedOrder(order ? { ...order } : null);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getPlanLabel = (plan: string) => {
    const planMap = {
      weekly: 'Veckovis',
      monthly: 'Månadsvis', 
      yearly: 'Årsvis'
    };
    return planMap[plan as keyof typeof planMap] || plan;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE');
  };

  const addProduct = (product: FruitProduct) => {
    if (!modifiedOrder) return;
    
    const currentItems = modifiedOrder.items || {};
    const currentQuantity = currentItems[product.id] || 0;
    
    const updatedItems = {
      ...currentItems,
      [product.id]: currentQuantity + 1
    };
    
    const newTotalPrice = modifiedOrder.total_price + product.price;
    
    setModifiedOrder({
      ...modifiedOrder,
      items: updatedItems,
      total_price: newTotalPrice
    });
  };

  const removeProduct = (product: FruitProduct) => {
    if (!modifiedOrder) return;
    
    const currentItems = modifiedOrder.items || {};
    const currentQuantity = currentItems[product.id] || 0;
    
    if (currentQuantity <= 0) return;
    
    const updatedItems = {
      ...currentItems,
      [product.id]: currentQuantity - 1
    };
    
    if (updatedItems[product.id] === 0) {
      delete updatedItems[product.id];
    }
    
    const newTotalPrice = modifiedOrder.total_price - product.price;
    
    setModifiedOrder({
      ...modifiedOrder,
      items: updatedItems,
      total_price: Math.max(0, newTotalPrice)
    });
  };

  const toggleDeliveryDay = (day: string) => {
    if (!modifiedOrder) return;
    
    const currentDays = modifiedOrder.selected_days || [];
    const updatedDays = currentDays.includes(day)
      ? currentDays.filter(d => d !== day)
      : [...currentDays, day];
    
    setModifiedOrder({
      ...modifiedOrder,
      selected_days: updatedDays
    });
  };

  const saveChanges = async () => {
    if (!modifiedOrder || !currentOrder) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('orders')
        .update({
          items: modifiedOrder.items,
          selected_days: modifiedOrder.selected_days,
          total_price: modifiedOrder.total_price
        })
        .eq('id', currentOrder.id);
      
      if (error) {
        toast({
          title: 'Fel',
          description: 'Kunde inte spara ändringar. Försök igen.',
          variant: 'destructive',
        });
      } else {
        setCurrentOrder(modifiedOrder);
        toast({
          title: 'Sparat!',
          description: 'Dina ändringar har sparats framgångsrikt.',
        });
      }
    } catch (error) {
      toast({
        title: 'Fel',
        description: 'Ett fel uppstod. Försök igen senare.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const hasChanges = () => {
    if (!currentOrder || !modifiedOrder) return false;
    
    return (
      JSON.stringify(currentOrder.items) !== JSON.stringify(modifiedOrder.items) ||
      JSON.stringify(currentOrder.selected_days) !== JSON.stringify(modifiedOrder.selected_days)
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Laddar kundportal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Simple Header */}
      <header className="header-professional">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span>Tillbaka</span>
              </Link>
              <div className="h-6 w-px bg-primary-foreground/30"></div>
              <h1 className="text-lg font-semibold text-primary-foreground">
                Välkommen, {customer?.contact_person}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="hidden sm:inline-flex">
                {currentOrder ? 'Aktiv prenumeration' : 'Ingen aktiv prenumeration'}
              </Badge>
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logga ut
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {!currentOrder ? (
          <Card className="card-product text-center">
              <CardContent className="py-12">
              <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="heading-md mb-4">Välkommen till din kundportal</h2>
              <p className="text-muted-foreground mb-6">
                Du har ingen aktiv fruktleverans just nu. Klicka nedan för att starta din beställning eller kontakta oss för hjälp.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/sortiment">
                  <Button className="btn-hero">
                    Beställ frukt
                  </Button>
                </Link>
                <Link to="/kontakt">
                  <Button variant="outline">
                    Kontakta oss
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Current Order Section */}
            <Card className="card-product">
              <CardHeader>
                <CardTitle className="flex items-center heading-md">
                  <Package className="w-6 h-6 mr-3 text-primary" />
                  Din aktiva prenumeration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Leveransplan</p>
                    <p className="text-lg font-semibold">{getPlanLabel(currentOrder.package_plan)}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Leveransdagar</p>
                    <p className="text-lg font-semibold capitalize">
                      {currentOrder.selected_days?.join(', ') || 'Inga dagar valda'}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Månadskostnad</p>
                    <p className="text-2xl font-bold price-primary">{currentOrder.total_price} kr</p>
                  </div>
                </div>

                {currentOrder.next_delivery_date && (
                  <div className="flex items-center p-4 bg-accent-light-green rounded-lg">
                    <Calendar className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Nästa leverans</p>
                      <p className="text-lg font-semibold">{formatDate(currentOrder.next_delivery_date)}</p>
                    </div>
                  </div>
                )}

                {/* Current Items */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Nuvarande produkter:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(currentOrder.items || {}).map(([productId, quantity]) => {
                      const product = availableProducts.find(p => p.id === productId);
                      const qty = Number(quantity);
                      if (!product || qty === 0) return null;
                      
                      return (
                        <div key={productId} className="flex justify-between items-center p-3 bg-card rounded-lg border">
                          <span className="font-medium">{product.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {qty} st × {product.price} kr
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Modify Order Section */}
            <Card className="card-product">
              <CardHeader>
                <CardTitle className="heading-md">Ändra din beställning</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Add/Remove Products */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Lägg till eller ta bort produkter</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {availableProducts.map((product) => {
                      const currentQuantity = modifiedOrder?.items?.[product.id] || 0;
                      
                      return (
                        <div key={product.id} className="p-4 border rounded-lg bg-card">
                          <div className="space-y-3">
                            <div>
                              <h5 className="font-medium">{product.name}</h5>
                              <p className="text-sm text-muted-foreground">{product.price} kr</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => removeProduct(product)}
                                disabled={currentQuantity === 0}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="font-medium px-4">{currentQuantity} st</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => addProduct(product)}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Change Delivery Days */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Ändra leveransdagar</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {availableDays.map((day) => {
                      const isSelected = modifiedOrder?.selected_days?.includes(day) || false;
                      
                      return (
                        <div key={day} className="flex items-center space-x-2">
                          <Checkbox
                            id={`day-${day}`}
                            checked={isSelected}
                            onCheckedChange={() => toggleDeliveryDay(day)}
                          />
                          <label
                            htmlFor={`day-${day}`}
                            className="text-sm font-medium capitalize cursor-pointer"
                          >
                            {day}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* New Total Cost */}
                {modifiedOrder && (
                  <div className="flex items-center justify-between p-4 bg-accent-light-green rounded-lg">
                    <span className="font-semibold">Ny månadskostnad:</span>
                    <span className="text-2xl font-bold price-primary">
                      {modifiedOrder.total_price} kr
                    </span>
                  </div>
                )}

                {/* Save Changes Button */}
                <div className="flex justify-end">
                  <Button
                    onClick={saveChanges}
                    disabled={!hasChanges() || saving}
                    className="btn-hero"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sparar...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Spara ändringar
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
};

export default CustomerDashboard;