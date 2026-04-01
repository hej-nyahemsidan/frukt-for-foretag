import React, { useState, useEffect, useCallback } from 'react';
import { X, Apple } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { trackExitIntentLead } from '@/lib/gtm';

const STORAGE_KEY = 'exitIntentDismissed';
const DISMISS_DAYS = 14;

const ExitIntentPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const isDismissed = useCallback(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return false;
    return Date.now() < Number(stored);
  }, []);

  const dismiss = useCallback(() => {
    setAnimateIn(false);
    setTimeout(() => setIsVisible(false), 300);
    const hideUntil = Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, hideUntil.toString());
  }, []);

  useEffect(() => {
    if (isDismissed()) return;

    let triggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !triggered) {
        triggered = true;
        setIsVisible(true);
        setTimeout(() => setAnimateIn(true), 10);
      }
    };

    // Only add after a short delay so it doesn't fire immediately
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDismissed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSending(true);
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          formType: 'Kontaktformulär',
          name: name || 'Exit-intent lead',
          email,
          message: 'Besökaren vill ha mer information om fruktkorgar (exit-intent popup).',
        },
      });

      if (error) throw error;

      setSent(true);
      toast({
        title: 'Tack!',
        description: 'Vi hör av oss snart med mer information.',
      });

      setTimeout(dismiss, 2500);
    } catch {
      toast({
        title: 'Något gick fel',
        description: 'Försök igen eller ring oss på 010-183 98 36.',
        variant: 'destructive',
      });
    } finally {
      setSending(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={(e) => e.target === e.currentTarget && dismiss()}
    >
      <div
        className={`bg-background rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transition-all duration-300 ${
          animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-secondary to-secondary/80 p-6 text-center">
          <button
            onClick={dismiss}
            className="absolute top-3 right-3 p-1.5 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-full mb-3">
            <Apple className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">
            Vänta – missa inte vår gratis provkorg!
          </h2>
        </div>

        {/* Body */}
        <div className="p-6">
          {sent ? (
            <div className="text-center py-4">
              <p className="text-lg font-semibold text-foreground">🎉 Tack för ditt intresse!</p>
              <p className="text-muted-foreground mt-2">Vi kontaktar dig inom kort.</p>
            </div>
          ) : (
            <>
              <p className="text-muted-foreground text-center mb-5">
                Lämna din e-post så kontaktar vi dig med mer information om våra fruktkorgar – helt utan förpliktelser.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  placeholder="Ditt namn"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="email"
                  required
                  placeholder="Din e-postadress *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
                >
                  {sending ? 'Skickar...' : 'Kontakta mig'}
                </Button>
              </form>
              <p className="text-xs text-muted-foreground text-center mt-3">
                Ingen spam – vi hör bara av oss med relevant information.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
