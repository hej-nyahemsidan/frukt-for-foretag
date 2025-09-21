import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    employees: '',
    message: ''
  });
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Tack för ditt meddelande!",
      description: "Vi återkommer inom 24 timmar med ett skräddarsytt förslag.",
    });
    
    // Reset form
    setFormData({
      company: '',
      name: '',
      email: '',
      phone: '',
      employees: '',
      message: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <h2 className="heading-lg text-foreground">
              Kontakta Oss
            </h2>
            {/* Contact Us */}
            <p className="text-lead max-w-3xl mx-auto">
              Redo att starta er resa mot en hälsosammare arbetsplats? Kontakta oss idag 
              för en kostnadsfri konsultation och skräddarsytt förslag.
            </p>
            {/* Ready to start your journey towards a healthier workplace? Contact us today for a free consultation and customized proposal. */}
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="space-y-8">
              <div>
                <h3 className="heading-md text-foreground mb-4">
                  Begär Offert
                </h3>
                {/* Request Quote */}
                <p className="text-muted-foreground">
                  Fyll i formuläret så återkommer vi med ett skräddarsytt förslag inom 24 timmar.
                </p>
                {/* Fill in the form and we'll get back with a customized proposal within 24 hours. */}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Företagsnamn *</Label>
                    {/* Company name */}
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Ert företagsnamn"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Kontaktperson *</Label>
                    {/* Contact person */}
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="För- och efternamn"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-postadress *</Label>
                    {/* Email address */}
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="exempel@företag.se"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefonnummer</Label>
                    {/* Phone number */}
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="08-123 45 67"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employees">Antal anställda</Label>
                  {/* Number of employees */}
                  <Select onValueChange={(value) => handleInputChange('employees', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Välj antal anställda" />
                      {/* Select number of employees */}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 anställda</SelectItem>
                      <SelectItem value="11-25">11-25 anställda</SelectItem>
                      <SelectItem value="26-50">26-50 anställda</SelectItem>
                      <SelectItem value="51-100">51-100 anställda</SelectItem>
                      <SelectItem value="100+">Över 100 anställda</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Meddelande</Label>
                  {/* Message */}
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Berätta gärna om era behov och önskemål..."
                    rows={4}
                  />
                  {/* Tell us about your needs and wishes... */}
                </div>

                <Button type="submit" className="w-full btn-hero text-lg py-4">
                  Skicka Förfrågan
                  {/* Send Request */}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  * Obligatoriska fält. Vi behandlar dina uppgifter enligt GDPR.
                </p>
                {/* * Required fields. We process your data according to GDPR. */}
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="heading-md text-foreground mb-4">
                  Kontaktinformation
                </h3>
                {/* Contact Information */}
                <p className="text-muted-foreground">
                  Vi finns här för att hjälpa er! Kontakta oss på det sätt som passar er bäst.
                </p>
                {/* We are here to help you! Contact us in the way that suits you best. */}
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-xl">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Telefon</h4>
                    <p className="text-muted-foreground">08-123 45 67</p>
                    <p className="text-sm text-muted-foreground">Vardagar 8:00-17:00</p>
                    {/* Weekdays 8:00-17:00 */}
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-xl">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">E-post</h4>
                    <p className="text-muted-foreground">info@fruktkorgspro.se</p>
                    <p className="text-sm text-muted-foreground">Svarar inom 24 timmar</p>
                    {/* Reply within 24 hours */}
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-xl">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Adress</h4>
                    <p className="text-muted-foreground">
                      Fruktgatan 12<br />
                      118 25 Stockholm
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-xl">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Öppettider</h4>
                    {/* Opening hours */}
                    <div className="text-muted-foreground text-sm space-y-1">
                      <p>Måndag - Fredag: 8:00-17:00</p>
                      <p>Lördag - Söndag: Stängt</p>
                      {/* Monday - Friday: 8:00-17:00, Saturday - Sunday: Closed */}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Box */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
                <h4 className="font-semibold text-foreground mb-2">
                  Boka en kostnadsfri konsultation
                </h4>
                {/* Book a free consultation */}
                <p className="text-muted-foreground text-sm mb-4">
                  Låt oss hjälpa er att hitta den perfekta frukttlösningen för ert företag.
                </p>
                {/* Let us help you find the perfect fruit solution for your company. */}
                <Button className="btn-secondary w-full">
                  Ring Nu: 08-123 45 67
                  {/* Call Now: 08-123 45 67 */}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;