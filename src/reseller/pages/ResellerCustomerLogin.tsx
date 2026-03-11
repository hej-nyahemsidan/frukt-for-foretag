import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useResellerCustomerAuth } from '../contexts/ResellerCustomerAuthContext';
import { useToast } from '@/hooks/use-toast';

const ResellerCustomerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, user, isResellerCustomer, loading: authLoading, reseller } = useResellerCustomerAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && user && isResellerCustomer) {
      navigate('/af/kund/dashboard');
    }
  }, [user, authLoading, isResellerCustomer, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await login(email, password);
      if (error) {
        let msg = 'Ett fel uppstod vid inloggning';
        if (error.message?.includes('Invalid login credentials')) {
          msg = 'Ogiltiga inloggningsuppgifter.';
        } else if (error.message?.includes('Du har inte tillgång')) {
          msg = error.message;
        }
        toast({ title: 'Inloggning misslyckades', description: msg, variant: 'destructive' });
      } else {
        toast({ title: 'Välkommen!', description: 'Du har loggats in.' });
        navigate('/af/kund/dashboard');
      }
    } catch {
      toast({ title: 'Fel', description: 'Något gick fel.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Tillbaka
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          {/* Reseller branding */}
          <div className="text-center space-y-3">
            {reseller?.logo_url ? (
              <img
                src={reseller.logo_url}
                alt={reseller.name}
                className="h-16 mx-auto object-contain"
              />
            ) : (
              <h1 className="text-2xl font-bold text-foreground">
                {reseller?.name || 'Beställningsportal'}
              </h1>
            )}
            <p className="text-muted-foreground text-sm">Logga in för att beställa</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-muted-foreground font-medium">E-postadress</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="din@email.se"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-muted-foreground font-medium">Lösenord</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ditt lösenord"
                  required
                  disabled={isLoading}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-muted-foreground" /> : <Eye className="h-5 w-5 text-muted-foreground" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Loggar in...
                </div>
              ) : 'Logga in'}
            </Button>
          </form>

          {/* Reseller contact */}
          {reseller?.contact_email && (
            <p className="text-center text-xs text-muted-foreground">
              Behöver du hjälp? Kontakta{' '}
              <a href={`mailto:${reseller.contact_email}`} className="underline hover:text-primary">
                {reseller.contact_email}
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResellerCustomerLogin;
