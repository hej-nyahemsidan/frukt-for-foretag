import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronDown, ChevronRight, Clock, MapPin, HeartHandshake, Users, Apple } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Import images
import fruityImage from '@/assets/fruktkorg-leverans-foretag.jpg';
import workplaceImage from '@/assets/fruktkorg-pa-jobbet-stockholm.jpg';
import happyTeamImage from '@/assets/glada-anstallda-fruktkorg-foretag.jpg';

const AboutSection = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const faqItems = [
    {
      question: "Kan man beställa hur många korgar som helst?",
      answer: "Ja, vi anpassar oss efter era behov! Vi levererar allt från en enda fruktkorg för små kontor till hundratals korgar för stora företag. Det finns ingen övre eller nedre gräns - vi skräddarsyr lösningen efter er verksamhet."
    },
    {
      question: "Vi är inte nöjda med vår korg, får vi ersättning?",
      answer: "Absolut! Vi har 100% nöjdhetsgaranti. Är ni inte helt nöjda med kvaliteten eller innehållet ersätter vi korgen eller återbetalar beloppet. Kontakta oss inom 24 timmar efter leverans så löser vi det direkt."
    },
    {
      question: "Hur går beställningen till?",
      answer: "Beställning görs enkelt via vår webbplats eller genom att kontakta oss direkt. Vi skapar en skräddarsydd lösning baserat på era behov och levererar sedan varje vecka på en tid som passar er."
    },
    {
      question: "Vad kostar det?",
      answer: "Priset varierar beroende på volym, frukttyper och leveransfrekvens. Vi erbjuder konkurrenskraftiga priser och ger gärna en kostnadsfri offert anpassad efter era behov."
    },
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!formData.name.trim() || !formData.email.trim()) {
      toast({
        title: "Fyll i alla obligatoriska fält",
        description: "Namn och e-post måste fyllas i.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          formType: 'Kontaktformulär (Om oss)',
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
        }
      });

      if (error) throw error;

      toast({
        title: "Meddelande skickat!",
        description: "Vi återkommer så snart som möjligt.",
      });

      // Clear form
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Något gick fel",
        description: "Kunde inte skicka meddelandet. Försök igen senare.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-50 py-20 px-8 overflow-hidden">
        <div className="absolute top-10 right-10 opacity-30 hidden min-[700px]:block">
          <img 
            src={fruityImage} 
            alt="Färsk fruktkorg levererad till företag i Stockholm" 
            className="w-96 h-96 object-cover rounded-full"
          />
        </div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Om oss – fruktkorgar som skapar ett bättre arbetsklimat
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed">
              Vi är Vitaminkorgen, och varje dag arbetar vi för att hjälpa företag i Stockholm att få en bättre arbetsmiljö. Genom våra <Link to="/produkter" className="text-green-600 hover:underline">fruktkorgar</Link>, <Link to="/fruktlada" className="text-green-600 hover:underline">fruktlådor</Link> och <Link to="/fruktkorg-pa-jobbet" className="text-green-600 hover:underline">frukt på jobbet</Link>-lösningar vill vi underlätta vardagen för dig som är fruktansvarig, office manager eller beställare.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1 - More About Us */}
      <section className="py-20 px-8 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                Mer om oss – vi vill att du ska spara tid och slippa stress
              </h2>
              
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  Att vara den som ansvarar för kontorets frukt, mejeri och fika kan lätt bli en tidskrävande syssla. Därför har vi byggt Vitaminkorgen för att vara mer än en leverantör – vi är din partner i vardagen. När du har en fruktkorg från oss behöver du inte stressa över att frukten ska ta slut, att mejeriet är på väg att gå ut eller att det saknas något gott till mötet.
                </p>
                
                <p>
                  Vi erbjuder en flexibel lösning där du enkelt kan komplettera din ordinarie fruktleverans med extra varor inför möten, events eller särskilda tillfällen. Oavsett om det handlar om frukost, mejeri, snacks, läsk eller extra frukt – löser vi det åt dig så att du kan fokusera på det du egentligen ska göra.
                </p>

                <p>
                  Vår ambition är att samarbetet ska kännas självklart. Du ska kunna lita på att rätt varor kommer i rätt tid, i rätt kvalitet och placeras där du önskar. Det är den extra servicen som skiljer oss åt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Service Promise */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            {/* Image - 40% */}
            <div className="lg:col-span-2">
              <img 
                src={workplaceImage} 
                alt="Fruktkorg på kontoret i Stockholm" 
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </div>

            {/* Text Content - 60% */}
            <div className="lg:col-span-3 space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                Extra service – vi placerar frukten där du vill ha den
              </h2>
              
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  En fruktleverans är inte bara en varuleverans för oss. Vi tar med oss frukten in på kontoret och placerar den där det passar er bäst – oavsett om det är i pentryt, konferensrummet eller vid receptionen. Mejeri och andra känsliga varor lägger vi i rätt kylskåp så att inget står och blir dåligt.
                </p>
                
                <p>
                  Det här är särskilt uppskattat av våra kunder där någon annan än beställaren tar emot leveransen, eller där ni helt enkelt vill slippa tänka på detaljerna. Du beställer, vi ser till att allt hamnar rätt.
                </p>

                <p>
                  För oss är det här en självklar del av servicen – inte en tillvalstjänst. Det är så ett riktigt samarbete ska fungera.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Who We Help */}
      <section className="py-20 px-8 bg-white">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                För dig som vill att kontoret ska fungera smidigt
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Våra kunder är allt från små kontor till större företag i Stockholm. Gemensamt är att de vill erbjuda sina medarbetare något fräscht och gott – utan att det ska kräva mycket arbete internt.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Office managers</h3>
                <p className="text-gray-600">
                  Slipp jaga beställningar och dubbelkolla leveranser. Vi håller koll på det praktiska så att du kan fokusera på det viktiga.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Apple className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Fruktsansvariga</h3>
                <p className="text-gray-600">
                  Oavsett om du har ansvar för en avdelning eller hela företaget får du en pålitlig leverans varje vecka.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Flexibla behov</h3>
                <p className="text-gray-600">
                  Behöver ni extra till ett möte, en frukost eller en kickoff? Det ordnar vi enkelt utöver det ordinarie abonnemanget.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Stockholmsföretag</h3>
                <p className="text-gray-600">
                  Vi levererar fruktkorgar till företag i hela Stockholm – från citykontor till industriområden och växande stadsdelar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - Mission Statement */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            {/* Image - 40% */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <img 
                src={happyTeamImage} 
                alt="Glada medarbetare med fruktkorg på kontoret" 
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </div>

            {/* Text Content - 60% */}
            <div className="lg:col-span-3 order-1 lg:order-2 space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                Långsiktigt samarbete – inte bara en fruktleverans
              </h2>
              
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  Vitaminkorgen startades med en tydlig idé: att bygga långsiktiga relationer med företag som vill ha mer än en vanlig fruktleverans. För oss handlar det inte bara om att leverera frukt – det handlar om att leverera service, trygghet och en bättre arbetsmiljö.
                </p>
                
                <p>
                  Vi vill att varje kund ska känna att vi finns där när behoven förändras. Kanske växer ni och behöver fler korgar, kanske vill ni prova en annan storlek, eller så behöver ni plötsligt extra varor till ett event. Då ska det vara enkelt att få hjälp.
                </p>

                <p>
                  Det är därför vi lägger lika mycket energi på relationen som på frukten. När du märker att vi håller vad vi lovar, att leveranserna fungerar och att du slipper lägga tid på att jaga leverantörer – då har vi gjort vårt jobb.
                </p>
              </div>

              {/* Signature */}
              <div className="pt-4">
                <div className="text-2xl font-handwriting text-green-600" style={{ fontFamily: 'cursive' }}>
                  Med vänliga hälsningar, Vitamin Korgen
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 - Values/Impact */}
      <section className="relative py-20 px-8 bg-green-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={fruityImage} 
            alt="Färsk frukt i bakgrunden" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-green-800/80"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <HeartHandshake className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white">
              En partner som tar hand om detaljerna
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Vi tror att små saker gör stor skillnad. En fruktkorg på rätt plats. Mejeri i rätt kylskåp. Extra varor till mötet utan krångel. Det är så vi bygger en bättre arbetsplats – tillsammans med dig.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6 - FAQ */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            Vill du veta mer?
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Column - Contact Form */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Kontakta oss
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="about-contact-name" className="text-sm text-gray-600 font-medium">Namn*</label>
                    <Input 
                      id="about-contact-name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Ditt namn" 
                      className="w-full"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="about-contact-email" className="text-sm text-gray-600 font-medium">E-post*</label>
                    <Input 
                      id="about-contact-email"
                      type="email" 
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Din e-post" 
                      className="w-full"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="about-contact-company" className="text-sm text-gray-600 font-medium">Företag</label>
                    <Input 
                      id="about-contact-company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Företag" 
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="about-contact-message" className="text-sm text-gray-600 font-medium">Meddelande</label>
                    <Textarea 
                      id="about-contact-message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Meddelande" 
                      rows={4}
                      className="w-full"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Skickar...' : 'Kontakta oss'}
                  </Button>
                </form>
              </div>
            </div>

            {/* Right Column - FAQ */}
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="text-lg text-gray-800 font-medium">
                      {item.question}
                    </span>
                    <div className="flex-shrink-0 ml-4">
                      {expandedFAQ.includes(index) ? (
                        <ChevronDown className="w-5 h-5 text-green-600" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                  </button>
                  
                  <div 
                    className={`transition-all duration-300 ease-in-out ${
                      expandedFAQ.includes(index) 
                        ? 'max-h-96 opacity-100' 
                        : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                  >
                    <div className="px-6 pb-5">
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-gray-600 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;