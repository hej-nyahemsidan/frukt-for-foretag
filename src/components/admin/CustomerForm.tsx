import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';

interface CustomerFormProps {
  customer?: any;
  onSave: () => void;
  onCancel: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ customer, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    company: customer?.company || '',
    email: customer?.email || '',
    password: customer?.password || generatePassword(),
    current_plan: customer?.current_plan || 'weekly',
    delivery_days: customer?.delivery_days || [],
    status: customer?.status || 'active',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function generatePassword() {
    return Math.random().toString(36).slice(-8);
  }

  const days = [
    { value: 'Måndag', label: 'Måndag' },
    { value: 'Tisdag', label: 'Tisdag' },
    { value: 'Onsdag', label: 'Onsdag' },
    { value: 'Torsdag', label: 'Torsdag' },
    { value: 'Fredag', label: 'Fredag' },
    { value: 'Lördag', label: 'Lördag' },
    { value: 'Söndag', label: 'Söndag' },
  ];

  const handleDayChange = (day: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        delivery_days: [...prev.delivery_days, day]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        delivery_days: prev.delivery_days.filter(d => d !== day)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (customer) {
        // Update existing customer
        const { error } = await supabase
          .from('customer_accounts')
          .update(formData)
          .eq('id', customer.id);

        if (error) throw error;
      } else {
        // Create new customer
        const { error } = await supabase
          .from('customer_accounts')
          .insert([formData]);

        if (error) throw error;
      }

      onSave();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Kundnamn *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Företagsnamn *</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-postadress *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Lösenord</Label>
        <div className="flex space-x-2">
          <Input
            id="password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            required
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => setFormData(prev => ({ ...prev, password: generatePassword() }))}
          >
            Generera
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Detta lösenord ska ges till kunden för inloggning
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="plan">Aktuell plan</Label>
        <Select
          value={formData.current_plan}
          onValueChange={(value) => setFormData(prev => ({ ...prev, current_plan: value }))}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Veckovis</SelectItem>
            <SelectItem value="monthly">Månadsvis</SelectItem>
            <SelectItem value="yearly">Årsvis</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Leveransdagar</Label>
        <div className="grid grid-cols-3 gap-2">
          {days.map((day) => (
            <div key={day.value} className="flex items-center space-x-2">
              <Checkbox
                id={day.value}
                checked={formData.delivery_days.includes(day.value)}
                onCheckedChange={(checked) => handleDayChange(day.value, checked as boolean)}
              />
              <Label htmlFor={day.value} className="text-sm">
                {day.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="status"
          checked={formData.status === 'active'}
          onCheckedChange={(checked) => 
            setFormData(prev => ({ 
              ...prev, 
              status: checked ? 'active' : 'inactive' 
            }))
          }
        />
        <Label htmlFor="status">
          Konto aktivt
        </Label>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Avbryt
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Sparar...' : 'Spara'}
        </Button>
      </div>
    </form>
  );
};

export default CustomerForm;