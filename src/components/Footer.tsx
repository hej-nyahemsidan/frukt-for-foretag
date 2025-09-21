import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    company: {
      title: 'Företaget',
      links: [
        { label: 'Om Oss', href: '#about' },
        { label: 'Vår Historia', href: '#about' },
        { label: 'Karriär', href: '#careers' },
        { label: 'Hållbarhet', href: '#sustainability' }
      ]
    },
    services: {
      title: 'Tjänster',
      links: [
        { label: 'Fruktkorgar', href: '#products' },
        { label: 'Säsongsfrukt', href: '#seasonal' },
        { label: 'Hälsopaket', href: '#wellness' },
        { label: 'Anpassade Lösningar', href: '#custom' }
      ]
    },
    support: {
      title: 'Support',
      links: [
        { label: 'Kontakt', href: '#contact' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Leveransinfo', href: '#delivery' },
        { label: 'Kundtjänst', href: '#support' }
      ]
    },
    legal: {
      title: 'Juridiskt',
      links: [
        { label: 'Integritetspolicy', href: '#privacy' },
        { label: 'Användarvillkor', href: '#terms' },
        { label: 'Cookies', href: '#cookies' },
        { label: 'GDPR', href: '#gdpr' }
      ]
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">FruktkorgsPro</h3>
              <p className="text-primary-foreground/80 text-sm">
                Sedan 1986 - Sveriges ledande leverantör av frisk frukt till företag
              </p>
              {/* Since 1986 - Sweden's leading supplier of fresh fruit to companies */}
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary-foreground/80" />
                <span className="text-sm">08-123 45 67</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary-foreground/80" />
                <span className="text-sm">info@fruktkorgspro.se</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary-foreground/80" />
                <span className="text-sm">Fruktgatan 12, 118 25 Stockholm</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Följ oss</h4>
              {/* Follow us */}
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="w-8 h-8 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key} className="space-y-4">
              <h4 className="font-semibold text-sm text-primary-foreground">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-primary-foreground/5 rounded-2xl p-6 mb-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h3 className="text-lg font-semibold">Håll dig uppdaterad</h3>
            {/* Stay updated */}
            <p className="text-sm text-primary-foreground/80">
              Prenumerera på vårt nyhetsbrev för tips om hälsosam kost, säsongsfrukter och specialerbjudanden.
            </p>
            {/* Subscribe to our newsletter for tips on healthy eating, seasonal fruits and special offers. */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Din e-postadress"
                className="flex-1 px-4 py-2 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
              />
              <button className="px-6 py-2 bg-primary-foreground text-primary rounded-lg font-medium hover:bg-primary-foreground/90 transition-colors">
                Prenumerera
                {/* Subscribe */}
              </button>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="border-t border-primary-foreground/20 pt-8 mb-8">
          <div className="text-center space-y-4">
            <h4 className="font-semibold text-sm">Certifieringar & Partnerskap</h4>
            {/* Certifications & Partnerships */}
            <div className="flex justify-center items-center space-x-8 flex-wrap gap-4">
              <div className="text-center">
                <span className="text-2xl">🌱</span>
                <p className="text-xs text-primary-foreground/80 mt-1">KRAV</p>
              </div>
              <div className="text-center">
                <span className="text-2xl">🏆</span>
                <p className="text-xs text-primary-foreground/80 mt-1">ISO 22000</p>
              </div>
              <div className="text-center">
                <span className="text-2xl">🤝</span>
                <p className="text-xs text-primary-foreground/80 mt-1">Fairtrade</p>
              </div>
              <div className="text-center">
                <span className="text-2xl">🇸🇪</span>
                <p className="text-xs text-primary-foreground/80 mt-1">Svenskt</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-primary-dark border-t border-primary-foreground/10">
        <div className="container mx-auto px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-sm text-primary-foreground/80">
              © {currentYear} FruktkorgsPro AB. Alla rättigheter förbehållna.
              {/* All rights reserved. */}
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#privacy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Integritetspolicy
                {/* Privacy Policy */}
              </a>
              <a href="#terms" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Användarvillkor
                {/* Terms of Service */}
              </a>
              <a href="#cookies" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;