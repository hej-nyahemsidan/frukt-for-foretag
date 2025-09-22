import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AdminAddUserModalProps {
  open: boolean;
  onClose: () => void;
  onUserAdded: () => void;
}

const AdminAddUserModal: React.FC<AdminAddUserModalProps> = ({
  open,
  onClose,
  onUserAdded,
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    companyName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: 'Obligatoriska fält saknas',
        description: 'E-post och lösenord måste anges.',
        variant: 'destructive',
      });
      return;
    }

    if (formData.password.length < 8) {
      toast({
        title: 'Svagt lösenord',
        description: 'Lösenordet måste vara minst 8 tecken långt.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // In a real app, you'd use Supabase admin API to create users
      // For demo purposes, we'll create a customer record
      
      // Generate a random UUID for the user
      const mockUserId = crypto.randomUUID();
      
      // Insert into customers table
      const { error: customerError } = await supabase
        .from('customers')
        .insert({
          user_id: mockUserId,
          email: formData.email,
          contact_person: formData.fullName || 'Ny användare',
          company_name: formData.companyName || 'Företag AB',
          phone: '',
          address: ''
        });

      if (customerError) throw customerError;

      toast({
        title: 'Användare skapad',
        description: `${formData.email} har lagts till i systemet.`,
      });

      // Reset form
      setFormData({
        email: '',
        password: '',
        fullName: '',
        companyName: ''
      });
      
      onUserAdded();
      onClose();
      
    } catch (error: any) {
      toast({
        title: 'Fel vid skapande av användare',
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
        password: '',
        fullName: '',
        companyName: ''
      });
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="admin-add-user-modal sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="admin-modal-title flex items-center gap-2">
            <User className="w-5 h-5" />
            Lägg till ny användare
          </DialogTitle>
          <DialogDescription className="admin-modal-description">
            Skapa en ny användare med åtkomst till kundportalen.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="admin-add-user-form space-y-4">
          {/* Email Field */}
          <div className="admin-form-field space-y-2">
            <Label htmlFor="add-email" className="admin-form-label flex items-center gap-2">
              <Mail className="w-4 h-4" />
              E-postadress *
            </Label>
            <Input
              id="add-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="anvandare@foretag.se"
              required
              disabled={isLoading}
              className="admin-form-input"
            />
          </div>

          {/* Password Field */}
          <div className="admin-form-field space-y-2">
            <Label htmlFor="add-password" className="admin-form-label flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Lösenord *
            </Label>
            <div className="admin-password-input relative">
              <Input
                id="add-password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Minst 8 tecken"
                required
                disabled={isLoading}
                className="admin-form-input pr-10"
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="admin-password-toggle absolute inset-y-0 right-0 flex items-center pr-3"
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

          {/* Full Name Field */}
          <div className="admin-form-field space-y-2">
            <Label htmlFor="add-fullname" className="admin-form-label flex items-center gap-2">
              <User className="w-4 h-4" />
              Fullständigt namn
            </Label>
            <Input
              id="add-fullname"
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
            <Label htmlFor="add-company" className="admin-form-label">
              Företagsnamn
            </Label>
            <Input
              id="add-company"
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
              placeholder="Företag AB"
              disabled={isLoading}
              className="admin-form-input"
            />
          </div>

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
              className="admin-btn-create bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <div className="admin-loading-indicator flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Skapar...
                </div>
              ) : (
                'Skapa användare'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminAddUserModal;