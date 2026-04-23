import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import SEOHead from '@/components/SEOHead';
import FruktexpertenLogo from '@/components/FruktexpertenLogo';
import { trackContactSubmitted } from '@/lib/gtm';
import { CheckCircle2, Phone, Star, Truck, Clock, Shield, Leaf, Gift } from 'lucide-react';
import fruktKontorImg from '@/assets/frukt-pa-kontoret-tips.jpg';

const PHONE = '010-183 98 36';
const PHONE_TEL = '0101839836';

const Erbjudande = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    employeeCount: '',
    deliveryFrequency: '',
    email: '',
    phone: '',
  });

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
      });

      if (dbError) throw dbError;

      await supabase.functions.invoke('send-contact-email', {
        body: {
          formType: 'Lead – Google Ads (Provkorg + 8% rabatt)',
          name: formData.companyName,
          email: formData.email,
          phone: formData.phone,
          message: [
            `Erbjudande: GRATIS PROVKORG + 8% RABATT`,
            `Företag: ${formData.companyName}`,
            `Antal anställda: ${formData.employeeCount}`,
            `Leveransfrekvens: ${formData.deliveryFrequency}`,
            `E-post: ${formData.email}`,
            `Telefon: ${formData.phone}`,
          ].join('\n'),
        },
      });

      trackContactSubmitted();
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Erbjudande submit error:', err);
      toast({ title: 'Något gick fel, försök igen.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Gratis provkorg + 8% rabatt – Färska fruktkorgar till kontoret | Vitaminkorgen"
        description="Beställ en gratis provkorg och få 8% rabatt på första månaden. Färska fruktkorgar levererade direkt till ert kontor i Stockholm. Inga bindningstider."
        noindex={true}
      />

      {/* Minimal header – no nav menu, just logo + phone */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <FruktexpertenLogo className="h-10 w-auto" />
          <a
            href={`tel:${PHONE_TEL}`}
            className="flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">{PHONE}</span>
          </a>
        </div>
      </header>

      {submitted ? (
        /* Tack-sida */
        <main className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">Tack! Vi hör av oss inom 24h</h1>
            <p className="text-lg text-muted-foreground">
              Vi kontaktar dig snart för att bekräfta din <strong>gratis provkorg</strong> och din{' '}
              <strong>8% rabatt</strong> på första månaden.
            </p>
            <div className="bg-accent-light-green rounded-2xl p-6 text-left space-y-3">
              <p className="font-semibold">Vad händer nu?</p>
              <ol className="space-y-2 text-muted-foreground">
                <li>1. Vi ringer dig på <strong>{formData.phone}</strong></li>
                <li>2. Vi bokar en passande leveransdag</li>
                <li>3. Provkorgen levereras inom 2–5 arbetsdagar</li>
              </ol>
            </div>
            <p className="text-sm text-muted-foreground">
              Vill du nå oss direkt? Ring{' '}
              <a href={`tel:${PHONE_TEL}`} className="text-primary font-semibold hover:underline">
                {PHONE}
              </a>
            </p>
          </div>
        </main>
      ) : (
        <main>
          {/* HERO */}
          <section className="relative overflow-hidden bg-gradient-to-br from-accent-light-green via-background to-background py-12 sm:py-20">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
                <div className="space-y-6">
                  <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase px-4 py-2 rounded-full">
                    <Gift className="h-3.5 w-3.5" />
                    Endast nya kunder
                  </span>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-foreground">
                    Gratis provkorg{' '}
                    <span className="text-primary">+ 8% rabatt</span>
                  </h1>

                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Färska fruktkorgar levererade direkt till ert kontor i Stockholm.
                    Testa kostnadsfritt – inga bindningstider.
                  </p>

                  {/* Trust row */}
                  <div className="flex flex-wrap gap-4 pt-2">
                    <div className="flex items-center gap-1.5">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">5/5 Google</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold">150+ företag</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Shield className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold">Sedan 2021</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                      size="lg"
                      onClick={() => document.getElementById('formular')?.scrollIntoView({ behavior: 'smooth' })}
                      className="bg-primary hover:bg-primary-dark text-primary-foreground px-10 py-6 rounded-full font-bold text-lg shadow-[0_8px_30px_-4px_hsl(152_50%_30%/0.5)] border-2 border-white/30"
                    >
                      Beställ provkorg gratis →
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="px-8 py-6 rounded-full font-bold text-lg border-2"
                    >
                      <a href={`tel:${PHONE_TEL}`}>
                        <Phone className="mr-2 h-5 w-5" />
                        Ring oss
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Form (above the fold) */}
                <div id="formular" className="lg:scroll-mt-24">
                  <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl shadow-2xl border border-border p-6 sm:p-8 space-y-5"
                  >
                    <div className="text-center space-y-1">
                      <h2 className="text-2xl font-bold">Säkra ditt erbjudande</h2>
                      <p className="text-sm text-muted-foreground">
                        Tar 30 sekunder • Vi hör av oss inom 24h
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block">Företagsnamn *</label>
                      <Input
                        placeholder="Ert företag"
                        value={formData.companyName}
                        onChange={e => setFormData(p => ({ ...p, companyName: e.target.value }))}
                        required
                        maxLength={100}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Antal anställda *</label>
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
                        <label className="text-sm font-medium mb-1 block">Leverans/vecka *</label>
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

                    <div>
                      <label className="text-sm font-medium mb-1 block">E-post *</label>
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
                      <label className="text-sm font-medium mb-1 block">Telefon *</label>
                      <Input
                        type="tel"
                        placeholder="070-123 45 67"
                        value={formData.phone}
                        onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                        required
                        maxLength={20}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary-dark text-primary-foreground rounded-full py-6 font-bold text-lg shadow-[0_8px_30px_-4px_hsl(152_50%_30%/0.5)] border-2 border-white/30"
                    >
                      {isSubmitting ? 'Skickar...' : 'Aktivera erbjudande →'}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      🔒 Vi delar aldrig din information • Inga bindningstider
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* USPs */}
          <section className="py-16 sm:py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
                  Varför företag väljer Vitaminkorgen
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { icon: Leaf, title: 'Handplockad frukt', text: 'Färska säsongsfrukter, plockade dagen innan leverans till kontoret.' },
                    { icon: Truck, title: 'Fri leverans', text: 'Vi kör fraktfritt i hela Stockholm, Södertälje och Uppsala.' },
                    { icon: Clock, title: 'Flexibelt avtal', text: 'Pausa när ni vill, ändra storlek eller avsluta utan bindningstid.' },
                  ].map((u, i) => (
                    <div key={i} className="text-center space-y-3">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10">
                        <u.icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">{u.title}</h3>
                      <p className="text-muted-foreground">{u.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Pristabell */}
          <section className="py-16 sm:py-20 bg-accent-light-green">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3">
                  Våra fruktkorgar
                </h2>
                <p className="text-center text-muted-foreground mb-10">
                  Med 8% rabatt på första månaden ✨
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { name: 'Original', size: 'ca 4 kg', price: '230', discounted: '212', desc: 'Blandade säsongsfrukter. Perfekt för mindre kontor.' },
                    { name: 'Premium', size: 'ca 6 kg', price: '340', discounted: '313', desc: 'Handplockade exotiska och lokala frukter.', popular: true },
                    { name: 'Banan', size: 'ca 5 kg', price: '199', discounted: '183', desc: 'Endast bananer. Populärt för aktiva kontor.' },
                  ].map((p, i) => (
                    <div
                      key={i}
                      className={`relative bg-white rounded-2xl p-6 shadow-lg border-2 ${p.popular ? 'border-primary' : 'border-transparent'}`}
                    >
                      {p.popular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                          Populärast
                        </span>
                      )}
                      <h3 className="text-2xl font-bold mb-1">Fruktkorg {p.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{p.size}</p>
                      <p className="text-muted-foreground mb-4 min-h-[3rem]">{p.desc}</p>
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-3xl font-black text-primary">{p.discounted} kr</span>
                        <span className="text-lg text-muted-foreground line-through">{p.price} kr</span>
                        <span className="text-sm text-muted-foreground">/vecka</span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Fri leverans</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Pausa när som helst</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Anpassa innehåll</li>
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-10">
                  <Button
                    size="lg"
                    onClick={() => document.getElementById('formular')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-primary hover:bg-primary-dark text-primary-foreground px-10 py-6 rounded-full font-bold text-lg shadow-[0_8px_30px_-4px_hsl(152_50%_30%/0.5)] border-2 border-white/30"
                  >
                    Beställ provkorg gratis →
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Sociala bevis */}
          <section className="py-16 sm:py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
                  Vad våra kunder säger
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { name: 'Anna Svensson', company: 'Marketing-byrå, Stockholm', text: 'Fantastisk service! Fruktkorgar levereras alltid i tid och frukterna är så färska. Våra medarbetare älskar dem!' },
                    { name: 'Lars Andersson', company: 'Konsultbolag, Östermalm', text: 'Har använt Vitaminkorgen i över ett år. Otroligt bra kvalitet och professionell leverans varje vecka.' },
                    { name: 'Maria Johansson', company: 'Tech-startup, Vasastan', text: 'Bästa fruktleveransen i Stockholm! Handplockat urval och alltid perfekt mogna frukter. Rekommenderar starkt!' },
                  ].map((r, i) => (
                    <div key={i} className="bg-card rounded-2xl p-6 border border-border space-y-3">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-muted-foreground italic">"{r.text}"</p>
                      <div>
                        <p className="font-semibold">{r.name}</p>
                        <p className="text-sm text-muted-foreground">{r.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Bild + text */}
          <section className="py-16 sm:py-20 bg-accent-light-green">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={fruktKontorImg}
                    alt="Fräsch fruktkorg på ett modernt kontor"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                </div>
                <div className="space-y-5">
                  <h2 className="text-3xl sm:text-4xl font-bold">Så fungerar det</h2>
                  <ol className="space-y-4">
                    {[
                      'Fyll i formuläret – tar 30 sekunder',
                      'Vi ringer för att bekräfta startdag (mån–fre)',
                      'Provkorgen levereras gratis inom 2–5 arbetsdagar',
                      'Trivs ni? Få 8% rabatt på första månadens leveranser',
                    ].map((step, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <span className="text-lg pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-16 sm:py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
                  Vanliga frågor
                </h2>
                <div className="space-y-4">
                  {[
                    { q: 'Är provkorgen verkligen gratis?', a: 'Ja, helt gratis. Vi vill att ni ska få känna på kvaliteten innan ni bestämmer er. Inga bindningar.' },
                    { q: 'Hur fungerar 8% rabatten?', a: 'När ni väljer att fortsätta efter provkorgen får ni automatiskt 8% rabatt på alla leveranser under första månaden.' },
                    { q: 'Vilka områden levererar ni till?', a: 'Vi levererar fritt till hela Stockholm, Södertälje och Uppsala – från Södermalm till Östermalm, Kungsholmen, Vasastan och alla närliggande områden.' },
                    { q: 'Måste vi binda upp oss?', a: 'Nej, aldrig. Ni kan pausa, ändra eller avsluta abonnemanget när som helst.' },
                    { q: 'Kan vi anpassa fruktkorgen?', a: 'Absolut! Vi tar hänsyn till allergier, önskemål och kan blanda olika korgar. Bara meddela oss vid beställning.' },
                    { q: 'Hur snabbt får vi första leveransen?', a: 'Oftast inom 2–5 arbetsdagar efter att vi pratat med er. Vi anpassar startdag efter era önskemål.' },
                  ].map((f, i) => (
                    <details
                      key={i}
                      className="group bg-card rounded-xl border border-border p-5 cursor-pointer"
                    >
                      <summary className="font-semibold flex justify-between items-center list-none">
                        {f.q}
                        <span className="text-primary text-2xl group-open:rotate-45 transition-transform">+</span>
                      </summary>
                      <p className="mt-3 text-muted-foreground">{f.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-16 sm:py-24 bg-gradient-to-br from-primary to-primary-dark text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-3xl mx-auto space-y-6">
                <h2 className="text-3xl sm:text-5xl font-black">
                  Redo att smaka skillnaden?
                </h2>
                <p className="text-xl opacity-90">
                  Gratis provkorg + 8% rabatt på första månaden – endast för nya kunder
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                  <Button
                    size="lg"
                    onClick={() => document.getElementById('formular')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-white text-primary hover:bg-white/90 px-10 py-6 rounded-full font-bold text-lg shadow-2xl"
                  >
                    Beställ provkorg gratis →
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-10 py-6 rounded-full font-bold text-lg"
                  >
                    <a href={`tel:${PHONE_TEL}`}>
                      <Phone className="mr-2 h-5 w-5" />
                      {PHONE}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Minimal footer */}
      <footer className="border-t border-border py-6 bg-background">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Vitaminkorgen AB • {' '}
            <a href={`tel:${PHONE_TEL}`} className="text-primary hover:underline">{PHONE}</a> • {' '}
            <a href="mailto:info@vitaminkorgen.se" className="text-primary hover:underline">info@vitaminkorgen.se</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Erbjudande;