import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
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
  const { user, customer } = useAuth();
  const { toast } = useToast();
  const totalPrice = getTotalPrice();
  const isLoggedIn = !!user;

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
    
    if (isLoggedIn) {
      // Show success message for logged-in users
      toast({
        title: "Tack! Din beställning har uppdaterats",
        description: "Dina ändringar träder i kraft vid nästa leverans.",
      });
      
      // Clear cart and go back to dashboard
      clearCart();
      navigate('/dashboard');
    } else {
      // Show success message for anonymous users
      toast({
        title: "Beställning skickad!",
        description: "Vi kommer att kontakta dig inom 24 timmar för att bekräfta din beställning.",
      });

      // Clear cart and navigate back
      clearCart();
      navigate('/sortiment');
    }
  };

  const handleGoBack = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/sortiment');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="outline"
              onClick={handleGoBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Tillbaka till produkter
            </Button>
            <h1 className="text-4xl font-bold text-charcoal">
              {isLoggedIn ? 'Bekräfta din uppdaterade beställning' : 'Slutför beställning'}
            </h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Summary - Left Side */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-semibold text-charcoal mb-6">Beställningssammanfattning</h2>
              
              {/* Delivery Plan */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-charcoal mb-2">Leveransplan</h3>
                <p className="text-muted-foreground mb-2">{getPlanText(packagePlan)}</p>
                <div>
                  <span className="font-medium">Valda dagar: </span>
                  <span className="text-muted-foreground">
                    {selectedDays.length > 0 ? selectedDays.join(', ') : 'Inga dagar valda'}
                  </span>
                </div>
              </div>

              {/* Cart Items */}
              <div className="mb-6">
                <h3 className="font-semibold text-charcoal mb-4">Produkter</h3>
                {items.length === 0 ? (
                  <p className="text-muted-foreground">Inga produkter i varukorgen</p>
                ) : (
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-charcoal">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatPrice(item.price)} × {item.quantity}
                          </p>
                        </div>
                        <span className="font-semibold text-charcoal">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Total Cost */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-charcoal">Totalkostnad:</span>
                  <span className="text-xl font-bold text-[#4CAF50]">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>

            {/* Customer Information Form - Right Side OR Simple Confirmation for Logged-in Users */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              {isLoggedIn ? (
                /* Simple confirmation for logged-in users */
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-semibold text-charcoal">Bekräfta dina ändringar</h2>
                  <p className="text-muted-foreground">
                    Din beställning kommer att uppdateras med de valda produkterna och leveransdagarna.
                  </p>
                  
                  <div className="pt-6 space-y-4">
                    <Button
                      onClick={handleSubmit}
                      className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white py-3 text-lg font-semibold"
                      disabled={items.length === 0 || selectedDays.length === 0}
                    >
                      Bekräfta ändringar
                    </Button>
                    
                    {(items.length === 0 || selectedDays.length === 0) && (
                      <p className="text-sm text-red-600 text-center">
                        {items.length === 0 && "Lägg till produkter i varukorgen. "}
                        {selectedDays.length === 0 && "Välj minst en leveransdag."}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                /* Full form for anonymous users */
                <>
                  <h2 className="text-2xl font-semibold text-charcoal mb-6">Kundinformation</h2>
                  
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
                        className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white py-3 text-lg font-semibold"
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
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;