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
    <footer className="bg-background border-t border-border py-6">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Fruktexperten AB. Alla rättigheter förbehållna.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;