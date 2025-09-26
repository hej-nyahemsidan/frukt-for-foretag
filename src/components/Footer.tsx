import React from 'react';
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
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div className="mb-6">
              <div className="p-3 bg-white/10 rounded-lg inline-block backdrop-blur-sm">
                <VitaminKorgenLogo 
                  size="small" 
                  variant="full"
                  link="/" 
                  className="bg-white/10 rounded-lg"
                />
              </div>
            </div>
            <p className="text-gray-100 text-sm leading-relaxed">
              Stockholms ledande leverantör av färsk frukt till kontor och företag. 
              Vi brinner för kvalitet, hållbarhet och er hälsa.
            </p>
            <div className="flex space-x-3 pt-4">
              <a href="https://facebook.com/fruktportalen" target="_blank" rel="noopener noreferrer" className="p-2 bg-green-700 hover:bg-orange-500 rounded-full transition-all duration-300 hover:scale-110">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/fruktportalen" target="_blank" rel="noopener noreferrer" className="p-2 bg-green-700 hover:bg-orange-500 rounded-full transition-all duration-300 hover:scale-110">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/company/fruktportalen" target="_blank" rel="noopener noreferrer" className="p-2 bg-green-700 hover:bg-orange-500 rounded-full transition-all duration-300 hover:scale-110">
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
              <div className="flex items-start space-x-3 text-gray-100 hover:text-yellow-400 transition-colors">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Huvudkontor Stockholm</p>
                  <p className="text-xs">Sveavägen 123</p>
                  <p className="text-xs">111 23 Stockholm</p>
                </div>
              </div>
              <a href="tel:+46812345678" className="flex items-center space-x-3 text-gray-100 hover:text-yellow-400 transition-colors">
                <Phone className="h-5 w-5" />
                <span>08-123 456 78</span>
              </a>
              <a href="mailto:info@fruktportalen.se" className="flex items-center space-x-3 text-gray-100 hover:text-yellow-400 transition-colors">
                <Mail className="h-5 w-5" />
                <span>info@fruktportalen.se</span>
              </a>
              <div className="flex items-center space-x-3 text-gray-100">
                <Clock className="h-5 w-5" />
                <span>Mån-Fre: 07:00-17:00</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">Våra Tjänster</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/#produkter" className="text-gray-100 hover:text-yellow-400 transition-colors hover:translate-x-1 inline-block">
                  → Fruktkorgarna
                </a>
              </li>
              <li>
                <a href="/#produkter" className="text-gray-100 hover:text-yellow-400 transition-colors hover:translate-x-1 inline-block">
                  → Kontorsleverans
                </a>
              </li>
              <li>
                <a href="/om-oss" className="text-gray-100 hover:text-yellow-400 transition-colors hover:translate-x-1 inline-block">
                  → Hållbarhet
                </a>
              </li>
              <li>
                <a href="/om-oss" className="text-gray-100 hover:text-yellow-400 transition-colors hover:translate-x-1 inline-block">
                  → Om Oss
                </a>
              </li>
              <li>
                <a href="/kundportal" className="text-gray-100 hover:text-yellow-400 transition-colors hover:translate-x-1 inline-block">
                  → Kundportal
                </a>
              </li>
            </ul>
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
              <div className="flex items-center space-x-3 text-gray-100">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Leaf className="h-4 w-4 text-yellow-400" />
                </div>
                <span>Ekologiska alternativ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-700 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-200">
            © {currentYear} FruktPortalen AB. Alla rättigheter förbehållna.
          </div>
          <div className="flex space-x-6 text-sm text-gray-200">
            <a href="/kontakt" className="hover:text-yellow-400 transition-colors">Kontakt</a>
            <a href="/om-oss" className="hover:text-yellow-400 transition-colors">Om Oss</a>
            <a href="/offertforfragan" className="hover:text-yellow-400 transition-colors">Offertförfrågan</a>
          </div>
        </div>
      </div>

      {/* Decorative background element */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50"></div>
    </footer>
  );
};

export default Footer;