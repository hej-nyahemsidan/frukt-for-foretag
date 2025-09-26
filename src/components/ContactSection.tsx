import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Import images
import officeWellnessImage from '@/assets/office-wellness.jpg';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Tack för ditt meddelande!",
      description: "Vi återkommer till dig snart.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
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
            alt="Clean office workspace" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-green-50/90"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-6xl font-bold text-gray-900 mb-6">
              Kontakta oss om fruktkorgar på jobbet
            </h1>
            <p className="text-2xl text-gray-700 leading-relaxed">
              Vill du veta mer om hur fruktkorgar kan förbättra arbetsmiljön på just 
              ert kontor? Vi på Vitaminkorgen hjälper företag i hela Stockholm med 
              skräddarsydda lösningar för fruktkorgar på jobbet.
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
                Frågor om fruktkorgar på kontoret?
              </h2>
              
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  Oavsett om ni är intresserade av veckoleveranser, vill ha en provkorg 
                  eller behöver en offert på fruktkorg på kontoret – vi svarar alltid 
                  inom 24 timmar.
                </p>
                
                <p>
                  Vi hjälper företag i hela Stockholm att förbättra arbetsmiljön med 
                  våra skräddarsydda fruktkorgar på jobbet. Kontakta oss så berättar 
                  vi mer om hur vi kan hjälpa just er!
                </p>
              </div>
            </div>

            {/* Right Column - Contact Form (60%) */}
            <div className="lg:col-span-3">
              <div className="bg-white p-8 rounded-xl shadow-lg border">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600 font-medium">Namn</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Julia Andersson"
                      className="w-full text-lg py-3"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600 font-medium">E-post*</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="namn@epost.se"
                      className="w-full text-lg py-3"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600 font-medium">Meddelande</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Ert meddelande"
                      rows={5}
                      className="w-full text-lg"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-lg"
                  >
                    Submit
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

export default ContactSection;