import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface SimplifiedCheckoutProps {
  packagePlan: string;
  orderType: string;
  selectedDays: string[];
  currentDay: string;
  onBack: () => void;
}

const SimplifiedCheckout = ({
  packagePlan,
  orderType,
  selectedDays,
  currentDay,
  onBack
}) => {
  const navigate = useNavigate();
  const { items, clearCart, getItemsByOrderType } = useCart();
  const { customer } = useAuth();
  const { toast } = useToast();
  const [isConfirming, setIsConfirming] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [message, setMessage] = useState('');
  
  // Filter items by current order type
  const relevantItems = getItemsByOrderType(orderType);

  const getOrderTypeText = (type: string) => {
    return type === 'subscription' ? 'Prenumeration' : 'Engångsköp';
  };

  const calculateTotal = () => {
    return relevantItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleConfirmOrder = async () => {
    setIsConfirming(true);
    
    try {
      // Send order confirmation email
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          formType: 'Orderbekräftelse',
          customerInfo: {
            company: customer?.company_name,
            contact: customer?.contact_person,
            email: customer?.email,
            phone: customer?.phone,
            address: customer?.address,
          },
          orderType: getOrderTypeText(orderType),
          selectedDays: selectedDays,
          items: relevantItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            assignedDay: item.assignedDay,
          })),
          totalPrice: calculateTotal(),
          message: message.trim() || undefined,
        }
      });

      if (error) {
        console.error('Error sending order email:', error);
        toast({
          title: "Varning",
          description: "Beställningen registrerades men e-postbekräftelsen misslyckades.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Beställning bekräftad!",
          description: "Din fruktleverans har uppdaterats framgångsrikt.",
        });
      }

      // Clear cart and show confirmation
      clearCart();
      setOrderConfirmed(true);
    } catch (error) {
      console.error('Error confirming order:', error);
      toast({
        title: "Ett fel uppstod",
        description: "Kunde inte bekräfta beställningen. Vänligen försök igen.",
        variant: "destructive",
      });
    } finally {
      setIsConfirming(false);
    }
  };

  if (orderConfirmed) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-charcoal mb-4">
            Tack! Din beställning är bekräftad
          </h2>
          <p className="text-muted-foreground mb-6">
            Vi har uppdaterat din fruktleverans enligt dina önskemål. 
            Du kommer att få en bekräftelse via e-post inom kort.
          </p>
          <Button 
            onClick={() => navigate('/kundportal')}
            className="bg-secondary text-secondary-foreground hover:bg-[hsl(122_39%_44%)]"
          >
            Tillbaka till Mina Sidor
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-charcoal">Bekräfta din beställning</h2>
        <Button variant="outline" onClick={onBack}>
          Tillbaka
        </Button>
      </div>

      {/* Single Card with Order Summary and Confirmation */}
      <Card>
        <CardHeader>
          <CardTitle>Beställningssammanfattning</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Customer Info */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-charcoal mb-2">Kundinformation</h3>
            <p className="text-sm text-muted-foreground">
              <strong>Företag:</strong> {customer?.company_name || 'Ej angivet'}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Kontakt:</strong> {customer?.contact_person || 'Ej angivet'}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>E-post:</strong> {customer?.email || 'Ej angivet'}
            </p>
          </div>

          {/* Delivery Plan */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-charcoal mb-2">Leveransplan</h3>
            <p className="text-muted-foreground mb-2">{getOrderTypeText(orderType)}</p>
            <div>
              <span className="font-medium">Leveransdagar: </span>
              <span className="text-muted-foreground">
                {selectedDays.length > 0 ? selectedDays.join(', ') : 'Inga dagar valda'}
              </span>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-charcoal mb-3">Produkter</h3>
            {relevantItems.length === 0 ? (
              <p className="text-muted-foreground">Inga produkter valda</p>
            ) : (
            <div className="space-y-6">
              {selectedDays.map(day => {
                const dayItems = relevantItems.filter(item => item.assignedDay === day);
                if (dayItems.length === 0) return null;
                  
                  return (
                    <div key={day} className="border rounded-lg p-4 bg-gray-50">
                      <h4 className="font-semibold text-green-600 mb-3">{day}</h4>
                      <div className="space-y-2">
                        {dayItems.map((item, idx) => (
                          <div key={`${item.id}-${idx}`} className="flex justify-between items-center p-2 bg-white rounded">
                            <div>
                              <span className="font-medium">{item.name}</span>
                              <div className="text-sm text-muted-foreground">
                                Antal: {item.quantity} × {item.price} kr
                              </div>
                            </div>
                            <span className="font-semibold text-charcoal">
                              {item.price * item.quantity} kr
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
                
                {/* Total Price */}
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border-2 border-green-200 mt-4">
                  <span className="text-lg font-bold text-charcoal">Totalpris:</span>
                  <span className="text-2xl font-bold text-green-600">
                    {calculateTotal()} kr
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Confirmation Section */}
          <div className="pt-6 border-t mt-6">
            <h3 className="font-semibold text-charcoal mb-4">Meddelande (valfritt)</h3>
            <div className="mb-4">
              <Label htmlFor="order-message" className="text-sm text-muted-foreground mb-2 block">
                Lägg till extra information om din beställning
              </Label>
              <Textarea
                id="order-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="T.ex. särskilda leveransinstruktioner, allergier, eller andra önskemål..."
                className="min-h-[100px] resize-none"
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground mt-1 text-right">
                {message.length}/500 tecken
              </p>
            </div>

            <h3 className="font-semibold text-charcoal mb-4 mt-6">Bekräfta och slutför</h3>
            
            <Button
              onClick={handleConfirmOrder}
              disabled={isConfirming || relevantItems.length === 0 || selectedDays.length === 0}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
            >
              {isConfirming ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Bekräftar beställning...
                </>
              ) : (
                'Bekräfta beställning'
              )}
            </Button>

            {(relevantItems.length === 0 || selectedDays.length === 0) && (
              <p className="text-sm text-red-600 text-center mt-3">
                {relevantItems.length === 0 && "Lägg till produkter i varukorgen. "}
                {selectedDays.length === 0 && "Välj minst en leveransdag."}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimplifiedCheckout;