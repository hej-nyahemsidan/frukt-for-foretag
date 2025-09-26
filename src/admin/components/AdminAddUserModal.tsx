import { useState, useEffect, FormEvent } from 'react';
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
import { Eye, EyeOff, User, Mail, Lock, Building2 } from 'lucide-react';

interface AdminAddUserModalProps {
  open: boolean;
  onClose: () => void;
  onAddUser: (email: string, password: string, fullName?: string, companyName?: string) => Promise<void>;
}

const AdminAddUserModal = ({
  open,
  onClose,
  onAddUser,
}: AdminAddUserModalProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    companyName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      alert('E-post och lösenord måste anges.');
      return;
    }

    if (formData.password.length < 6) {
      alert('Lösenordet måste vara minst 6 tecken långt.');
      return;
    }

    setIsLoading(true);

    try {
      await onAddUser(formData.email, formData.password, formData.fullName || undefined, formData.companyName || undefined);
      
      // Reset form
      setFormData({
        email: '',
        password: '',
        fullName: '',
        companyName: ''
      });
      
    } catch (error) {
      // Error handling is done in parent component
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Lägg till ny användare
          </DialogTitle>
          <DialogDescription>
            Skapa en ny användare med åtkomst till kundportalen.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="add-email" className="flex items-center gap-2">
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
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="add-password" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Lösenord *
            </Label>
            <div className="relative">
              <Input
                id="add-password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Minst 6 tecken"
                required
                disabled={isLoading}
                className="pr-10"
                minLength={6}
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

          {/* Full Name Field */}
          <div className="space-y-2">
            <Label htmlFor="add-fullname" className="flex items-center gap-2">
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
            />
          </div>

          {/* Company Name Field */}
          <div className="space-y-2">
            <Label htmlFor="add-companyname" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Företagsnamn
            </Label>
            <Input
              id="add-companyname"
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
              placeholder="Företagets namn"
              disabled={isLoading}
            />
          </div>

          <DialogFooter className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Avbryt
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
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