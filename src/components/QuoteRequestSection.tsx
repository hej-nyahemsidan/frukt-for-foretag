import { useState, FormEvent } from 'react';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MapPin, Phone, Clock, MessageCircle, ShoppingBasket, Plus, Minus, X, Calendar, CalendarIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { usePublicCart } from '@/contexts/PublicCartContext';
import { cn } from '@/lib/utils';

// Import images
import officeWellnessImage from '@/assets/office-wellness.jpg';

const QuoteRequestSection = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    location: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  
  const { toast } = useToast();
  const { items, getTotalPrice, updateQuantity, removeItem, clearCart } = usePublicCart();

  // Group items by day
  const itemsByDay = items.reduce((acc, item) => {
    const day = item.day || 'Ingen dag';
    if (!acc[day]) acc[day] = [];
    acc[day].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!formData.companyName.trim() || !formData.contactPerson.trim() || !formData.email.trim()) {
      toast({
        title: "Fyll i alla obligatoriska fält",
        description: "Företagsnamn, kontaktperson och e-post måste fyllas i.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          formType: 'Offertförfrågan',
          companyName: formData.companyName,
          contactPerson: formData.contactPerson,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          postalCode: formData.postalCode,
          location: formData.location,
          message: formData.message,
          startDate: startDate ? format(startDate, 'yyyy-MM-dd') : undefined,
          cartItems: items,
          totalPrice: getTotalPrice(),
        }
      });

      if (error) throw error;

      toast({
        title: "Beställning skickad!",
        description: "Vi återkommer så snart som möjligt.",
      });

      // Clear form and cart
      setFormData({ companyName: '', contactPerson: '', email: '', phone: '', address: '', postalCode: '', location: '', message: '' });
      clearCart();
      setOrderConfirmed(true);
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Något gick fel",
        description: "Kunde inte skicka beställningen. Försök igen senare.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (orderConfirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-8">
        <div className="max-w-2xl text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tack för din beställning!</h2>
            <p className="text-xl text-gray-600">
              Vi har tagit emot din beställning och återkommer så snart som möjligt.
            </p>
          </div>
          <Button onClick={() => window.location.href = '/'} size="lg">
            Tillbaka till startsidan
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-8 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={officeWellnessImage} 
            alt="Professional workspace with laptop and fresh citrus fruits" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-green-50/90"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Beställ din fruktkorg på jobbet
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed">
              Fyll i formuläret nedan för att göra din första beställning.
            </p>
          </div>
        </div>
      </section>

      {/* Cart Summary Section */}
      {items.length > 0 && (
        <section className="py-12 px-4 sm:px-8 bg-gradient-to-b from-green-50 to-white overflow-x-hidden">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ShoppingBasket className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              Din varukorg
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <div className="space-y-6 mb-6">
                {Object.entries(itemsByDay).map(([day, dayItems]) => (
                  <div key={day} className="mb-4 last:mb-0">
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-primary/20">
                      <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                      <h3 className="text-base sm:text-lg font-bold text-primary break-words min-w-0">{day}</h3>
                      <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                        ({dayItems.reduce((sum, item) => sum + item.quantity, 0)} produkter)
                      </span>
                    </div>
                    {dayItems.map((item) => (
                      <div key={`${item.id}-${item.day}-${item.size || ''}`} className="flex flex-col sm:flex-row gap-3 sm:gap-4 pb-4 border-b last:border-b-0 mb-4 last:mb-0">
                        {item.image && (
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full sm:w-20 h-32 sm:h-20 object-cover rounded flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-base sm:text-lg break-words">{item.name}</h4>
                          <p className="text-primary font-bold text-base sm:text-lg">{item.price} kr</p>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1, item.day, item.size)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="font-semibold w-12 text-center text-sm">{item.quantity} st</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1, item.day, item.size)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => removeItem(item.id, item.day, item.size)}
                            >
                              <X className="h-4 w-4 sm:mr-1" />
                              <span className="hidden sm:inline">Ta bort</span>
                            </Button>
                          </div>
                        </div>
                        <div className="text-left sm:text-right flex-shrink-0">
                          <p className="font-bold text-lg sm:text-xl text-primary">{item.price * item.quantity} kr</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="border-t pt-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">Totalt:</span>
                  <span className="text-2xl sm:text-3xl font-bold text-primary">{getTotalPrice()} kr</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content Section */}
      <section className="py-20 px-8 bg-white">
        <div className="container mx-auto max-w-3xl">
              {/* Promotional Bubble */}
              <div className="mb-6 text-center">
                <div className="inline-block bg-gradient-to-r from-secondary to-primary-light text-white px-6 py-3 rounded-full shadow-lg">
                  <span className="font-semibold">🎉 Beställ en gratis provkorg</span>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg border">
                <form onSubmit={handleSubmit} className="space-y-6">
                   <div className="space-y-2">
                     <label className="text-sm text-gray-600 font-medium">Företagsnamn</label>
                     <Input
                       value={formData.companyName}
                       onChange={(e) => handleInputChange('companyName', e.target.value)}
                       className="w-full text-lg py-3"
                       placeholder="Ditt företagsnamn"
                     />
                   </div>
                   
                   <div className="space-y-2">
                     <label className="text-sm text-gray-600 font-medium">Kontaktperson*</label>
                     <Input
                       value={formData.contactPerson}
                       onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                       className="w-full text-lg py-3"
                       placeholder="Ditt namn"
                       required
                     />
                   </div>
                   
                   <div className="space-y-2">
                     <label className="text-sm text-gray-600 font-medium">Epost*</label>
                     <Input
                       type="email"
                       value={formData.email}
                       onChange={(e) => handleInputChange('email', e.target.value)}
                       className="w-full text-lg py-3"
                       placeholder="din.email@foretag.se"
                       required
                     />
                   </div>
                   
                   <div className="space-y-2">
                     <label className="text-sm text-gray-600 font-medium">Telefon</label>
                     <Input
                       type="tel"
                       value={formData.phone}
                       onChange={(e) => handleInputChange('phone', e.target.value)}
                       className="w-full text-lg py-3"
                       placeholder="08-123 45 67"
                     />
                   </div>
                   
                   <div className="space-y-2">
                     <label className="text-sm text-gray-600 font-medium">Leveransadress*</label>
                     <Input
                       value={formData.address}
                       onChange={(e) => handleInputChange('address', e.target.value)}
                       className="w-full text-lg py-3"
                       placeholder="Gatuadress 123"
                       required
                     />
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <label className="text-sm text-gray-600 font-medium">Postnummer*</label>
                       <Input
                         value={formData.postalCode}
                         onChange={(e) => handleInputChange('postalCode', e.target.value)}
                         className="w-full text-lg py-3"
                         placeholder="123 45"
                         required
                       />
                     </div>
                     
                     <div className="space-y-2">
                       <label className="text-sm text-gray-600 font-medium">Ort*</label>
                       <Input
                         value={formData.location}
                         onChange={(e) => handleInputChange('location', e.target.value)}
                         className="w-full text-lg py-3"
                         placeholder="Stockholm"
                         required
                       />
                     </div>
                   </div>
                   
                   {/* Start Date Picker */}
                   <div className="space-y-2">
                     <label className="text-sm text-gray-600 font-medium">Önskat startdatum*</label>
                     <Popover>
                       <PopoverTrigger asChild>
                         <Button
                           variant="outline"
                           className={cn(
                             "w-full justify-start text-left text-lg py-3 font-normal",
                             !startDate && "text-muted-foreground"
                           )}
                         >
                           <CalendarIcon className="mr-2 h-4 w-4" />
                           {startDate ? format(startDate, 'PPP', { locale: sv }) : 'Välj startdatum'}
                         </Button>
                       </PopoverTrigger>
                       <PopoverContent className="w-auto p-0" align="start">
                         <CalendarComponent
                           mode="single"
                           selected={startDate}
                           onSelect={setStartDate}
                           disabled={(date) => date < new Date()}
                           initialFocus
                           className={cn("p-3 pointer-events-auto")}
                         />
                       </PopoverContent>
                     </Popover>
                   </div>

                   <div className="space-y-2">
                     <label className="text-sm text-gray-600 font-medium">Meddelande</label>
                     <Textarea
                       value={formData.message}
                       onChange={(e) => handleInputChange('message', e.target.value)}
                       rows={5}
                       className="w-full text-lg"
                       placeholder="Berätta gärna om ni har allergier eller någon portkod"
                     />
                   </div>
                  
                   <Button 
                     type="submit" 
                     disabled={isSubmitting}
                     className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-lg w-full disabled:opacity-50"
                   >
                     {isSubmitting ? 'Skickar...' : 'Skicka din beställning'}
                   </Button>
                </form>
              </div>
        </div>
      </section>
    </div>
  );
};

export default QuoteRequestSection;