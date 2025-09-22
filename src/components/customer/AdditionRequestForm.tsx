import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Minus, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RequestItem {
  name: string;
  price: number;
  quantity: number;
  type: 'permanent' | 'one-time';
}

const AdditionRequestForm = () => {
  const { customer } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<RequestItem[]>([
    { name: '', price: 0, quantity: 1, type: 'permanent' }
  ]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const addItem = () => {
    setItems([...items, { name: '', price: 0, quantity: 1, type: 'permanent' }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: keyof RequestItem, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const calculateTotals = () => {
    const monthlyTotal = items
      .filter(item => item.type === 'permanent' && item.name.trim())
      .reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const onetimeTotal = items
      .filter(item => item.type === 'one-time' && item.name.trim())
      .reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return { monthlyTotal, onetimeTotal };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer) return;

    const validItems = items.filter(item => item.name.trim() && item.price > 0);
    if (validItems.length === 0) {
      toast({
        title: "Fel",
        description: "Lägg till minst en artikel med namn och pris",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { monthlyTotal, onetimeTotal } = calculateTotals();

    try {
      const { error } = await supabase
        .from('addition_requests')
        .insert({
          customer_id: customer.id,
          customer_name: customer.contact_person,
          customer_email: customer.email,
          items: validItems as any,
          total_monthly_cost: monthlyTotal,
          total_onetime_cost: onetimeTotal,
          message: message.trim(),
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Förfrågan skickad!",
        description: "Din förfrågan har skickats till administratören för granskning.",
      });

      // Reset form
      setItems([{ name: '', price: 0, quantity: 1, type: 'permanent' }]);
      setMessage('');
    } catch (error: any) {
      toast({
        title: "Fel",
        description: "Något gick fel när förfrågan skickades.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const { monthlyTotal, onetimeTotal } = calculateTotals();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Begär tilläggsartiklar
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Lägg till produkter till din befintliga beställning, antingen permanent eller som engångsleverans.
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Items */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Artiklar att lägga till</Label>
            {items.map((item, index) => (
              <Card key={index} className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor={`name-${index}`}>Produktnamn</Label>
                    <Input
                      id={`name-${index}`}
                      value={item.name}
                      onChange={(e) => updateItem(index, 'name', e.target.value)}
                      placeholder="t.ex. Äpplen, Bananer, Kaffe"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`price-${index}`}>Pris (SEK)</Label>
                    <Input
                      id={`price-${index}`}
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.price}
                      onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`quantity-${index}`}>Antal</Label>
                    <div className="flex items-center space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => updateItem(index, 'quantity', Math.max(1, item.quantity - 1))}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Input
                        id={`quantity-${index}`}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                        className="w-20 text-center"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => updateItem(index, 'quantity', item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <Label htmlFor={`type-${index}`}>Leveranstyp</Label>
                    <Select
                      value={item.type}
                      onValueChange={(value: 'permanent' | 'one-time') => updateItem(index, 'type', value)}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="permanent">Permanent</SelectItem>
                        <SelectItem value="one-time">Engångs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">
                      {item.price * item.quantity} SEK
                    </Badge>
                    {items.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(index)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
            
            <Button type="button" variant="outline" onClick={addItem}>
              <Plus className="w-4 h-4 mr-2" />
              Lägg till artikel
            </Button>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Meddelande (valfritt)</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Lägg till eventuella kommentarer eller specialönskemål..."
              rows={3}
            />
          </div>

          {/* Totals */}
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Permanent tilläggsköp (månadsvis):</span>
                  <Badge variant="default">{monthlyTotal.toFixed(2)} SEK</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Engångsleverans:</span>
                  <Badge variant="outline">{onetimeTotal.toFixed(2)} SEK</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              'Skickar förfrågan...'
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Skicka förfrågan
              </>
            )}
          </Button>
          
          <Alert>
            <AlertDescription>
              Din förfrågan kommer att granskas av vår administratör. Du kommer att få bekräftelse via e-post när ändringar har gjorts i din beställning.
            </AlertDescription>
          </Alert>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdditionRequestForm;