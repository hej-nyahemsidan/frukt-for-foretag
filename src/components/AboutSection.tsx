import React from 'react';
import { Award, Users, Leaf, Clock } from 'lucide-react';

const AboutSection = () => {
  const stats = [
    {
      icon: Clock,
      number: '35+',
      label: 'År i branschen',
      description: 'Sedan 1986'
    },
    {
      icon: Users,
      number: '500+',
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
      number: '4.8/5',
      label: 'Kundbetyg',
      description: 'Genomsnittligt betyg'
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
              Sedan 1986 har vi varit Sveriges ledande leverantör av frisk frukt till företag. 
              Vår passion för kvalitet och hållbarhet driver oss framåt varje dag.
            </p>
            {/* Since 1986, we have been Sweden's leading supplier of fresh fruit to companies. Our passion for quality and sustainability drives us forward every day. */}
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            {/* Story Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="heading-md text-foreground">
                  En familjetradition av kvalitet
                </h3>
                {/* A family tradition of quality */}
                
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Allt började 1986 när grundaren Erik Andersson hade en enkel vision: 
                    att göra det enkelt för svenska företag att erbjuda sina anställda näringsrik, 
                    färsk frukt direkt på arbetsplatsen.
                  </p>
                  {/* It all started in 1986 when founder Erik Andersson had a simple vision: to make it easy for Swedish companies to offer their employees nutritious, fresh fruit directly in the workplace. */}
                  
                  <p>
                    Idag är vi fortfarande ett familjeägt företag som strävar efter samma höga 
                    kvalitetsstandard som vi hade från början. Vi arbetar endast med certifierade, 
                    hållbara leverantörer och levererar till över 500 företag i hela Sverige.
                  </p>
                  {/* Today we are still a family-owned company that strives for the same high quality standards that we had from the beginning. We only work with certified, sustainable suppliers and deliver to over 500 companies throughout Sweden. */}
                  
                  <p>
                    Vår mission är enkel: att skapa hälsosammare arbetsplatser och en mer 
                    hållbar framtid genom att göra näringsrik frukt tillgänglig för alla.
                  </p>
                  {/* Our mission is simple: to create healthier workplaces and a more sustainable future by making nutritious fruit available to everyone. */}
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

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 text-center"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                    {stat.number}
                  </h3>
                  <p className="font-medium text-foreground mb-1">
                    {stat.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Team/Certification Section */}
          <div className="bg-card rounded-3xl p-8 lg:p-12 shadow-soft">
            <div className="text-center space-y-6">
              <h3 className="heading-md text-foreground">
                Certifieringar & Partnerskap
              </h3>
              {/* Certifications & Partnerships */}
              
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Vi är stolta över våra certifieringar inom ekologisk odling, hållbar handel och 
                livsmedelssäkerhet. Våra partnerskap med lokala odlare stödjer svensk jordbruk.
              </p>
              {/* We are proud of our certifications in organic farming, sustainable trade and food safety. Our partnerships with local growers support Swedish agriculture. */}
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center pt-8">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-accent-green/10 rounded-xl flex items-center justify-center mx-auto">
                    <span className="text-2xl">🌱</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">KRAV-certifierad</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">ISO 22000</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-accent-orange/10 rounded-xl flex items-center justify-center mx-auto">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">Fairtrade</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-accent-yellow/10 rounded-xl flex items-center justify-center mx-auto">
                    <span className="text-2xl">🇸🇪</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">Svenskt ursprung</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;