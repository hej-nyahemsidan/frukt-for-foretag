import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { trackContactSubmitted } from '@/lib/gtm';
import fruktKontorImg from '@/assets/frukt-pa-kontoret-tips.jpg';

const LEFTOVER_OPTIONS = [
  'Äpplen',
  'Päron',
  'Bananer',
  'Apelsiner / Clementiner',
  'Vindruvor',
  'Kiwi',
  'Annan frukt',
  'Ingen frukt blir över',
];

const LeadCaptureSection = () => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedLeftovers, setSelectedLeftovers] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    companyName: '',
    employeeCount: '',
    deliveryFrequency: '',
    deliveryTime: '',
    currentBasketName: '',
    email: '',
    phone: '',
  });

  const toggleLeftover = (item: string) => {
    setSelectedLeftovers(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.employeeCount || !formData.deliveryFrequency || !formData.email || !formData.phone) {
      toast({ title: 'Fyll i alla fält markerade med *', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error: dbError } = await supabase.from('price_guide_leads').insert({
        company_name: formData.companyName,
        employee_count: formData.employeeCount,
        delivery_frequency: formData.deliveryFrequency,
        email: formData.email,
        phone: formData.phone,
        leftover_fruit: selectedLeftovers.length > 0 ? selectedLeftovers.join(', ') : null,
        delivery_time: formData.deliveryTime || null,
        current_basket_name: formData.currentBasketName || null,
      });

      if (dbError) throw dbError;

      await supabase.functions.invoke('send-contact-email', {
        body: {
          formType: 'Lead – Frukttips',
          name: formData.companyName,
          email: formData.email,
          phone: formData.phone,
          message: [
            `Företag: ${formData.companyName}`,
            `Antal anställda: ${formData.employeeCount}`,
            `Leverans/vecka: ${formData.deliveryFrequency}`,
            `Leveranstid: ${formData.deliveryTime || 'Ej angett'}`,
            `Nuvarande korg: ${formData.currentBasketName || 'Ej angett'}`,
            `Frukt som blir över: ${selectedLeftovers.length > 0 ? selectedLeftovers.join(', ') : 'Ingen'}`,
            `E-post: ${formData.email}`,
            `Telefon: ${formData.phone}`,
          ].join('\n'),
        },
      });

      trackContactSubmitted();
      setSubmitted(true);
    } catch (err) {
      console.error('Lead submit error:', err);
      toast({ title: 'Något gick fel, försök igen.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-16 sm:py-24 bg-accent-light-green">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-4">
          <div className="text-5xl">✅</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Tack! Vi skickar tipsen till din mail och återkommer med en snabb rekommendation.
          </h2>
          <p className="text-muted-foreground">Kolla din inkorg inom några minuter.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-accent-light-green relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — Copy */}
          <div className="space-y-6">
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full">
              Gratis guide för kontorsansvariga
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black leading-tight text-foreground">
              Så får ni bättre frukt på kontoret&nbsp;– utan att betala&nbsp;mer
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Få konkreta tips om pris, kvalitet och hur ni sparar tid i vardagen som kontorsansvarig.
            </p>

            {!showForm && (
              <div className="space-y-2">
                <Button
                  size="lg"
                  onClick={() => setShowForm(true)}
                  className="bg-primary hover:bg-primary-dark text-primary-foreground px-10 py-5 rounded-full shadow-[0_8px_30px_-4px_hsl(152_50%_30%/0.5)] hover:shadow-[0_12px_40px_-4px_hsl(152_50%_30%/0.6)] transition-all border-2 border-white/30 font-bold text-lg tracking-wide"
                >
                  Få tipsen direkt
                </Button>
                <p className="text-sm text-muted-foreground">Tar 30 sekunder • Helt gratis</p>
              </div>
            )}

            {/* Trust element */}
            <p className="text-sm italic text-muted-foreground/80 border-l-2 border-primary/30 pl-3">
              "De flesta företag betalar 10–25 % mer än de behöver – vi visar varför."
            </p>
          </div>

          {/* Right — Image or Form */}
          <div className="relative">
            {!showForm ? (
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={fruktKontorImg}
                  alt="Fräsch frukt på ett modernt kontor"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  width={800}
                  height={600}
                />
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-xl border border-border p-6 sm:p-8 space-y-5 animate-in fade-in slide-in-from-right-4 duration-500"
              >
                <h3 className="text-xl font-bold text-foreground">Fyll i nedan så skickar vi tipsen</h3>

                <div className="space-y-4">
                  {/* Företagsnamn */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Företagsnamn *</label>
                    <Input
                      placeholder="Ert företag"
                      value={formData.companyName}
                      onChange={e => setFormData(p => ({ ...p, companyName: e.target.value }))}
                      required
                      maxLength={100}
                    />
                  </div>

                  {/* Antal anställda + Leverans per vecka — row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Antal anställda *</label>
                      <Select value={formData.employeeCount} onValueChange={v => setFormData(p => ({ ...p, employeeCount: v }))}>
                        <SelectTrigger><SelectValue placeholder="Välj..." /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1–10</SelectItem>
                          <SelectItem value="10-20">10–20</SelectItem>
                          <SelectItem value="20-50">20–50</SelectItem>
                          <SelectItem value="50+">50+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Leverans/vecka *</label>
                      <Select value={formData.deliveryFrequency} onValueChange={v => setFormData(p => ({ ...p, deliveryFrequency: v }))}>
                        <SelectTrigger><SelectValue placeholder="Välj..." /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1 gång">1 gång</SelectItem>
                          <SelectItem value="2 gånger">2 gånger</SelectItem>
                          <SelectItem value="3 gånger">3 gånger</SelectItem>
                          <SelectItem value="Mer än 3 gånger">Mer än 3 gånger</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Checkbox: Frukt som blir över */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Är det någon frukt som alltid blir över?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {LEFTOVER_OPTIONS.map(item => (
                        <label
                          key={item}
                          className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Checkbox
                            checked={selectedLeftovers.includes(item)}
                            onCheckedChange={() => toggleLeftover(item)}
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Leveranstid + Korgnamn — row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Leveranstid ungefär?</label>
                      <Select value={formData.deliveryTime} onValueChange={v => setFormData(p => ({ ...p, deliveryTime: v }))}>
                        <SelectTrigger><SelectValue placeholder="Välj..." /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Före 08:00">Före 08:00</SelectItem>
                          <SelectItem value="08:00-10:00">08:00–10:00</SelectItem>
                          <SelectItem value="10:00-12:00">10:00–12:00</SelectItem>
                          <SelectItem value="12:00-15:00">12:00–15:00</SelectItem>
                          <SelectItem value="Vet ej">Vet ej</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Vad heter er korg?</label>
                      <Input
                        placeholder="T.ex. Mellankorg"
                        value={formData.currentBasketName}
                        onChange={e => setFormData(p => ({ ...p, currentBasketName: e.target.value }))}
                        maxLength={100}
                      />
                    </div>
                  </div>

                  {/* E-post + Telefon — row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">E-post *</label>
                      <Input
                        type="email"
                        placeholder="namn@foretag.se"
                        value={formData.email}
                        onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                        required
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Telefon *</label>
                      <Input
                        type="tel"
                        placeholder="070-123 45 67"
                        value={formData.phone}
                        onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                        required
                        maxLength={20}
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-dark text-primary-foreground rounded-full py-5 font-bold text-lg shadow-[0_8px_30px_-4px_hsl(152_50%_30%/0.5)] hover:shadow-[0_12px_40px_-4px_hsl(152_50%_30%/0.6)] transition-all border-2 border-white/30"
                >
                  {isSubmitting ? 'Skickar...' : 'Skicka till mig'}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Vi delar aldrig din information. Helt kostnadsfritt.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadCaptureSection;
