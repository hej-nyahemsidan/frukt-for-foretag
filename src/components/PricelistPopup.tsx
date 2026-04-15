import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { trackContactSubmitted } from '@/lib/gtm';

interface PricelistPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PricelistPopup = ({ isOpen, onClose }: PricelistPopupProps) => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast({ title: 'Fyll i alla fält', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('pricelist_leads').insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });

      if (error) throw error;

      await supabase.functions.invoke('send-contact-email', {
        body: {
          formType: 'Lead – Hämta prislista',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Ny prislisteförfrågan\nNamn: ${formData.name}\nE-post: ${formData.email}\nTelefon: ${formData.phone}`,
        },
      });

      trackContactSubmitted();
      setSubmitted(true);
    } catch (err) {
      console.error('Pricelist lead error:', err);
      toast({ title: 'Något gick fel, försök igen.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after close animation
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '' });
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {submitted ? (
          <div className="text-center space-y-4 py-6">
            <div className="text-5xl">📋</div>
            <DialogHeader>
              <DialogTitle className="text-xl">Tack!</DialogTitle>
              <DialogDescription className="text-base">
                Vi skickar prislistan till din e-post och ringer upp dig inom kort.
              </DialogDescription>
            </DialogHeader>
            <Button onClick={handleClose} variant="outline" className="mt-4">
              Stäng
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Hämta vår prislista</DialogTitle>
              <DialogDescription>
                Fyll i dina uppgifter så skickar vi prislistan direkt till din e-post.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Namn</label>
                <Input
                  placeholder="Ditt namn"
                  value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  required
                  maxLength={100}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">E-post</label>
                <Input
                  type="email"
                  placeholder="namn@foretag.se"
                  value={formData.email}
                  onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  required
                  maxLength={255}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Telefonnummer</label>
                <Input
                  type="tel"
                  placeholder="070-123 45 67"
                  value={formData.phone}
                  onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                  required
                  maxLength={20}
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-dark text-primary-foreground rounded-full font-bold shadow-[0_8px_30px_-4px_hsl(152_50%_30%/0.5)]"
              >
                {isSubmitting ? 'Skickar...' : 'Skicka prislistan'}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Vi delar aldrig din information. Helt kostnadsfritt.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PricelistPopup;
