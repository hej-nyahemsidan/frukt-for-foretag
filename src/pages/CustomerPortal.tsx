import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import VitaminKorgenLogo from '@/components/VitaminKorgenLogo';
import citrusBackground from '@/assets/citrus-background.jpg';

const CustomerPortal = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await login(email, password);
      
      if (error) {
        let errorMessage = 'Ett fel uppstod vid inloggning';
        
        if (error.message?.includes('Invalid login credentials')) {
          errorMessage = 'Ogiltiga inloggningsuppgifter. Kontrollera din e-post och lösenord.';
        } else if (error.message?.includes('Email not confirmed')) {
          errorMessage = 'E-postadressen är inte bekräftad. Kontrollera din e-post.';
        } else if (error.message?.includes('Too many requests')) {
          errorMessage = 'För många inloggningsförsök. Försök igen senare.';
        }
        
        toast({
          title: 'Inloggning misslyckades',
          description: errorMessage,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Välkommen!',
          description: 'Du har loggats in framgångsrikt.',
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: 'Ett fel uppstod',
        description: 'Något gick fel. Försök igen senare.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

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
            VitaminKorgens Portal
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
          {/* Brand Logo */}
          <div className="text-center mb-12">
            <VitaminKorgenLogo 
              size="xl" 
              variant="full"
              animated={true} 
              className="mx-auto"
            />
          </div>

          {/* Login Form */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Logga in på kundportalen
              </h2>
              <p className="text-muted-foreground">Hantera dina fruktleveranser</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label 
                  htmlFor="email" 
                  className="text-muted-foreground font-medium"
                >
                  E-postadress
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="din@email.se"
                  required
                  disabled={isLoading}
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
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-border rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Ditt lösenord"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
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
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold tracking-wide transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Loggar in...
                  </div>
                ) : (
                  'LOGGA IN'
                )}
              </Button>


              {/* Admin Link */}
              <div className="text-center mt-8">
                <Link 
                  to="/admin/login" 
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Admin
                </Link>
              </div>
            </form>
          </div>

          {/* Mobile Title (visible on small screens) */}
          <div className="lg:hidden text-center mt-12">
            <h1 className="text-2xl font-bold text-foreground">
              VitaminKorgens Portal
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPortal;