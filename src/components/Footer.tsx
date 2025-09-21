import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    company: {
      title: 'Företaget',
      links: [
        { label: 'Om Oss', href: '/om-oss' },
        { label: 'Vår Historia', href: '/om-oss' },
        { label: 'Karriär', href: '#karriar' },
        { label: 'Hållbarhet', href: '#hallbarhet' }
      ]
    },
    services: {
      title: 'Tjänster',
      links: [
        { label: 'Fruktkorgar', href: '#fruktkorgar' },
        { label: 'Säsongsfrukt', href: '#sasongsfrukt' },
        { label: 'Hälsopaket', href: '#halsopaket' },
        { label: 'Anpassade Lösningar', href: '#anpassade-losningar' }
      ]
    },
    support: {
      title: 'Support',
      links: [
        { label: 'Kontakt', href: '/kontakt' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Kundtjänst', href: '#kundtjanst' },
        { label: 'Leveransinfo', href: '#leveransinfo' }
      ]
    },
    legal: {
      title: 'Juridiskt',
      links: [
        { label: 'Integritetspolicy', href: '#integritetspolicy' },
        { label: 'Användarvillkor', href: '#anvandarvillkor' },
        { label: 'Cookies', href: '#cookies' },
        { label: 'GDPR', href: '#gdpr' }
      ]
    }
  };

  return (
    <footer className="bg-green-600 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info - Left Column */}
          <div className="lg:col-span-1 space-y-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">Fruktexperten</h3>
              <p className="text-white/90 text-sm mb-4">
                Professionella fruktleveranser sedan 2024
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-white/80" />
                <span className="text-sm">020 - 88 44 00</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-white/80" />
                <span className="text-sm">info@fruktexperten.se</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-white/80" />
                <span className="text-sm">Stockholm, Sverige</span>
              </div>
            </div>
          </div>

          {/* Footer Links - 4 Columns */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key} className="space-y-3">
              <h4 className="font-semibold text-white">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-white/80 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-green-700 border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Media & Copyright */}
            <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-6">
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
              
              <p className="text-sm text-white/80">
                © {currentYear} Fruktexperten AB. Alla rättigheter förbehållna.
              </p>
            </div>

            {/* Certifications (Optional) */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <span className="text-lg">🌱</span>
                <span className="text-xs text-white/70">KRAV</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-lg">🏆</span>
                <span className="text-xs text-white/70">ISO</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-lg">🤝</span>
                <span className="text-xs text-white/70">Fairtrade</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;