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
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              {/* Enhanced Custom SVG Logo */}
              <svg className="h-14 w-14" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor:'#facc15'}} />
                    <stop offset="50%" style={{stopColor:'#f59e0b'}} />
                    <stop offset="100%" style={{stopColor:'#fb923c'}} />
                  </linearGradient>
                  <linearGradient id="basketGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor:'#92400e'}} />
                    <stop offset="100%" style={{stopColor:'#451a03'}} />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <g transform="scale(0.14) translate(30, 30)">
                  {/* Basket base with enhanced shadow */}
                  <ellipse cx="400" cy="560" rx="180" ry="20" fill="rgba(0,0,0,0.3)"/>
                  
                  {/* Main basket */}
                  <path d="M 220 540 L 240 620 L 560 620 L 580 540 Z" fill="url(#basketGradient)" stroke="#92400e" strokeWidth="4"/>
                  
                  {/* Basket weave pattern */}
                  <rect x="260" y="550" width="80" height="6" rx="3" fill="#a16207"/>
                  <rect x="360" y="550" width="80" height="6" rx="3" fill="#a16207"/>
                  <rect x="460" y="550" width="80" height="6" rx="3" fill="#a16207"/>
                  <rect x="280" y="570" width="80" height="6" rx="3" fill="#a16207"/>
                  <rect x="380" y="570" width="80" height="6" rx="3" fill="#a16207"/>
                  <rect x="300" y="590" width="80" height="6" rx="3" fill="#a16207"/>
                  <rect x="400" y="590" width="80" height="6" rx="3" fill="#a16207"/>
                  
                  {/* Enhanced fruits with glow effect */}
                  {/* Apple */}
                  <ellipse cx="320" cy="450" rx="65" ry="75" fill="#dc2626" filter="url(#glow)"/>
                  <ellipse cx="315" cy="440" rx="15" ry="8" fill="#b91c1c"/>
                  <path d="M 320 390 Q 310 380, 325 375 Q 340 380, 330 390" fill="#16a34a" stroke="#15803d" strokeWidth="2"/>
                  
                  {/* Orange */}
                  <ellipse cx="450" cy="450" rx="60" ry="70" fill="url(#logoGradient)" filter="url(#glow)"/>
                  <circle cx="450" cy="430" r="3" fill="#ea580c"/>
                  <circle cx="440" cy="450" r="2" fill="#ea580c"/>
                  <circle cx="460" cy="470" r="2" fill="#ea580c"/>
                  <path d="M 450 395 Q 440 385, 455 380 Q 470 385, 460 395" fill="#16a34a" stroke="#15803d" strokeWidth="2"/>
                  
                  {/* Banana */}
                  <path d="M 540 420 Q 525 380, 550 350 Q 580 360, 575 400 Q 575 480, 555 510 Q 535 520, 530 500 Q 530 460, 540 420" 
                        fill="#eab308" filter="url(#glow)" stroke="#ca8a04" strokeWidth="2"/>
                  <ellipse cx="550" cy="355" rx="15" ry="8" fill="#16a34a"/>
                  <path d="M 545 420 Q 540 400, 550 405 Q 560 410, 555 430" fill="none" stroke="#ca8a04" strokeWidth="2"/>
                  <path d="M 545 450 Q 540 440, 550 445 Q 560 450, 555 460" fill="none" stroke="#ca8a04" strokeWidth="2"/>
                  
                  {/* Pear */}
                  <ellipse cx="380" cy="480" rx="45" ry="55" fill="#84cc16" filter="url(#glow)"/>
                  <ellipse cx="380" cy="430" rx="35" ry="40" fill="#84cc16"/>
                  <path d="M 380 395 Q 370 385, 385 380 Q 400 385, 390 395" fill="#16a34a" stroke="#15803d" strokeWidth="2"/>
                  
                  {/* Decorative rim */}
                  <ellipse cx="400" cy="540" rx="185" ry="8" fill="none" stroke="url(#logoGradient)" strokeWidth="6"/>
                </g>
              </svg>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Fruktexperten
              </h3>
            </div>
            <p className="text-gray-100 text-sm leading-relaxed">
              Stockholms ledande leverantör av färsk frukt till kontor och företag. 
              Vi brinner för kvalitet, hållbarhet och er hälsa.
            </p>
            <div className="flex space-x-3 pt-4">
              <a href="#" className="p-2 bg-green-700 hover:bg-orange-500 rounded-full transition-all duration-300 hover:scale-110">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-green-700 hover:bg-orange-500 rounded-full transition-all duration-300 hover:scale-110">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-green-700 hover:bg-orange-500 rounded-full transition-all duration-300 hover:scale-110">
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
              <a href="mailto:info@fruktexperten.se" className="flex items-center space-x-3 text-gray-100 hover:text-yellow-400 transition-colors">
                <Mail className="h-5 w-5" />
                <span>info@fruktexperten.se</span>
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
                <a href="#" className="text-gray-100 hover:text-yellow-400 transition-colors hover:translate-x-1 inline-block">
                  → Fruktkorgarna
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-100 hover:text-yellow-400 transition-colors hover:translate-x-1 inline-block">
                  → Kontorsleverans
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-100 hover:text-yellow-400 transition-colors hover:translate-x-1 inline-block">
                  → Hållbarhet
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-100 hover:text-yellow-400 transition-colors hover:translate-x-1 inline-block">
                  → Om Oss
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-100 hover:text-yellow-400 transition-colors hover:translate-x-1 inline-block">
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
            © {currentYear} Fruktexperten AB. Alla rättigheter förbehållna.
          </div>
          <div className="flex space-x-6 text-sm text-gray-200">
            <a href="#" className="hover:text-yellow-400 transition-colors">Integritetspolicy</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Villkor</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>

      {/* Decorative background element */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50"></div>
    </footer>
  );
};

export default Footer;