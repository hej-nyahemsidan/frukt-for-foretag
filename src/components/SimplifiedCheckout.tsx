import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Check } from 'lucide-react';

interface SimplifiedCheckoutProps {
  packagePlan: string;
  selectedDays: string[];
  onBack: () => void;
}

const SimplifiedCheckout: React.FC<SimplifiedCheckoutProps> = ({
  packagePlan,
  selectedDays,
  onBack
}) => {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  const { customer } = useAuth();
  const { toast } = useToast();
  const [isConfirming, setIsConfirming] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const getPlanText = (plan: string) => {
    switch (plan) {
      case 'weekly': return 'Veckovis';
      case 'monthly': return 'Månadsvis';
      case 'yearly': return 'Årsvis';
      default: return plan;
    }
  };

  const getCostDescription = (plan: string) => {
    switch (plan) {
      case 'weekly': return 'Detta är din veckokostnad för den valda leveransplanen.';
      case 'monthly': return 'Detta är din månadskostnad för den valda leveransplanen.';
      default: return 'Detta är din kostnad för den valda leveransplanen.';
    }
  };

  const handleConfirmOrder = async () => {
    setIsConfirming(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success message
    toast({
      title: "Beställning bekräftad!",
      description: "Din fruktleverans har uppdaterats framgångsrikt.",
    });

    // Clear cart and show confirmation
    clearCart();
    setOrderConfirmed(true);
    setIsConfirming(false);
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

      <div className="grid md:grid-cols-2 gap-6">
        {/* Order Summary */}
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
              <p className="text-muted-foreground mb-2">{getPlanText(packagePlan)}</p>
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
              {items.length === 0 ? (
                <p className="text-muted-foreground">Inga produkter valda</p>
              ) : (
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <div className="text-sm text-muted-foreground">
                          Antal: {item.quantity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Confirmation */}
        <Card>
          <CardHeader>
            <CardTitle>Bekräfta och slutför</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-muted-foreground">
                {getCostDescription(packagePlan)}
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Genom att bekräfta din beställning uppdaterar vi din befintliga 
                fruktleverans enligt dina nya val. Leveransen kommer att börja 
                gälla från nästa leveranstillfälle.
              </p>

              <Button
                onClick={handleConfirmOrder}
                disabled={items.length === 0 || selectedDays.length === 0 || isConfirming}
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

              {(items.length === 0 || selectedDays.length === 0) && (
                <p className="text-sm text-red-600 text-center">
                  {items.length === 0 && "Lägg till produkter i varukorgen. "}
                  {selectedDays.length === 0 && "Välj minst en leveransdag."}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimplifiedCheckout;