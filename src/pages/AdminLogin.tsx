import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminLogin = () => {
  const { login, isAdmin, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@fruktexperten.se');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in as admin
  React.useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [user, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await login(email, password);

    if (error) {
      setError('Felaktiga inloggningsuppgifter');
    } else {
      navigate('/admin/dashboard');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen admin-theme flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to main site */}
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-[hsl(0_0%_65%)] hover:text-[hsl(0_0%_95%)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tillbaka till hemsidan
          </Link>
        </div>

        <Card className="admin-card shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold text-[hsl(0_0%_95%)]">
              Admin Inloggning
            </CardTitle>
            <p className="text-[hsl(0_0%_65%)]">
              Logga in för att hantera kundkonton
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[hsl(0_0%_85%)]">E-postadress</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full admin-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[hsl(0_0%_85%)]">Lösenord</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full admin-input"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full admin-button"
              >
                {loading ? 'Loggar in...' : 'Logga in'}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-[hsl(220_13%_14%)] rounded-lg border border-[hsl(220_13%_18%)]">
              <h3 className="font-semibold text-sm mb-2 text-[hsl(0_0%_85%)]">Standard admin-konto:</h3>
              <p className="text-sm text-[hsl(0_0%_65%)]">
                E-post: admin@fruktexperten.se<br />
                Lösenord: AdminFrukt2024!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;