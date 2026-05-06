import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import { CalendarIcon, Check, ChevronLeft, ChevronRight, Plus, Minus, Trash2 } from 'lucide-react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import imgKaffe from '@/assets/gevalia-mellanrost-new.png';
import imgKaffe2 from '@/assets/arvid-nordquist-mellanrost-new.png';

const imageMap: Record<string, string> = {
  'fruktkorg-standard-new': imgOriginal,
  'fruktkorg-premium-new': imgPremium,
  'fruktkorg-banan-new': imgBanan,
  'fruktkorg-sicilien': imgSicilien,
};

const weekdays = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag'];

type Addon = { id: string; name: string; price: number; image: string; unit: string };
const addons: Addon[] = [
  { id: 'mellanmjolk', name: 'Mellanmjölk', price: 22, image: imgMellanmjolk, unit: '1 liter' },
  { id: 'eko-mjolk', name: 'Eko mellanmjölk', price: 28, image: imgEkoMjolk, unit: '1 liter' },
  { id: 'kaffemjolk', name: 'Kaffemjölk laktosfri', price: 32, image: imgKaffeMjolk, unit: '1 liter' },
  { id: 'gevalia', name: 'Gevalia Mellanrost', price: 119, image: imgKaffe, unit: '500g' },
  { id: 'arvid', name: 'Arvid Nordquist Mellanrost', price: 139, image: imgKaffe2, unit: '500g' },
];

interface CartLine {
  uid: string;
  type: 'basket' | 'addon';
  productId: string;
  name: string;
  size?: string;
  price: number;
  qty: number;
  image: string;
  day?: string;
}

const Bestall = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [cart, setCart] = useState<CartLine[]>([]);

  // per-card pending selection state for baskets
  const [pending, setPending] = useState<Record<string, { size?: string; qty: number; day?: string }>>({});
  const [pendingAddon, setPendingAddon] = useState<Record<string, { qty: number; day?: string }>>({});

  // Step 4 fields
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [companyName, setCompanyName] = useState('');
  const [orgNumber, setOrgNumber] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('Stockholm');
  const [portCode, setPortCode] = useState('');
  const [invoiceAddress, setInvoiceAddress] = useState('');
  const [invoiceCity, setInvoiceCity] = useState('');
  const [invoicePostal, setInvoicePostal] = useState('');
  const [invoiceMark, setInvoiceMark] = useState('');
  const [invoiceEmail, setInvoiceEmail] = useState('');
  const [message, setMessage] = useState('');

  const baskets = cart.filter(c => c.type === 'basket');
  const addonLines = cart.filter(c => c.type === 'addon');
  const total = useMemo(() => cart.reduce((s, c) => s + c.price * c.qty, 0), [cart]);

  // STEP 1: add basket
  const addBasket = (slug: string) => {
    const p = fruktkorgProducts.find(x => x.slug === slug)!;
    const sel = pending[slug] || { qty: 1 };
    if (!sel.size) {
      toast({ title: 'Välj storlek', variant: 'destructive' });
      return;
    }
    if (!sel.day) {
      toast({ title: 'Välj leveransdag', variant: 'destructive' });
      return;
    }
    const sizeObj = p.sizes.find(s => s.kg === sel.size)!;
    setCart(prev => [...prev, {
      uid: `${slug}-${sel.size}-${Date.now()}`,
      type: 'basket',
      productId: slug,
      name: p.name,
      size: sel.size,
      price: sizeObj.price,
      qty: sel.qty || 1,
      image: imageMap[p.image],
      day: sel.day,
    }]);
    setPending(prev => ({ ...prev, [slug]: { qty: 1 } }));
    toast({ title: `${p.name} ${sel.size} tillagd – ${sel.day}` });
  };

  // STEP 2: assign day
  const setLineDay = (uid: string, day: string) => {
    setCart(prev => prev.map(c => c.uid === uid ? { ...c, day } : c));
  };
  const removeLine = (uid: string) => setCart(prev => prev.filter(c => c.uid !== uid));
  const updateLineQty = (uid: string, qty: number) => {
    if (qty <= 0) { removeLine(uid); return; }
    setCart(prev => prev.map(c => c.uid === uid ? { ...c, qty } : c));
  };

  // STEP 2: add addon (with day)
  const addAddon = (a: Addon) => {
    const sel = pendingAddon[a.id] || { qty: 1 };
    if (!sel.day) {
      toast({ title: 'Välj leveransdag', variant: 'destructive' });
      return;
    }
    setCart(prev => [...prev, {
      uid: `${a.id}-${Date.now()}`,
      type: 'addon',
      productId: a.id,
      name: `${a.name} (${a.unit})`,
      price: a.price,
      qty: sel.qty || 1,
      image: a.image,
      day: sel.day,
    }]);
    setPendingAddon(prev => ({ ...prev, [a.id]: { qty: 1 } }));
    toast({ title: `${a.name} tillagd – ${sel.day}` });
  };

  const canNext = () => {
    if (step === 1) return baskets.length > 0;
    if (step === 2) return true;
    return true;
  };

  const canSubmit = !!startDate && companyName.trim() && contactPerson.trim() && email.trim() && phone.trim() && address.trim();

  const handleSubmit = async () => {
    if (!canSubmit || !startDate) return;
    setSubmitting(true);
    try {
      const cartItems = cart.map(c => ({
        id: c.productId,
        name: `${c.name}${c.size ? ` ${c.size}` : ''}`,
        quantity: c.qty,
        price: c.price,
        category: c.type === 'basket' ? 'Fruktkorg' : 'Tillbehör',
        day: c.day || '—',
      }));
      const fullMessage = [
        `Startdatum: ${format(startDate, 'yyyy-MM-dd')}`,
        orgNumber && `Org.nr: ${orgNumber}`,
        portCode && `Portkod: ${portCode}`,
        invoiceAddress && `Fakturaadress: ${invoiceAddress}, ${invoicePostal} ${invoiceCity}`,
        invoiceMark && `Fakturamärkning: ${invoiceMark}`,
        invoiceEmail && `Faktura-epost: ${invoiceEmail}`,
        message && `\nMeddelande: ${message}`,
      ].filter(Boolean).join('\n');

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
          totalPrice: total,
          message: fullMessage,
        },
      });
      if (error) throw error;
      trackQuoteSubmitted(total, cartItems.length);
      toast({ title: 'Tack för din beställning!', description: 'Vi kontaktar dig inom kort.' });
      setStep(5);
    } catch (e) {
      console.error(e);
      toast({ title: 'Något gick fel', description: 'Försök igen eller ring 010-183 98 36.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const stepLabels = ['Välj Frukt', 'Välj Tillbehör', 'Skicka beställning'];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Beställ fruktkorg – Vitaminkorgen"
        description="Guidad beställning i 4 enkla steg. Fri leverans i Stockholm."
        type="contact"
      />
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {step < 5 && (
            <div className="flex items-center justify-center flex-wrap gap-3 sm:gap-6 mb-10">
              {stepLabels.map((label, i) => {
                const n = i + 1;
                const active = step === n;
                const done = step > n;
                return (
                  <div key={label} className="flex items-center gap-2">
                    <div className={cn(
                      'w-7 h-7 rounded-full flex items-center justify-center font-semibold text-sm',
                      done && 'bg-primary text-primary-foreground',
                      active && 'bg-primary text-primary-foreground',
                      !active && !done && 'bg-primary/10 text-primary/60'
                    )}>{done ? <Check className="w-4 h-4" /> : n}</div>
                    <span className={cn('text-sm', active ? 'text-foreground font-semibold' : 'text-muted-foreground')}>{label}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* STEP 1 - basket cards */}
          {step === 1 && (
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-2">Välj din fruktkorg</h2>
              <p className="text-center text-muted-foreground mb-8">Lägg till en eller flera korgar i din beställning</p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {fruktkorgProducts.map(p => {
                  const sel = pending[p.slug] || { qty: 1 };
                  return (
                    <Card key={p.slug} className="overflow-hidden flex flex-col">
                      <div className="bg-primary/5 aspect-square flex items-center justify-center p-4">
                        <img src={imageMap[p.image]} alt={p.name} className="max-h-full object-contain" />
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="font-bold text-foreground">{p.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3 flex-1">{p.tagline}</p>
                        <div className="space-y-2 mb-3">
                          <Label className="text-xs">Vikt</Label>
                          <Select value={sel.size || ''} onValueChange={(v) => setPending(prev => ({ ...prev, [p.slug]: { ...sel, size: v } }))}>
                            <SelectTrigger><SelectValue placeholder="Välj vikt" /></SelectTrigger>
                            <SelectContent>
                              {p.sizes.map(s => <SelectItem key={s.kg} value={s.kg}>{s.kg} – {s.price} kr</SelectItem>)}
                            </SelectContent>
                          </Select>
                          <div className="flex items-center gap-2">
                            <Label className="text-xs flex-1">Antal</Label>
                            <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => setPending(prev => ({ ...prev, [p.slug]: { ...sel, qty: Math.max(1, (sel.qty || 1) - 1) } }))}><Minus className="w-3 h-3" /></Button>
                            <span className="w-8 text-center font-semibold">{sel.qty || 1}</span>
                            <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => setPending(prev => ({ ...prev, [p.slug]: { ...sel, qty: (sel.qty || 1) + 1 } }))}><Plus className="w-3 h-3" /></Button>
                          </div>
                        </div>
                        <Button onClick={() => addBasket(p.slug)} className="w-full bg-primary hover:bg-primary-dark">Lägg till</Button>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {baskets.length > 0 && (
                <Card className="p-4 mt-6 bg-primary/5">
                  <h3 className="font-semibold mb-2">Dina valda korgar ({baskets.length})</h3>
                  <ul className="text-sm space-y-1">
                    {baskets.map(b => (
                      <li key={b.uid} className="flex justify-between items-center">
                        <span>{b.name} {b.size} × {b.qty}</span>
                        <button onClick={() => removeLine(b.uid)} className="text-destructive"><Trash2 className="w-4 h-4" /></button>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>
          )}

          {/* STEP 2 - assign day */}
          {step === 2 && (
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-2">Välj dina leveransdagar</h2>
              <p className="text-center text-muted-foreground mb-8">Välj vilken dag varje korg ska levereras</p>

              <div className="space-y-3 max-w-2xl mx-auto">
                {cart.map(line => (
                  <Card key={line.uid} className="p-4 flex items-center gap-4">
                    <img src={line.image} alt={line.name} className="w-16 h-16 object-contain rounded bg-primary/5" />
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">{line.name}{line.size ? ` ${line.size}` : ''}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => updateLineQty(line.uid, line.qty - 1)}><Minus className="w-3 h-3" /></Button>
                        <span className="text-sm font-medium w-6 text-center">{line.qty}</span>
                        <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => updateLineQty(line.uid, line.qty + 1)}><Plus className="w-3 h-3" /></Button>
                        <span className="text-sm text-muted-foreground ml-2">{line.price * line.qty} kr</span>
                      </div>
                    </div>
                    <div className="w-40">
                      <Select value={line.day || ''} onValueChange={(v) => setLineDay(line.uid, v)}>
                        <SelectTrigger><SelectValue placeholder="Leveransdag" /></SelectTrigger>
                        <SelectContent>
                          {weekdays.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <button onClick={() => removeLine(line.uid)} className="text-destructive"><Trash2 className="w-4 h-4" /></button>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3 - addons */}
          {step === 3 && (
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-2">Välj tillbehör</h2>
              <p className="text-center text-muted-foreground mb-8">Mjölk, kaffe och annat – valfritt</p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {addons.map(a => {
                  const qty = pendingAddon[a.id] || 1;
                  return (
                    <Card key={a.id} className="overflow-hidden flex flex-col">
                      <div className="bg-primary/5 aspect-square flex items-center justify-center p-4">
                        <img src={a.image} alt={a.name} className="max-h-full object-contain" />
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <p className="text-xs text-muted-foreground">{a.unit}</p>
                        <h3 className="font-bold text-foreground">{a.name}</h3>
                        <p className="text-sm text-primary font-semibold mb-3">{a.price} kr</p>
                        <div className="flex items-center gap-2 mb-3">
                          <Label className="text-xs flex-1">Antal</Label>
                          <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => setPendingAddon(prev => ({ ...prev, [a.id]: Math.max(1, qty - 1) }))}><Minus className="w-3 h-3" /></Button>
                          <span className="w-8 text-center font-semibold">{qty}</span>
                          <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => setPendingAddon(prev => ({ ...prev, [a.id]: qty + 1 }))}><Plus className="w-3 h-3" /></Button>
                        </div>
                        <Button onClick={() => addAddon(a)} className="w-full bg-primary hover:bg-primary-dark mt-auto">Lägg till</Button>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {addonLines.length > 0 && (
                <Card className="p-4 mt-6 max-w-2xl mx-auto">
                  <h3 className="font-semibold mb-3">Tillagda tillbehör</h3>
                  <div className="space-y-2">
                    {addonLines.map(a => (
                      <div key={a.uid} className="flex items-center gap-3 text-sm">
                        <span className="flex-1">{a.name} × {a.qty}</span>
                        <Select value={a.day || ''} onValueChange={(v) => setLineDay(a.uid, v)}>
                          <SelectTrigger className="w-36 h-8"><SelectValue placeholder="Leveransdag" /></SelectTrigger>
                          <SelectContent>{weekdays.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                        </Select>
                        <button onClick={() => removeLine(a.uid)} className="text-destructive"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* STEP 4 - submit */}
          {step === 4 && (
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-8">Skicka din beställning</h2>

              <Card className="p-5 bg-muted/30 mb-6 max-w-3xl mx-auto">
                <h3 className="font-semibold mb-2">Sammanfattning</h3>
                <div className="text-sm space-y-1">
                  {cart.map(c => (
                    <div key={c.uid} className="flex justify-between">
                      <span>{c.name}{c.size ? ` ${c.size}` : ''} × {c.qty}{c.day ? ` – ${c.day}` : ''}</span>
                      <span>{c.price * c.qty} kr</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 border-t border-border mt-2 font-bold text-primary">
                    <span>Totalt/leverans</span><span>{total} kr</span>
                  </div>
                </div>
              </Card>

              <div className="max-w-3xl mx-auto space-y-6">
                <section>
                  <h3 className="font-semibold text-foreground mb-3">Företagsinformation</h3>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn('justify-start font-normal', !startDate && 'text-muted-foreground')}>
                          <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                          {startDate ? format(startDate, 'PPP', { locale: sv }) : 'Startdatum *'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          disabled={(d) => {
                            const min = new Date(); min.setDate(min.getDate() + 2); min.setHours(0,0,0,0);
                            return d < min || d.getDay() === 0 || d.getDay() === 6;
                          }}
                          initialFocus
                          locale={sv}
                          className={cn('p-3 pointer-events-auto')}
                        />
                      </PopoverContent>
                    </Popover>
                    <Input placeholder="Företagsnamn *" value={companyName} onChange={e => setCompanyName(e.target.value)} />
                    <Input placeholder="Org.nummer" value={orgNumber} onChange={e => setOrgNumber(e.target.value)} />
                    <Input placeholder="Kontaktperson *" value={contactPerson} onChange={e => setContactPerson(e.target.value)} className="sm:col-span-1" />
                    <Input type="email" placeholder="E-post *" value={email} onChange={e => setEmail(e.target.value)} />
                    <Input type="tel" placeholder="Telefon *" value={phone} onChange={e => setPhone(e.target.value)} />
                    <Input placeholder="Leveransadress *" value={address} onChange={e => setAddress(e.target.value)} className="sm:col-span-3" />
                    <Input placeholder="Postnummer" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
                    <Input placeholder="Ort" value={city} onChange={e => setCity(e.target.value)} />
                    <Input placeholder="Ev. Portkod" value={portCode} onChange={e => setPortCode(e.target.value)} />
                  </div>
                </section>

                <section>
                  <h3 className="font-semibold text-foreground mb-3">Faktura</h3>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <Input placeholder="Fakturaadress (lämna tomt om samma som leveransadress)" value={invoiceAddress} onChange={e => setInvoiceAddress(e.target.value)} className="sm:col-span-3" />
                    <Input placeholder="Ort" value={invoiceCity} onChange={e => setInvoiceCity(e.target.value)} />
                    <Input placeholder="Postnummer" value={invoicePostal} onChange={e => setInvoicePostal(e.target.value)} />
                    <Input placeholder="Ev. Fakturamärkning" value={invoiceMark} onChange={e => setInvoiceMark(e.target.value)} />
                    <Input type="email" placeholder="E-post för faktura" value={invoiceEmail} onChange={e => setInvoiceEmail(e.target.value)} className="sm:col-span-3" />
                  </div>
                </section>

                <Textarea placeholder="Meddelande (valfritt)..." value={message} onChange={e => setMessage(e.target.value)} />
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
              <p className="text-muted-foreground mb-6">Vi kontaktar dig inom kort för att bekräfta starten {startDate && format(startDate, 'PPP', { locale: sv })}.</p>
              <Button onClick={() => navigate('/')}>Till startsidan</Button>
            </Card>
          )}

          {/* Navigation */}
          {step < 5 && (
            <div className="flex justify-center items-center gap-3 mt-10 pt-6">
              {step > 1 && (
                <Button variant="outline" size="lg" onClick={() => setStep(step - 1)}>
                  <ChevronLeft className="w-4 h-4 mr-1" /> Tillbaka
                </Button>
              )}
              {step < 4 ? (
                <Button onClick={() => setStep(step + 1)} disabled={!canNext()} size="lg" className="bg-primary hover:bg-primary-dark">
                  Nästa <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={!canSubmit || submitting} size="lg" className="bg-primary hover:bg-primary-dark">
                  {submitting ? 'Skickar...' : 'Skicka din beställning'}
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