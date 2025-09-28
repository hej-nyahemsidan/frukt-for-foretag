
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Instagram, 
  Linkedin,
  Truck,
  ShieldCheck,
  Leaf,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import VitaminKorgenLogo from '@/components/VitaminKorgenLogo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isInIframe, setIsInIframe] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsInIframe(window.self !== window.top);
  }, []);

  const address = "Varuvägen 9, 125 30 Älvsjö";
  
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      toast({
        title: "Adress kopierad!",
        description: "Adressen har kopierats till urklipp.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Kunde inte kopiera",
        description: "Försök markera och kopiera manuellt.",
        variant: "destructive",
      });
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400"></div>
      
      {/* Main footer content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div className="mb-6 w-full">
              <a href="/" className="block">
                <div className="text-left">
                  <div className="text-5xl font-bold bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg shadow-yellow-400/50 leading-none tracking-wide">Vitamin</div>
                  <div className="text-5xl font-bold text-green-500 leading-none tracking-wide">Korgen</div>
                </div>
              </a>
            </div>
            <p className="text-gray-100 text-sm leading-relaxed">
              Stockholms ledande leverantör av färsk frukt till kontor och företag. 
              Vi brinner för kvalitet, hållbarhet och er hälsa.
            </p>
            <div className="flex space-x-3 pt-4">
              <a href="https://facebook.com/vitaminkorgen" target="_blank" rel="noopener noreferrer" className="p-2 bg-green-700 hover:bg-orange-500 rounded-full transition-all duration-300 hover:scale-110">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/vitaminkorgen" target="_blank" rel="noopener noreferrer" className="p-2 bg-green-700 hover:bg-orange-500 rounded-full transition-all duration-300 hover:scale-110">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/company/vitaminkorgen" target="_blank" rel="noopener noreferrer" className="p-2 bg-green-700 hover:bg-orange-500 rounded-full transition-all duration-300 hover:scale-110">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <span className="mr-2">📍</span> Kontakt & Plats
            </h4>
            <div className="space-y-3 text-sm">
              {/* Address with copy functionality */}
              <div className="flex items-start space-x-3 text-gray-100 group">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Varuvägen 9</p>
                      <p>125 30 Älvsjö</p>
                    </div>
                    <button
                      onClick={copyAddress}
                      className="ml-2 p-1.5 bg-green-700/50 hover:bg-green-600 rounded transition-colors"
                      title="Kopiera adress"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-300" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-300" />
                      )}
                    </button>
                  </div>
                  
                  {/* Map options */}
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <a 
                      href="https://www.openstreetmap.org/?mlat=59.2872&mlon=17.9881&zoom=16"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Karta
                    </a>
                    <a 
                      href="https://maps.apple.com/?q=Varuvägen+9,+125+30+Älvsjö"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-600 hover:bg-gray-700 rounded text-white transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Apple Maps
                    </a>
                    {!isInIframe && (
                      <a 
                        href="https://maps.app.goo.gl/jBgC3caVb9ARf5Vp7"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-1 bg-green-600 hover:bg-green-700 rounded text-white transition-colors"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Google Maps
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <a href="tel:0101839836" className="flex items-center space-x-3 text-gray-100 hover:text-yellow-400 transition-colors">
                <Phone className="h-5 w-5" />
                <span>010-183 98 36</span>
              </a>
              <a href="mailto:info@vitaminkorgen.se" className="flex items-center space-x-3 text-gray-100 hover:text-yellow-400 transition-colors">
                <Mail className="h-5 w-5" />
                <span>info@vitaminkorgen.se</span>
              </a>
              <div className="flex items-center space-x-3 text-gray-100">
                <Clock className="h-5 w-5" />
                <span>Mån-Fre: 07:00-17:00</span>
              </div>
            </div>
          </div>


          {/* Features */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">Våra Fördelar</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3 text-gray-100">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Truck className="h-4 w-4 text-yellow-400" />
                </div>
                <span>Fri leverans i Stockholm</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-100">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <ShieldCheck className="h-4 w-4 text-yellow-400" />
                </div>
                <span>100% Kvalitetsgaranti</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-700 pt-6 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          <div className="text-sm text-gray-200">
            © {currentYear} VitaminKorgen AB. Alla rättigheter förbehållna.
          </div>
          <div className="flex space-x-4 text-xs text-gray-300">
            <a href="/integritetspolicy" className="hover:text-yellow-400 transition-colors">Integritetspolicy</a>
            <a href="/cookiepolicy" className="hover:text-yellow-400 transition-colors">Cookiepolicy</a>
            <a href="/villkor" className="hover:text-yellow-400 transition-colors">Villkor</a>
          </div>
        </div>
      </div>

      {/* Decorative background element */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50"></div>
    </footer>
  );
};

export default Footer;