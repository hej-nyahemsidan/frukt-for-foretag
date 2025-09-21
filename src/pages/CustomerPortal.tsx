import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import FruktexpertenLogo from '@/components/FruktexpertenLogo';
import citrusBackground from '@/assets/citrus-background.jpg';

const CustomerPortal = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Background Image */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative"
        style={{
          backgroundImage: `url(${citrusBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Page Title */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white drop-shadow-lg text-center">
            Fruktexpertens Kundportal
          </h1>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8 relative">
        {/* Back Button */}
        <Link 
          to="/" 
          className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Tillbaka till startsidan</span>
        </Link>

        <div className="w-full max-w-md mx-auto">
          {/* Logo Section */}
          <div className="text-center mb-12">
            <FruktexpertenLogo className="justify-center" />
          </div>

          {/* Login Form */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Logga in
              </h2>
            </div>

            <form className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label 
                  htmlFor="email" 
                  className="text-muted-foreground font-medium"
                >
                  Epost
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="din@epost.se"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label 
                  htmlFor="password" 
                  className="text-muted-foreground font-medium"
                >
                  Lösenord
                </Label>
                <Input
                  id="password"
                  type="password"
                  className="border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Ditt lösenord"
                />
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Glömt ditt lösenord?
                </a>
              </div>

              {/* Login Button */}
              <Button 
                type="submit"
                className="w-full bg-accent-green hover:bg-accent-green/90 text-white py-3 rounded-lg font-semibold tracking-wide transition-colors"
              >
                LOGGA IN
              </Button>
            </form>
          </div>

          {/* Mobile Title (visible on small screens) */}
          <div className="lg:hidden text-center mt-12">
            <h1 className="text-2xl font-bold text-foreground">
              Fruktexpertens Kundportal
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPortal;