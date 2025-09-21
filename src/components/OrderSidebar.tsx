import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface OrderSidebarProps {
  packagePlan: string;
  setPackagePlan: (plan: string) => void;
  selectedDays: string[];
  setSelectedDays: (days: string[]) => void;
}

const OrderSidebar = ({ packagePlan, setPackagePlan, selectedDays, setSelectedDays }: OrderSidebarProps) => {
  const days = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag'];

  const handleDayChange = (day: string, checked: boolean) => {
    if (checked) {
      setSelectedDays([...selectedDays, day]);
    } else {
      setSelectedDays(selectedDays.filter(d => d !== day));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      {/* Step Indicator */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center text-sm font-medium">
            1
          </div>
          <span className="text-sm font-medium text-charcoal">Välj dag</span>
        </div>
        <div className="w-8 border-t border-mediumgray"></div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border-2 border-mediumgray text-mediumgray flex items-center justify-center text-sm font-medium">
            2
          </div>
          <span className="text-sm text-mediumgray">Slutför</span>
        </div>
      </div>

      {/* Package Plan Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-charcoal mb-4">Paketplan</h3>
        <RadioGroup value={packagePlan} onValueChange={setPackagePlan} className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="weekly" id="weekly" />
            <Label htmlFor="weekly" className="text-charcoal">Veckovis</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="monthly" id="monthly" />
            <Label htmlFor="monthly" className="text-charcoal">Månadsvis</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yearly" id="yearly" />
            <Label htmlFor="yearly" className="text-charcoal">Årsvis</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Select Days Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-charcoal mb-4">Välj vilka dagar</h3>
        <div className="space-y-3">
          {days.map((day) => (
            <div key={day} className="flex items-center space-x-2">
              <Checkbox
                id={day}
                checked={selectedDays.includes(day)}
                onCheckedChange={(checked) => handleDayChange(day, !!checked)}
              />
              <Label htmlFor={day} className="text-charcoal">{day}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <Button className="w-full bg-secondary hover:bg-secondary/90 text-white">
        Nästa
      </Button>
    </div>
  );
};

export default OrderSidebar;