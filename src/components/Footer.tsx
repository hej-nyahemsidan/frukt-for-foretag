
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
  ShoppingCart
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
              Ert pålitliga fruktbud i Stockholm – vi levererar färska fruktkorgar till jobbet för kontor och företag. 
              Vi brinner för kvalitet, hållbarhet och er hälsa med frukt på jobbet.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <span className="mr-2">📍</span> Kontakt
            </h4>
            <div className="space-y-3 text-sm">
              <a href="tel:010-183 98 36" className="flex items-center space-x-3 text-gray-100 hover:text-yellow-400 transition-colors">
                <Phone className="h-5 w-5" />
                <span>010-183 98 36</span>
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
                <span>Fri leverans i hela Stockholm, Södertälje, Uppsala</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-100">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <ShieldCheck className="h-4 w-4 text-yellow-400" />
                </div>
                <span>100% kvalitetsgaranti</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-100">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <ShoppingCart className="h-4 w-4 text-yellow-400" />
                </div>
                <span>Webshop för skafferi & snacks</span>
              </div>
            </div>
          </div>
        </div>

        {/* Area Links for SEO */}
        <div className="border-t border-green-700 pt-6 mb-6">
          <h4 className="text-sm font-semibold text-gray-200 mb-3">Vi levererar fruktkorgar till</h4>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-300">
            {[
              { name: 'Stockholm', slug: 'stockholm' },
              { name: 'Östermalm', slug: 'ostermalm' },
              { name: 'Kungsholmen', slug: 'kungsholmen' },
              { name: 'Södermalm', slug: 'sodermalm' },
              { name: 'Gamla stan', slug: 'gamla-stan' },
              { name: 'Gärdet', slug: 'gardet' },
              { name: 'Solna', slug: 'solna' },
              { name: 'Sundbyberg', slug: 'sundbyberg' },
              { name: 'Bromma', slug: 'bromma' },
              { name: 'Nacka', slug: 'nacka' },
              { name: 'Täby', slug: 'taby' },
              { name: 'Huddinge', slug: 'huddinge' },
              { name: 'Järfälla', slug: 'jarfalla' },
              { name: 'Haninge', slug: 'haninge' },
              { name: 'Tyresö', slug: 'tyreso' },
              { name: 'Farsta', slug: 'farsta' },
              { name: 'Älvsjö', slug: 'alvsjo' },
              { name: 'Hägersten', slug: 'hagersten' },
              { name: 'Hammarby sjöstad', slug: 'hammarby-sjostad' },
              { name: 'Bandhagen', slug: 'bandhagen' },
              { name: 'Botkyrka', slug: 'botkyrka' },
            ].map((area, i, arr) => (
              <span key={area.slug}>
                <a href={`/fruktkorg/${area.slug}`} className="hover:text-yellow-400 transition-colors">
                  {area.name}
                </a>
                {i < arr.length - 1 && <span className="ml-3 text-green-600">·</span>}
              </span>
            ))}
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