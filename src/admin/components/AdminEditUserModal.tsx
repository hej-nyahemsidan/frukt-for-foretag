import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Edit, Mail, User, Lock, AlertTriangle, Building2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  updated_at: string;
  company_name?: string;
}

interface AdminEditUserModalProps {
  user: Profile | null;
  onClose: () => void;
  onUserUpdated: () => void;
}

const AdminEditUserModal: React.FC<AdminEditUserModalProps> = ({
  user,
  onClose,
  onUserUpdated,
}) => {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    companyName: '',
    resetPassword: false,
    newPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const isAdmin = user?.email === 'admin@vitaminkorgen.se';

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        fullName: user.full_name || '',
        companyName: user.company_name || '',
        resetPassword: false,
        newPassword: ''
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !formData.email) {
      return;
    }

    if (formData.resetPassword && formData.newPassword.length < 8) {
      toast({
        title: 'Svagt lösenord',
        description: 'Lösenordet måste vara minst 8 tecken långt.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Update the profile record
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          email: formData.email,
          full_name: formData.fullName || null
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Update company name in customers table
      if (formData.companyName !== user.company_name) {
        const { error: customerError } = await supabase
          .from('customers')
          .update({
            company_name: formData.companyName || 'Företag AB'
          })
          .eq('user_id', user.id);

        if (customerError) throw customerError;
      }

      // Reset password if requested
      if (formData.resetPassword && formData.newPassword) {
        const { error: passwordError } = await supabase.functions.invoke('update-user-password', {
          body: { 
            userId: user.id, 
            newPassword: formData.newPassword 
          }
        });

        if (passwordError) throw passwordError;
      }

      toast({
        title: 'Användare uppdaterad',
        description: `Ändringar för ${formData.email} har sparats${formData.resetPassword ? ' och lösenord har återställts' : ''}.`,
      });

      onUserUpdated();
      onClose();
      
    } catch (error: any) {
      toast({
        title: 'Fel vid uppdatering',
        description: error.message || 'Ett oväntat fel uppstod.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setFormData({
        email: '',
        fullName: '',
        companyName: '',
        resetPassword: false,
        newPassword: ''
      });
      onClose();
    }
  };

  if (!user) return null;

  return (
    <Dialog open={!!user} onOpenChange={handleClose}>
      <DialogContent className="admin-edit-user-modal sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="admin-modal-title flex items-center gap-2">
            <Edit className="w-5 h-5" />
            Redigera användare
          </DialogTitle>
          <DialogDescription className="admin-modal-description">
            Uppdatera användarinformation och inställningar.
          </DialogDescription>
        </DialogHeader>

        {isAdmin && (
          <div className="admin-warning-banner bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-amber-800">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">Administratörskonto</span>
            </div>
            <p className="text-xs text-amber-700 mt-1">
              Vissa ändringar kanske inte tillåts för säkerhets skull.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-edit-user-form space-y-4">
          {/* Email Field */}
          <div className="admin-form-field space-y-2">
            <Label htmlFor="edit-email" className="admin-form-label flex items-center gap-2">
              <Mail className="w-4 h-4" />
              E-postadress
            </Label>
            <Input
              id="edit-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
              disabled={isLoading || isAdmin}
              className="admin-form-input"
            />
            {isAdmin && (
              <p className="admin-field-note text-xs text-gray-500">
                Administratörens e-post kan inte ändras.
              </p>
            )}
          </div>

          {/* Full Name Field */}
          <div className="admin-form-field space-y-2">
            <Label htmlFor="edit-fullname" className="admin-form-label flex items-center gap-2">
              <User className="w-4 h-4" />
              Fullständigt namn
            </Label>
            <Input
              id="edit-fullname"
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              placeholder="För- och efternamn"
              disabled={isLoading}
              className="admin-form-input"
            />
          </div>

          {/* Company Name Field */}
          <div className="admin-form-field space-y-2">
            <Label htmlFor="edit-companyname" className="admin-form-label flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Företagsnamn
            </Label>
            <Input
              id="edit-companyname"
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
              placeholder="Företagets namn"
              disabled={isLoading}
              className="admin-form-input"
            />
          </div>

          {/* Reset Password Section */}
          {!isAdmin && (
            <div className="admin-password-section space-y-3 border-t pt-4">
              <div className="admin-checkbox-field flex items-center space-x-2">
                <Checkbox
                  id="reset-password"
                  checked={formData.resetPassword}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ 
                      ...prev, 
                      resetPassword: !!checked, 
                      newPassword: checked ? prev.newPassword : '' 
                    }))
                  }
                  disabled={isLoading}
                />
                <Label 
                  htmlFor="reset-password" 
                  className="admin-checkbox-label flex items-center gap-2 text-sm font-medium"
                >
                  <Lock className="w-4 h-4" />
                  Återställ lösenord
                </Label>
              </div>

              {formData.resetPassword && (
                <div className="admin-form-field space-y-2">
                  <Label htmlFor="new-password" className="admin-form-label">
                    Nytt lösenord
                  </Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                    placeholder="Minst 8 tecken"
                    required={formData.resetPassword}
                    disabled={isLoading}
                    className="admin-form-input"
                    minLength={8}
                  />
                </div>
              )}
            </div>
          )}

          <DialogFooter className="admin-modal-footer flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="admin-btn-cancel"
            >
              Avbryt
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="admin-btn-save bg-green-600 hover:bg-green-700"
            >
              {isLoading ? (
                <div className="admin-loading-indicator flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Sparar...
                </div>
              ) : (
                'Spara ändringar'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminEditUserModal;