
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
  Leaf
} from 'lucide-react';
import VitaminKorgenLogo from '@/components/VitaminKorgenLogo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
            <div className="pt-4">
              <a 
                href="https://www.google.com/search?sa=X&sca_esv=13677aa2df667dbd&tbm=lcl&sxsrf=AE3TifP960pKcOc8yw6b-P3P-YY67jPYTA:1759235931553&q=Vitaminkorgen+i+Stockholm+-+Frukt+p%C3%A5+jobbet+Recensioner&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNDU3sLSwMDOwMLCwMDS2tDS1tNzAyPiK0SIssyQxNzMvO78oPTVPIVMhuCQ_OTsjPydXQVfBrag0u0Sh4PBShaz8pKTUEoWg1OTUvOLM_LzUokWsZGsFANIybPSRAAAA&rldimm=15709886080881399599&hl=sv-SE&ved=2ahUKEwiW35rGwICQAxUNAhAIHdfIPOsQ9fQKegQIUxAF&biw=1600&bih=864&dpr=1.8#lkt=LocalPoiReviews" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center space-x-2 px-4 py-2 bg-green-700 hover:bg-orange-500 rounded-lg transition-all duration-300 hover:scale-105 text-sm font-medium"
              >
                <span>⭐</span>
                <span>Läs våra Google-recensioner</span>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <span className="mr-2">📍</span> Kontakt
            </h4>
            <div className="space-y-3 text-sm">
              <a href="tel:+46762862693" className="flex items-center space-x-3 text-gray-100 hover:text-yellow-400 transition-colors">
                <Phone className="h-5 w-5" />
                <span>+46-76 286 26 93</span>
              </a>
              <a href="mailto:info@vitaminkorgen.se" className="flex items-center space-x-3 text-gray-100 hover:text-yellow-400 transition-colors">
                <Mail className="h-5 w-5" />
                <span>info@vitaminkorgen.se</span>
              </a>
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