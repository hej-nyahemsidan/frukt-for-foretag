import { useState, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useToast } from '@/hooks/use-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@vitaminkorgen.se');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, user, isAdmin, loading: authLoading } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already logged in as admin - wait for auth to initialize first
  useEffect(() => {
    if (!authLoading && user && isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [user, isAdmin, authLoading, navigate]);

  // Show loading spinner while auth is initializing
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await login(email, password);
      
      if (error) {
        let errorMessage = 'Ett fel uppstod vid inloggning';
        
        if (error.message?.includes('Unauthorized access')) {
          errorMessage = 'Endast administratörer har tillgång till denna sida.';
        } else if (error.message?.includes('Invalid login credentials')) {
          errorMessage = 'Ogiltiga inloggningsuppgifter.';
        }
        
        toast({
          title: 'Inloggning misslyckades',
          description: errorMessage,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Välkommen, Admin!',
          description: 'Du har loggats in som administratör.',
        });
        navigate('/admin/dashboard');
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-8">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link 
          to="/kundportal" 
          className="inline-flex items-center gap-1 sm:gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 sm:mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs sm:text-sm">Tillbaka till kundportalen</span>
        </Link>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-8">
          {/* Admin Login Form */}
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                Admin Inloggning
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm">Administratörsportalen</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-muted-foreground font-medium">
                  E-postadress
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-border rounded-lg px-3 sm:px-4 py-2 sm:py-2 text-sm sm:text-base"
                  required
                  disabled={true} // Admin email is fixed
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-muted-foreground font-medium">
                  Lösenord
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-border rounded-lg px-3 sm:px-4 py-2 sm:py-2 pr-10 sm:pr-12 text-sm sm:text-base"
                    placeholder="Admin lösenord"
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
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <Button 
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 sm:py-2 rounded-lg font-semibold text-sm sm:text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Loggar in...
                  </div>
                ) : (
                  'LOGGA IN SOM ADMIN'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;