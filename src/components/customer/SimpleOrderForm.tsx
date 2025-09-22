import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Plus, Minus, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

const SimpleOrderForm = () => {
  const { toast } = useToast();
  const [orderType, setOrderType] = useState<'one-time' | 'subscription'>('one-time');
  const [items, setItems] = useState<OrderItem[]>([
    { id: '1', name: 'Äpplen', price: 25, quantity: 0, category: 'fruit' },
    { id: '2', name: 'Bananer', price: 30, quantity: 0, category: 'fruit' },
    { id: '3', name: 'Apelsiner', price: 35, quantity: 0, category: 'fruit' },
    { id: '4', name: 'Kaffe', price: 45, quantity: 0, category: 'drinks' },
    { id: '5', name: 'Te', price: 40, quantity: 0, category: 'drinks' },
    { id: '6', name: 'Mjölk', price: 20, quantity: 0, category: 'dairy' },
    { id: '7', name: 'Yoghurt', price: 25, quantity: 0, category: 'dairy' },
    { id: '8', name: 'Coca-Cola', price: 18, quantity: 0, category: 'soft-drinks' },
  ]);

  const updateQuantity = (itemId: string, change: number) => {
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    ));
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getSelectedItems = () => {
    return items.filter(item => item.quantity > 0);
  };

  const handleSaveChanges = () => {
    const selectedItems = getSelectedItems();
    if (selectedItems.length === 0) {
      toast({
        title: "Ingen ändring",
        description: "Lägg till minst en artikel för att spara ändringar.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically save to database
    toast({
      title: "Ändringar sparade!",
      description: `${selectedItems.length} artiklar har lagts till i din ${orderType === 'one-time' ? 'engångsbeställning' : 'prenumeration'}.`,
    });
  };

  const categories = [
    { id: 'fruit', name: 'Frukt', items: items.filter(item => item.category === 'fruit') },
    { id: 'drinks', name: 'Kaffe & Te', items: items.filter(item => item.category === 'drinks') },
    { id: 'dairy', name: 'Mejeri', items: items.filter(item => item.category === 'dairy') },
    { id: 'soft-drinks', name: 'Läsk', items: items.filter(item => item.category === 'soft-drinks') },
  ];

  return (
    <div className="space-y-6">
      {/* Order Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Välj beställningstyp</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={orderType} onValueChange={(value: 'one-time' | 'subscription') => setOrderType(value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="one-time" id="one-time" />
              <Label htmlFor="one-time" className="font-normal">
                <div>
                  <div className="font-medium">Engångsartikel</div>
                  <div className="text-sm text-muted-foreground">Lägg till artiklar för en engångsleverans</div>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="subscription" id="subscription" />
              <Label htmlFor="subscription" className="font-normal">
                <div>
                  <div className="font-medium">Lägg till Prenumeration</div>
                  <div className="text-sm text-muted-foreground">Lägg till artiklar till din återkommande beställning</div>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Product Grid */}
      <div className="space-y-6">
        {categories.map(category => (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle className="text-lg">{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.items.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.price} SEK</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity === 0}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Badge variant="secondary" className="min-w-[2rem] text-center">
                        {item.quantity}
                      </Badge>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary and Save */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Totalt:</span>
              <Badge variant="default" className="text-lg">
                {getTotalPrice()} SEK
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              Beställningstyp: {orderType === 'one-time' ? 'Engångsartikel' : 'Prenumeration'}
            </div>
            <Button 
              onClick={handleSaveChanges} 
              className="w-full"
              size="lg"
            >
              <Save className="w-4 h-4 mr-2" />
              Spara ändringar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleOrderForm;