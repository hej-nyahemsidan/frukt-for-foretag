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
    </div>
  );
};

export default QuoteRequestSection;