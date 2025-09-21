import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Import images
import officeWellnessImage from '@/assets/office-wellness.jpg';

const QuoteRequestSection = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    location: '',
    message: ''
  });
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Tack för din offertförfrågan!",
      description: "Vi återkommer med ett skräddarsytt förslag inom 24 timmar.",
    });
    
    // Reset form
    setFormData({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      location: '',
      message: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
            <h1 className="text-6xl font-bold text-gray-900 mb-6">
              Offertförfrågan
            </h1>
            <p className="text-2xl text-gray-700 leading-relaxed">
              Behöver ni lite mer frukt eller en specialbeställning? Fyll i offertformuläret nedan så hör vi av oss direkt.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 px-8 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Left Column - Company Message (40%) */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                Offertförfrågan.
              </h2>
              
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  Vi är ett gäng glada och entusiastiska frukttokiga personer som brinner för att leverera den absolut fräschaste och mest smakrika frukten till våra kunder.
                </p>
                
                <p>
                  Om du har några frågor, funderingar eller bara vill höra vår passionerade presentation av våra frukter, tveka inte att kontakta oss. Vi ser fram emot att höra från dig!
                </p>
              </div>
            </div>

            {/* Right Column - Quote Request Form (60%) */}
            <div className="lg:col-span-3">
              <div className="bg-white p-8 rounded-xl shadow-lg border">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Input
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      placeholder="Google AB"
                      className="w-full text-lg py-3"
                    />
                    <label className="text-sm text-gray-600">Företagsnamn</label>
                  </div>
                  
                  <div className="space-y-2">
                    <Input
                      value={formData.contactPerson}
                      onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                      placeholder="Julia Andersson"
                      className="w-full text-lg py-3"
                      required
                    />
                    <label className="text-sm text-gray-600">Kontaktperson*</label>
                  </div>
                  
                  <div className="space-y-2">
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="dinepost@epost.se"
                      className="w-full text-lg py-3"
                      required
                    />
                    <label className="text-sm text-gray-600">Epost*</label>
                  </div>
                  
                  <div className="space-y-2">
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+46 771 793 336"
                      className="w-full text-lg py-3"
                    />
                    <label className="text-sm text-gray-600">Telefon</label>
                  </div>
                  
                  <div className="space-y-2">
                    <Input
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Stockholm"
                      className="w-full text-lg py-3"
                      required
                    />
                    <label className="text-sm text-gray-600">Ort*</label>
                  </div>
                  
                  <div className="space-y-2">
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Ex: Beskriv ert behov. Ex. Vi är intresserade av 2st 9 kg Eko korgar. Ena ska levereras på måndag och den andra på Onsdag."
                      rows={5}
                      className="w-full text-lg"
                    />
                    <label className="text-sm text-gray-600">Meddelande</label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-lg w-full"
                  >
                    Skicka
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Address */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Adress</h3>
              <div className="text-gray-600">
                <p className="font-medium">Huvudkontoret:</p>
                <p>Vikingavägen 1, Huddinge</p>
              </div>
            </div>

            {/* Contact */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Kontakt</h3>
              <div className="text-gray-600">
                <p>020 – 88 44 00</p>
                <p>info@fruktexperten.se</p>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Öppettider</h3>
              <div className="text-gray-600">
                <p>Mån – Tors    8:00 – 16:00</p>
                <p>Fredag        8:00 – 12:00</p>
              </div>
            </div>

            {/* Live Chat */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Chatta med oss</h3>
              <div className="text-gray-600">
                <p>Klicka på knappen längst ner till höger för att chatta med oss.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer Section */}
      <footer className="bg-gray-900 text-white py-16 px-8">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Logo and Company Info */}
            <div className="space-y-6">
              <div className="text-2xl font-bold text-green-400">
                Fruktexperten
              </div>
              <p className="text-gray-300">
                Sveriges ledande leverantör av premium frukt till företag sedan 2024.
              </p>
            </div>

            {/* Locations */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold">Våra Kontor</h4>
              <div className="space-y-4 text-gray-300">
                <div>
                  <p className="font-medium">Stockholm</p>
                  <p className="text-sm">Vikingavägen 1, 141 02 Huddinge</p>
                </div>
                <div>
                  <p className="font-medium">Göteborg</p>
                  <p className="text-sm">Tuvevägen 37, 417 05 Göteborg</p>
                </div>
                <div>
                  <p className="font-medium">Uppsala</p>
                  <p className="text-sm">Södra Dragvägen 9, 754 54 Uppsala</p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold">Kontakt</h4>
              <div className="space-y-2 text-gray-300">
                <p>020 – 88 44 00</p>
                <p>info@fruktexperten.se</p>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium">Öppettider</h5>
                <div className="text-sm text-gray-300">
                  <p>Mån – Tors    8:00 – 16:00</p>
                  <p>Fredag        8:00 – 12:00</p>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold">Navigation</h4>
              <div className="grid grid-cols-2 gap-2 text-gray-300">
                <a href="/om-oss" className="hover:text-green-400 transition-colors">
                  Om Oss
                </a>
                <a href="/kontakt" className="hover:text-green-400 transition-colors">
                  Kontakt
                </a>
                <a href="/sortiment" className="hover:text-green-400 transition-colors">
                  Produkter
                </a>
                <a href="/offertforfragan" className="hover:text-green-400 transition-colors">
                  Offert
                </a>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Köpevillkor
                </a>
                <a href="/kundportal" className="hover:text-green-400 transition-colors">
                  Kundportal
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Fruktexperten. Alla rättigheter förbehållna.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default QuoteRequestSection;