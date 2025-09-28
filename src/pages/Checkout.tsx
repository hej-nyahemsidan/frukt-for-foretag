import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const totalPrice = getTotalPrice();

  // Get state from navigation or use defaults
  const state = location.state as { packagePlan?: string; selectedDays?: string[] } || {};
  const packagePlan = state.packagePlan || 'weekly';
  const selectedDays = state.selectedDays || [];

  const formatPrice = (price: number) => `${price} kr`;

  const getPlanText = (plan: string) => {
    switch (plan) {
      case 'weekly': return 'Veckovis';
      case 'monthly': return 'Månadsvis';
      case 'yearly': return 'Årsvis';
      default: return plan;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show success message
    toast({
      title: "Beställning skickad!",
      description: "Vi kommer att kontakta dig inom 24 timmar för att bekräfta din beställning.",
    });

    // Clear cart and navigate back
    clearCart();
    navigate('/dashboard');
  };

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Button
              variant="outline"
              onClick={handleGoBack}
              className="flex items-center gap-2 text-xs sm:text-sm px-3 sm:px-4 py-2 w-full sm:w-auto"
            >
              <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Tillbaka till produkter</span>
              <span className="sm:hidden">Tillbaka</span>
            </Button>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-charcoal">Slutför beställning</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Order Summary - Left Side */}
            <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-charcoal mb-4 sm:mb-6">Beställningssammanfattning</h2>
              
              {/* Delivery Plan */}
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-charcoal mb-2 text-sm sm:text-base">Leveransplan</h3>
                <p className="text-muted-foreground mb-2 text-sm">{getPlanText(packagePlan)}</p>
                <div>
                  <span className="font-medium">Valda dagar: </span>
                  <span className="text-muted-foreground">
                    {selectedDays.length > 0 ? selectedDays.join(', ') : 'Inga dagar valda'}
                  </span>
                </div>
              </div>

              {/* Cart Items */}
              <div className="mb-4 sm:mb-6">
                <h3 className="font-semibold text-charcoal mb-3 sm:mb-4 text-sm sm:text-base">Produkter</h3>
                {items.length === 0 ? (
                  <p className="text-muted-foreground">Inga produkter i varukorgen</p>
                ) : (
                  <div className="space-y-3">
                     {items.map((item, index) => (
                       <div key={`${item.id}-${item.assignedDay || index}`} className="flex justify-between items-start sm:items-center p-3 bg-gray-50 rounded-lg gap-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-charcoal text-sm sm:text-base truncate">{item.name}</h4>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {formatPrice(item.price)} × {item.quantity}
                              {item.assignedDay && (
                                <span className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-primary/10 text-primary rounded-md text-xs font-medium block sm:inline mt-1 sm:mt-0">
                                  {item.assignedDay}
                                </span>
                              )}
                            </p>
                          </div>
                          <span className="font-semibold text-charcoal text-sm sm:text-base flex-shrink-0">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                     ))}
                  </div>
                )}
              </div>

              {/* Total Cost */}
              <div className="border-t pt-3 sm:pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg sm:text-xl font-bold text-charcoal">Totalkostnad:</span>
                  <span className="text-lg sm:text-xl font-bold text-[#4CAF50]">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>

            {/* Customer Information Form - Right Side */}
            <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-charcoal mb-4 sm:mb-6">Kundinformation</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="company" className="required-field">
                    Företagsnamn *
                  </Label>
                  <Input
                    id="company"
                    type="text"
                    required
                    className="input-professional"
                    placeholder="Ange företagsnamn"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="required-field">
                    Leveransadress *
                  </Label>
                  <Textarea
                    id="address"
                    required
                    className="input-professional"
                    placeholder="Ange fullständig leveransadress"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact" className="required-field">
                    Kontaktperson *
                  </Label>
                  <Input
                    id="contact"
                    type="text"
                    required
                    className="input-professional"
                    placeholder="Namn på kontaktperson"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="required-field">
                    Telefonnummer *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    className="input-professional"
                    placeholder="Telefonnummer"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="required-field">
                    E-post *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="input-professional"
                    placeholder="E-postadress"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="special-requests">
                    Särskilda önskemål
                  </Label>
                  <Textarea
                    id="special-requests"
                    className="input-professional"
                    placeholder="Beskriv eventuella särskilda önskemål eller krav"
                    rows={3}
                  />
                </div>

                <div className="pt-6 space-y-4">
                  <Button
                    type="submit"
                    className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold"
                    disabled={items.length === 0 || selectedDays.length === 0}
                  >
                    Slutför beställning
                  </Button>
                  
                  {(items.length === 0 || selectedDays.length === 0) && (
                    <p className="text-sm text-red-600 text-center">
                      {items.length === 0 && "Lägg till produkter i varukorgen. "}
                      {selectedDays.length === 0 && "Välj minst en leveransdag."}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;