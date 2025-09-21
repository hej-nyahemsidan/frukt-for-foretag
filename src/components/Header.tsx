import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FruktexpertenLogo from '@/components/FruktexpertenLogo';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigationItems = [
    { label: 'Hem', href: '#home' }, // Home
    { 
      label: 'Sortiment', 
      href: '#products', 
      hasDropdown: true,
      dropdownItems: [
        { label: 'Fruktkorgar', href: '#fruit-baskets' }, // Fruit baskets
        { label: 'Säsongsfrukt', href: '#seasonal' }, // Seasonal fruit
        { label: 'Hälsosamma Snacks', href: '#snacks' }, // Healthy snacks
        { label: 'Premiumval', href: '#premium' }, // Premium selection
      ]
    },
    { label: 'Om Oss', href: '#about' }, // About Us
    { label: 'Kontakt', href: '#contact' }, // Contact
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <FruktexpertenLogo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.label} className="relative">
                {item.hasDropdown ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <button className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors font-medium">
                      <span>{item.label}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-card py-2 z-50">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <a
                            key={dropdownItem.label}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-sm text-card-foreground hover:bg-muted hover:text-primary transition-colors"
                          >
                            {dropdownItem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="text-foreground hover:text-primary transition-colors font-medium"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button className="btn-hero">
              Beställ Nu {/* Order Now */}
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
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
          <div className="lg:hidden border-t border-border">
            <nav className="py-4 space-y-2">
              {navigationItems.map((item) => (
                <div key={item.label}>
                  <a
                    href={item.href}
                    className="block px-4 py-3 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                  {item.hasDropdown && item.dropdownItems && (
                    <div className="ml-4 space-y-1">
                      {item.dropdownItems.map((dropdownItem) => (
                        <a
                          key={dropdownItem.label}
                          href={dropdownItem.href}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {dropdownItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile CTA */}
              <div className="pt-4 px-4">
                <Button className="w-full btn-hero">
                  Beställ Nu {/* Order Now */}
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