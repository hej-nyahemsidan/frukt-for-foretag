import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import VitaminKorgenLogo from '@/components/VitaminKorgenLogo';
import SEOHead from '@/components/SEOHead';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        const url = new URL(window.location.href);
        const hash = new URLSearchParams(url.hash.replace(/^#/, ''));
        const code = url.searchParams.get('code');
        const inviteToken = url.searchParams.get('invite_token');
        let tokenHash = url.searchParams.get('token_hash') || hash.get('token_hash');
        const accessToken = hash.get('access_token');
        const refreshToken = hash.get('refresh_token');

        if (inviteToken) {
          // Long-lived invitation token: exchange it for a fresh recovery link.
          const { data, error } = await supabase.functions.invoke('consume-invite-token', {
            body: { invite_token: inviteToken },
          });
          if (error || !data?.token_hash) {
            throw new Error(data?.error || error?.message || 'Ogiltig eller utgången inbjudningskod');
          }
          tokenHash = data.token_hash;
        }

        if (accessToken && refreshToken) {
          await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
        } else if (tokenHash) {
          await supabase.auth.verifyOtp({ type: 'recovery', token_hash: tokenHash });
        } else if (code) {
          await supabase.auth.exchangeCodeForSession(code);
        }

        const { data } = await supabase.auth.getSession();
        if (!cancelled) {
          setHasSession(!!data.session);
          // Clean the URL so tokens are not left in the address bar
          window.history.replaceState({}, '', '/reset-password');
        }
      } catch (e) {
        if (!cancelled) {
          setHasSession(false);
          toast({
            title: 'Inbjudan kunde inte aktiveras',
            description: e instanceof Error ? e.message : 'Länken är ogiltig eller har gått ut.',
            variant: 'destructive',
          });
        }
      } finally {
        if (!cancelled) setChecking(false);
      }
    };

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast({ title: 'För kort lösenord', description: 'Lösenordet måste vara minst 8 tecken.', variant: 'destructive' });
      return;
    }
    if (password !== confirm) {
      toast({ title: 'Lösenorden matchar inte', description: 'Skriv samma lösenord i båda fälten.', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setIsLoading(false);

    if (error) {
      toast({
        title: 'Kunde inte spara lösenordet',
        description: error.message || 'Försök igen eller begär en ny länk.',
        variant: 'destructive',
      });
      return;
    }

    setDone(true);
    toast({ title: 'Lösenordet är uppdaterat', description: 'Du är nu inloggad.' });
    setTimeout(() => navigate('/dashboard'), 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <SEOHead title="Aktivera ditt konto | Vitaminkorgen" description="Aktivera ditt konto i Vitaminkorgens kundportal." noindex={true} />

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <VitaminKorgenLogo size="xl" variant="full" className="mx-auto h-16 w-auto" />
        </div>

        <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
          {checking ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : done ? (
            <div className="text-center space-y-3 py-4">
              <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
              <h1 className="text-xl font-bold">Klart!</h1>
              <p className="text-sm text-muted-foreground">Ditt lösenord är sparat. Vi loggar in dig...</p>
            </div>
          ) : !hasSession ? (
            <div className="text-center space-y-4">
              <h1 className="text-xl font-bold">Länken har gått ut</h1>
              <p className="text-sm text-muted-foreground">
                Inbjudan är personlig och giltig i 7 dagar. Begär en ny via "Glömt ditt lösenord" på inloggningssidan.
              </p>
              <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white">
                <Link to="/kundportal">Till inloggningen</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="text-center space-y-1">
                <h1 className="text-2xl font-bold">Aktivera ditt konto</h1>
                <p className="text-sm text-muted-foreground">Minst 8 tecken. Sedan är du inloggad direkt.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">Nytt lösenord</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ditt nya lösenord"
                    autoComplete="new-password"
                    required
                    disabled={isLoading}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    aria-label={showPassword ? 'Dölj lösenord' : 'Visa lösenord'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-muted-foreground" /> : <Eye className="h-5 w-5 text-muted-foreground" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Upprepa lösenord</Label>
                <Input
                  id="confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Upprepa lösenordet"
                  autoComplete="new-password"
                  required
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                disabled={isLoading}
              >
                {isLoading ? 'Sparar...' : 'Aktivera konto'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
