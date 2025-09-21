import React from 'react';
import { Award, Users, Leaf, Clock } from 'lucide-react';

const AboutSection = () => {
  const stats = [
    {
      icon: Clock,
      number: '2+',
      label: 'År i branschen',
      description: 'Sedan 2024'
    },
    {
      icon: Users,
      number: '200+',
      label: 'Nöjda företag',
      description: 'Återkommande kunder'
    },
    {
      icon: Leaf,
      number: '100%',
      label: 'Ekologisk frukt',
      description: 'Certifierade leverantörer'
    },
    {
      icon: Award,
      number: '4.9/5',
      label: 'Kundbetyg',
      description: 'Genomsnittlig rating'
    }
  ];

  return (
    <section id="about" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <h2 className="heading-lg text-foreground">
              Vår Historia & Mission
            </h2>
            {/* Our History & Mission */}
            <p className="text-lead max-w-3xl mx-auto">
              Sedan 2024 har vi varit Sveriges ledande leverantör av premium frukt till företag. 
              Vår passion för kvalitet och hållbarhet driver oss framåt varje dag.
            </p>
            {/* Since 1986, we have been Sweden's leading supplier of fresh fruit to companies. Our passion for quality and sustainability drives us forward every day. */}
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            {/* Story Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="heading-md text-foreground">
                  En ny standard för företagsfrukt
                </h3>
                
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Allt började 2024 när grundaren hade en enkel vision: att göra det enkelt för svenska företag att erbjuda sina anställda näringsrik, färsk frukt direkt på arbetsplatsen.
                  </p>
                  
                  <p>
                    Idag är vi ett snabbväxande företag som strävar efter samma höga kvalitetsstandard som vi hade från början. Vi arbetar endast med certifierade, hållbara leverantörer och levererar till över 200 företag i hela Sverige.
                  </p>
                  
                  <p>
                    Vår mission är enkel: att skapa hälsosammare arbetsplatser och en mer hållbar framtid genom att göra näringsrik frukt tillgänglig för alla.
                  </p>
                </div>
              </div>

              {/* Values */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground">Våra värderingar:</h4>
                {/* Our values: */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-foreground">Kvalitet först</p>
                      <p className="text-sm text-muted-foreground">Endast bästa frukter</p>
                      {/* Quality first - Only the best fruits */}
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-foreground">Hållbarhet</p>
                      <p className="text-sm text-muted-foreground">Miljömedvetet val</p>
                      {/* Sustainability - Environmentally conscious choice */}
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-foreground">Pålitlighet</p>
                      <p className="text-sm text-muted-foreground">Leveranser i tid</p>
                      {/* Reliability - On-time deliveries */}
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-foreground">Kundservice</p>
                      <p className="text-sm text-muted-foreground">Personlig support</p>
                      {/* Customer service - Personal support */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Images */}
            <div className="space-y-6">
              <div className="relative rounded-2xl overflow-hidden shadow-soft">
                <img 
                  src="/src/assets/happy-employees.jpg" 
                  alt="Happy employees enjoying fresh fruit at the office"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-lg font-semibold">Glada medarbetare</h4>
                  <p className="text-sm opacity-90">Hälsosam frukt på arbetsplatsen</p>
                </div>
              </div>
              
              <div className="relative rounded-2xl overflow-hidden shadow-soft">
                <img 
                  src="/src/assets/professional-fruit-display.jpg" 
                  alt="Professional fruit display and arrangements"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-lg font-semibold">Professionell service</h4>
                  <p className="text-sm opacity-90">Premium fruktarrangemang</p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Team Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative rounded-3xl overflow-hidden shadow-soft">
              <img 
                src="/src/assets/office-workers-fruit.jpg" 
                alt="Office workers enjoying fruit baskets"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold mb-2">Vårt team i arbete</h3>
                <p className="text-sm opacity-90">Levererar kvalitet till svenska företag</p>
              </div>
            </div>
            
            <div className="relative rounded-3xl overflow-hidden shadow-soft">
              <img 
                src="/src/assets/picnic-basket-fruits.jpg" 
                alt="Premium fruit baskets and arrangements"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold mb-2">Premium fruktkorgar</h3>
                <p className="text-sm opacity-90">Noggrant utvalda produkter för ditt företag</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;