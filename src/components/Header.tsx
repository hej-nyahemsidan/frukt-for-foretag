import React, { useState } from 'react';
import { Menu, X, User, ChevronDown, LogOut, BookOpen, Shield } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useAdminAuth } from '@/admin/contexts/AdminAuthContext';
import VitaminKorgenLogo from '@/components/VitaminKorgenLogo';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isAdmin } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // If already on homepage, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If on different page, navigate to homepage
      navigate('/');
    }
  };

  const publicNavigationItems = [
    { label: 'Hem', href: '/', isExternal: false },           // Home
    { label: 'Produkter', href: '/produkter', isExternal: false }, // Products
    { label: 'Blommor', href: '/blommor', isExternal: false }, // Flowers
    { label: 'Varuautomat', href: '/varuautomat', isExternal: false }, // Vending Machine
    { label: 'Om Oss', href: '/om-oss', isExternal: false },   // About Us
    { label: 'Kontakt', href: '/kontakt', isExternal: false }, // Contact
    { label: 'Offertförfrågan', href: '/offertforfragan', isExternal: false },     // Quote Request
  ];

  const customerNavigationItems = [
    { label: 'Hem', href: '/', isExternal: false },           // Home
    { label: 'Produkter', href: '/produkter', isExternal: false }, // Products
    { label: 'Blommor', href: '/blommor', isExternal: false }, // Flowers
    { label: 'Varuautomat', href: '/varuautomat', isExternal: false }, // Vending Machine
    { label: 'Om Oss', href: '/om-oss', isExternal: false },   // About Us
    { label: 'Kontakt', href: '/kontakt', isExternal: false }, // Contact
    { label: 'Mina Sidor', href: '/dashboard', isExternal: false }, // Customer Dashboard - moved to end
  ];

  const blogPosts = [
    { 
      title: 'Frukt på jobbet',
      slug: 'frukt-pa-jobbet',
      excerpt: 'Varför frukt på kontoret är en smart investering för företag.'
    },
    {
      title: 'Frukt som mellanmål',
      slug: 'frukt-som-mellanmal',
      excerpt: 'Hälsofördelarna med att välja frukt som mellanmål.'
    }
  ];

  const navigationItems = user ? customerNavigationItems : publicNavigationItems;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-32 md:h-40 lg:h-48">
          {/* Company Logo */}
          <div className="flex-shrink-0 z-10">
            <div onClick={handleLogoClick} className="cursor-pointer">
              <VitaminKorgenLogo 
                size="mega" 
                variant="horizontal"
                animated={true}
              />
            </div>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center mx-auto">
            {navigationItems.map((item, index) => {
              const isActive = location.pathname === item.href;
              const isMinaSidor = item.label === 'Mina Sidor';
              const shouldHighlight = isMinaSidor && user;
              
              return (
                <React.Fragment key={item.label}>
                  {item.isExternal ? (
                    <a
                      href={item.href}
                      className={`transition-all duration-200 font-medium text-base tracking-wide relative group px-4 py-2 ${
                        shouldHighlight 
                          ? 'text-secondary bg-secondary/10 rounded-lg' 
                          : 'text-charcoal hover:text-secondary'
                      }`}
                    >
                      {item.label}
                      <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"></span>
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className={`transition-all duration-200 font-medium text-base tracking-wide relative group px-4 py-2 ${
                        shouldHighlight 
                          ? 'text-secondary bg-secondary/10 rounded-lg' 
                          : 'text-charcoal hover:text-secondary'
                      }`}
                    >
                      {item.label}
                      <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-secondary transform transition-transform duration-200 origin-center ${
                        shouldHighlight ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}></span>
                    </Link>
                  )}
                  {index < navigationItems.length - 1 && (
                    <div className="w-px h-4 bg-gray-300 mx-2"></div>
                  )}
                </React.Fragment>
              );
            })}
            
            {/* Blog Dropdown */}
            <div className="w-px h-4 bg-gray-300 mx-2"></div>
            <DropdownMenu>
              <DropdownMenuTrigger className="transition-all duration-200 font-medium text-base tracking-wide relative group px-4 py-2 text-charcoal hover:text-secondary flex items-center space-x-1">
                <BookOpen className="w-4 h-4" />
                <span>Blog</span>
                <ChevronDown className="w-3 h-3" />
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"></span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-80 max-h-96 overflow-y-auto bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg z-50">
                {blogPosts.map((post, index) => (
                  <DropdownMenuItem key={post.slug} asChild className="p-0">
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="block p-4 hover:bg-lightgreen/50 transition-colors"
                    >
                      <h3 className="font-medium text-charcoal text-sm leading-tight mb-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right Side - Contact & Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Admin Dashboard Link - Sliding Animation */}
            {isAdmin && (
              <div className="animate-slide-in-right">
                <Link 
                  to="/admin/dashboard"
                  className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors px-3 py-2 rounded-lg bg-orange-50 hover:bg-orange-100"
                >
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-medium">Admin</span>
                </Link>
              </div>
            )}
            
            {/* User Menu or Login Link */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2 text-charcoal hover:text-secondary transition-colors">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">{user.email}</span>
                  <ChevronDown className="w-3 h-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white z-50">
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin/dashboard" className="flex items-center w-full">
                        <Shield className="w-4 h-4 mr-2" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:text-red-700">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logga ut
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link 
                to="/kundportal" 
                className="flex items-center space-x-2 text-charcoal hover:text-secondary transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Mina Sidor</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-charcoal hover:text-secondary transition-colors"
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

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-25 z-30"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-32 md:top-40 lg:top-48 bg-white border-t border-b border-gray-200 shadow-lg z-40 max-h-[calc(100vh-8rem)] md:max-h-[calc(100vh-10rem)] lg:max-h-[calc(100vh-12rem)] overflow-y-auto"
            style={{ 
              position: 'fixed',
              width: '100vw',
              left: '0',
              backgroundColor: 'white'
            }}
          >
            <nav className="py-4 space-y-2 px-6">
              {navigationItems.map((item) => {
                const isMinaSidor = item.label === 'Mina Sidor';
                const shouldHighlight = isMinaSidor && user;
                
                return item.isExternal ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`block px-4 py-3 rounded-lg transition-colors font-medium ${
                      shouldHighlight 
                        ? 'text-secondary bg-secondary/10' 
                        : 'text-charcoal hover:text-secondary hover:bg-lightgreen'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`block px-4 py-3 rounded-lg transition-colors font-medium ${
                      shouldHighlight 
                        ? 'text-secondary bg-secondary/10' 
                        : 'text-charcoal hover:text-secondary hover:bg-lightgreen'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              
              {/* Mobile Blog Section */}
              <div className="px-4 py-2">
                <div className="flex items-center space-x-2 text-charcoal font-medium mb-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Blog</span>
                </div>
                <div className="space-y-2 pl-6">
                  {blogPosts.map((post) => (
                    <Link
                      key={post.slug}
                      to={`/blog/${post.slug}`}
                      className="block text-sm text-gray-600 hover:text-secondary transition-colors py-1"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {post.title}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Mobile Contact & Actions */}
              <div className="pt-4 px-4 space-y-3 border-t border-gray-200 mt-4">
                {/* Admin Dashboard Link for Mobile */}
                {isAdmin && (
                  <div className="animate-fade-in">
                    <Link 
                      to="/admin/dashboard"
                      className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors px-2 py-2 rounded-lg bg-orange-50 hover:bg-orange-100"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Shield className="w-4 h-4" />
                      <span className="text-sm font-medium">Admin Dashboard</span>
                    </Link>
                  </div>
                )}
                
                {/* User Menu or Login Link */}
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-charcoal px-2">
                      <User className="w-4 h-4" />
                      <span className="text-sm font-medium truncate">{user.email}</span>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors px-2 py-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm font-medium">Logga ut</span>
                    </button>
                  </div>
                ) : (
                  <Link 
                    to="/kundportal" 
                    className="flex items-center space-x-2 text-charcoal hover:text-secondary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">Mina Sidor</span>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;