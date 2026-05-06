import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import { CalendarIcon, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { fruktkorgProducts } from '@/data/fruktkorg-products';
import { trackQuoteSubmitted } from '@/lib/gtm';

import imgOriginal from '@/assets/fruktkorg-standard-new.jpg';
import imgPremium from '@/assets/fruktkorg-premium-new.jpg';
import imgBanan from '@/assets/fruktkorg-banan-new.jpg';
import imgSicilien from '@/assets/fruktkorg-sicilien.jpg';
import imgMellanmjolk from '@/assets/mellanmjolk-laktosfri.png';
import imgEkoMjolk from '@/assets/mellanmjolk-eko-laktosfri.png';
import imgKaffeMjolk from '@/assets/kaffemjolk-laktosfri.png';
import imgKaffe from '@/assets/kaffe-te-kontor-leverans.jpg';

const imageMap: Record<string, string> = {
  'fruktkorg-standard-new': imgOriginal,
  'fruktkorg-premium-new': imgPremium,
  'fruktkorg-banan-new': imgBanan,
  'fruktkorg-sicilien': imgSicilien,
};

const weekdays = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag'];

type Addon = { id: string; name: string; price: number; image: string; desc: string };
const addons: Addon[] = [
  { id: 'mellanmjolk', name: 'Mellanmjölk 1L', price: 22, image: imgMellanmjolk, desc: 'Färsk mellanmjölk – passar kaffet' },
  { id: 'eko-mjolk', name: 'Ekologisk mjölk 1L', price: 28, image: imgEkoMjolk, desc: 'Ekologisk mjölk av högsta kvalitet' },
  { id: 'kaffemjolk', name: 'Kaffemjölk laktosfri 1L', price: 32, image: imgKaffeMjolk, desc: 'Laktosfri – fungerar för alla' },
  { id: 'kaffe', name: 'Kaffe 500g', price: 119, image: imgKaffe, desc: 'Mörkrostat bryggkaffe till kontoret' },
];

const Bestall = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  // Step 1: basket selection
  const [basketSlug, setBasketSlug] = useState<string>('');
  const [basketSize, setBasketSize] = useState<string>('');

  // Step 2: delivery days
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  // Step 3: addons (qty per day each)
  const [addonQty, setAddonQty] = useState<Record<string, number>>({});

  // Step 4: customer info
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('Stockholm');
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [message, setMessage] = useState('');

  const basket = fruktkorgProducts.find(p => p.slug === basketSlug);
  const basketSizeObj = basket?.sizes.find(s => s.kg === basketSize);

  const weeklyTotal = useMemo(() => {
    if (!basketSizeObj) return 0;
    const basketPrice = basketSizeObj.price * selectedDays.length;
    const addonsPrice = Object.entries(addonQty).reduce((sum, [id, qty]) => {
      const a = addons.find(x => x.id === id);
      return sum + (a ? a.price * qty * selectedDays.length : 0);
    }, 0);
    return basketPrice + addonsPrice;
  }, [basketSizeObj, selectedDays, addonQty]);

  const canNext = () => {
    if (step === 1) return !!basket && !!basketSize;
    if (step === 2) return selectedDays.length > 0;
    if (step === 3) return true;
    return true;
  };

  const canSubmit = companyName.trim() && contactPerson.trim() && email.trim() && phone.trim() && address.trim() && startDate;

  const toggleDay = (d: string) => {
    setSelectedDays(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
  };

  const setQty = (id: string, qty: number) => {
    setAddonQty(prev => ({ ...prev, [id]: Math.max(0, qty) }));
  };

  const handleSubmit = async () => {
    if (!canSubmit || !basket || !basketSizeObj || !startDate) return;
    setSubmitting(true);
    try {
      const cartItems = selectedDays.flatMap(day => {
        const items = [{
          id: basket.slug,
          name: `${basket.name} ${basketSizeObj.kg}`,
          quantity: 1,
          price: basketSizeObj.price,
          category: 'Fruktkorg',
          day,
        }];
        Object.entries(addonQty).forEach(([id, qty]) => {
          if (qty > 0) {
            const a = addons.find(x => x.id === id);
            if (a) items.push({ id: a.id, name: a.name, quantity: qty, price: a.price, category: 'Tillägg', day });
          }
        });
        return items;
      });

      const fullMessage = `Startdatum: ${format(startDate, 'yyyy-MM-dd')}\n${message ? `\nMeddelande: ${message}` : ''}`;

      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          formType: 'Offertförfrågan',
          companyName,
          contactPerson,
          name: contactPerson,
          email,
          phone,
          address,
          postalCode,
          location: city,
          cartItems,
          totalPrice: weeklyTotal,
          message: fullMessage,
        },
      });
      if (error) throw error;

      trackQuoteSubmitted(weeklyTotal, cartItems.length);
      toast({ title: 'Tack för din beställning!', description: 'Vi kontaktar dig inom kort för att bekräfta starten.' });
      setStep(5);
    } catch (e) {
      console.error(e);
      toast({ title: 'Något gick fel', description: 'Försök igen eller ring 010-183 98 36.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const stepLabels = ['Fruktkorg', 'Leveransdagar', 'Tillägg', 'Uppgifter'];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Beställ fruktkorg på 1 minut – Vitaminkorgen"
        description="Guidad beställning i 4 enkla steg. Välj fruktkorg, leveransdag, tillägg och starta. Fri leverans i Stockholm."
        type="contact"
      />
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {step < 5 && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Beställ din fruktkorg</h1>
                <p className="text-muted-foreground">Klart på 1 minut – ingen registrering krävs</p>
              </div>

              {/* Stepper */}
              <div className="flex items-center justify-between mb-10 max-w-2xl mx-auto">
                {stepLabels.map((label, i) => {
                  const n = i + 1;
                  const active = step === n;
                  const done = step > n;
                  return (
                    <div key={label} className="flex items-center flex-1 last:flex-none">
                      <div className="flex flex-col items-center">
                        <div className={cn(
                          'w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm transition-colors',
                          done && 'bg-primary text-primary-foreground',
                          active && 'bg-primary text-primary-foreground ring-4 ring-primary/20',
                          !active && !done && 'bg-muted text-muted-foreground'
                        )}>
                          {done ? <Check className="w-4 h-4" /> : n}
                        </div>
                        <span className={cn('text-xs mt-1.5 hidden sm:block', active ? 'text-foreground font-medium' : 'text-muted-foreground')}>{label}</span>
                      </div>
                      {i < stepLabels.length - 1 && (
                        <div className={cn('flex-1 h-0.5 mx-2 mb-5', done ? 'bg-primary' : 'bg-muted')} />
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">1. Välj din fruktkorg</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {fruktkorgProducts.map(p => (
                  <Card
                    key={p.slug}
                    onClick={() => { setBasketSlug(p.slug); setBasketSize(''); }}
                    className={cn(
                      'p-4 cursor-pointer transition-all hover:shadow-lg',
                      basketSlug === p.slug && 'ring-2 ring-primary shadow-lg'
                    )}
                  >
                    <div className="flex gap-4">
                      <img src={imageMap[p.image]} alt={p.name} className="w-24 h-24 object-cover rounded-lg flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground">{p.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{p.tagline}</p>
                        <p className="text-sm font-semibold text-primary mt-1">Från {p.sizes[0].price} kr</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {basket && (
                <div className="space-y-3 pt-4">
                  <h3 className="font-semibold text-foreground">Välj storlek</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {basket.sizes.map(s => (
                      <button
                        key={s.kg}
                        onClick={() => setBasketSize(s.kg)}
                        className={cn(
                          'p-4 rounded-lg border-2 text-center transition-all',
                          basketSize === s.kg ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                        )}
                      >
                        <div className="font-bold text-foreground">{s.kg}</div>
                        <div className="text-sm text-primary font-semibold">{s.price} kr</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">2. Välj leveransdag(ar)</h2>
              <p className="text-muted-foreground">Vi levererar måndag–fredag. Välj en eller flera dagar per vecka.</p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {weekdays.map(d => (
                  <button
                    key={d}
                    onClick={() => toggleDay(d)}
                    className={cn(
                      'p-4 rounded-lg border-2 text-center transition-all font-medium',
                      selectedDays.includes(d) ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50 text-foreground'
                    )}
                  >
                    {d}
                  </button>
                ))}
              </div>
              {selectedDays.length > 0 && basketSizeObj && (
                <Card className="p-4 bg-primary/5 border-primary/20">
                  <p className="text-sm text-foreground">
                    {selectedDays.length} leverans/vecka × {basketSizeObj.price} kr = <strong>{basketSizeObj.price * selectedDays.length} kr/vecka</strong>
                  </p>
                </Card>
              )}
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">3. Lägg till mjölk & kaffe (valfritt)</h2>
              <p className="text-muted-foreground">Antal per leverans. Kan hoppas över.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {addons.map(a => {
                  const qty = addonQty[a.id] || 0;
                  return (
                    <Card key={a.id} className="p-4">
                      <div className="flex gap-4">
                        <img src={a.image} alt={a.name} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="font-bold text-foreground text-sm">{a.name}</h3>
                          <p className="text-xs text-muted-foreground mb-2">{a.desc}</p>
                          <p className="text-sm font-semibold text-primary mb-2">{a.price} kr/st</p>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => setQty(a.id, qty - 1)} disabled={qty === 0}>-</Button>
                            <span className="w-8 text-center font-semibold">{qty}</span>
                            <Button size="sm" variant="outline" onClick={() => setQty(a.id, qty + 1)}>+</Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">4. Dina uppgifter & startdatum</h2>

              <Card className="p-5 bg-muted/30">
                <h3 className="font-semibold text-foreground mb-3">Sammanfattning</h3>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <p><strong className="text-foreground">{basket?.name} {basketSize}</strong> × {selectedDays.length} dag(ar)/vecka</p>
                  <p>Leveransdagar: {selectedDays.join(', ')}</p>
                  {Object.entries(addonQty).filter(([, q]) => q > 0).map(([id, q]) => {
                    const a = addons.find(x => x.id === id);
                    return a && <p key={id}>{a.name} × {q}/leverans</p>;
                  })}
                  <p className="text-base text-primary font-bold pt-2">Totalt: {weeklyTotal} kr/vecka</p>
                </div>
              </Card>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Företag *</Label>
                  <Input id="company" value={companyName} onChange={e => setCompanyName(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="contact">Kontaktperson *</Label>
                  <Input id="contact" value={contactPerson} onChange={e => setContactPerson(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="email">E-post *</Label>
                  <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="phone">Telefon *</Label>
                  <Input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} required />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="address">Leveransadress *</Label>
                  <Input id="address" value={address} onChange={e => setAddress(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="zip">Postnummer</Label>
                  <Input id="zip" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="city">Ort</Label>
                  <Input id="city" value={city} onChange={e => setCity(e.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <Label>Startdatum *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn('w-full justify-start text-left font-normal', !startDate && 'text-muted-foreground')}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, 'PPP', { locale: sv }) : 'Välj startdatum'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        disabled={(date) => {
                          const min = new Date();
                          min.setDate(min.getDate() + 2);
                          min.setHours(0, 0, 0, 0);
                          const day = date.getDay();
                          return date < min || day === 0 || day === 6;
                        }}
                        initialFocus
                        locale={sv}
                        className={cn('p-3 pointer-events-auto')}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="msg">Meddelande (valfritt)</Label>
                  <Textarea id="msg" value={message} onChange={e => setMessage(e.target.value)} placeholder="T.ex. portkod, allergier eller särskilda önskemål..." />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5 - confirmation */}
          {step === 5 && (
            <Card className="p-10 text-center max-w-xl mx-auto">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">Tack för din beställning!</h2>
              <p className="text-muted-foreground mb-6">Vi har tagit emot din beställning och kontaktar dig inom kort för att bekräfta starten {startDate && format(startDate, 'PPP', { locale: sv })}.</p>
              <Button onClick={() => navigate('/')}>Till startsidan</Button>
            </Card>
          )}

          {/* Navigation */}
          {step < 5 && (
            <div className="flex justify-between items-center mt-10 pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => step === 1 ? navigate('/') : setStep(step - 1)}
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Tillbaka
              </Button>
              {step < 4 ? (
                <Button onClick={() => setStep(step + 1)} disabled={!canNext()} size="lg">
                  Nästa <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={!canSubmit || submitting} size="lg" className="bg-primary hover:bg-primary-dark">
                  {submitting ? 'Skickar...' : 'Skicka beställning'}
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Bestall;