import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FruktexpertenLogo from '@/components/FruktexpertenLogo';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Sortiment', href: '/sortiment', isExternal: false }, // Product Range
    { label: 'Om Oss', href: '/om-oss', isExternal: false }, // About Us
    { label: 'Kontakt', href: '/kontakt', isExternal: false }, // Contact
    { label: 'Offertförfrågan', href: '/offertforfragan', isExternal: false }, // Quote Request
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <FruktexpertenLogo />
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center mx-auto">
            {navigationItems.map((item, index) => (
              <React.Fragment key={item.label}>
                {item.isExternal ? (
                  <a
                    href={item.href}
                    className="text-gray-600 hover:text-primary transition-all duration-200 font-medium text-base tracking-wide relative group px-4 py-2"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"></span>
                  </a>
                ) : (
                  <Link
                    to={item.href}
                    className="text-gray-600 hover:text-primary transition-all duration-200 font-medium text-base tracking-wide relative group px-4 py-2"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"></span>
                  </Link>
                )}
                {index < navigationItems.length - 1 && (
                  <div className="w-px h-4 bg-gray-300 mx-2"></div>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Right Side - Contact & Actions */}
          <div className="hidden lg:flex items-center space-x-6">            
            {/* Mina Sidor Link */}
            <Link 
              to="/kundportal" 
              className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">Mina Sidor</span>
            </Link>
            
            {/* Order Button */}
            <Button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-medium shadow-sm">
              Beställ
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <nav className="py-4 space-y-2">
              {navigationItems.map((item) => (
                item.isExternal ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block px-4 py-3 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="block px-4 py-3 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}
              
              {/* Mobile Contact & Actions */}
              <div className="pt-4 px-4 space-y-3 border-t border-gray-200 mt-4">                
                <Link 
                  to="/kundportal" 
                  className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">Mina Sidor</span>
                </Link>
                
                <Button className="w-full bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-medium">
                  Beställ
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;