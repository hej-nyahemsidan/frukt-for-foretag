import { useState, useEffect, useRef, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCart } from '@/contexts/CartContext';
import { AlertCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface OrderSidebarProps {
  packagePlan: string;
  setPackagePlan: (plan: string) => void;
  orderType: string;
  setOrderType: (type: string) => void;
  selectedDays: string[];
  setSelectedDays: (days: string[]) => void;
  currentDay: string;
  setCurrentDay: (day: string) => void;
  onCheckout?: () => void;
}

const OrderSidebar = ({ packagePlan, setPackagePlan, orderType, setOrderType, selectedDays, setSelectedDays, currentDay, setCurrentDay, onCheckout }: OrderSidebarProps) => {
  const navigate = useNavigate();
  const { getItemsByOrderType } = useCart();
  const isMobile = useIsMobile();
  const days = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag'];
  
  // Track previous values to detect actual changes
  const prevOrderTypeRef = useRef(orderType);
  const prevPackagePlanRef = useRef(packagePlan);
  
  // Calculate total items for current order type only
  const relevantItems = getItemsByOrderType(orderType);
  const totalItems = relevantItems.reduce((sum, item) => sum + item.quantity, 0);

  // Auto-set package plan to weekly when subscription is selected
  useEffect(() => {
    if (orderType === 'subscription') {
      setPackagePlan('weekly');
    }
  }, [orderType, setPackagePlan]);

  // Filter days based on order type and package plan
  const availableDays = (orderType === 'subscription' && packagePlan === 'weekly') 
    ? ['Måndag', 'Onsdag'] 
    : days;
  const isWeeklySubscription = orderType === 'subscription' && packagePlan === 'weekly';

  const hasSelectedDays = selectedDays.length > 0;
  const hasItems = totalItems > 0;
  const canProceed = hasSelectedDays && hasItems;

  const handleDayChange = (day: string, checked: boolean) => {
    if (checked) {
      const newDays = [...new Set([...selectedDays, day])];
      setSelectedDays(newDays);
      // Set the newly selected day as current day if none is set
      if (!currentDay) {
        setCurrentDay(day);
      }
    } else {
      const newDays = selectedDays.filter(d => d !== day);
      setSelectedDays(newDays);
      // If we removed the current day, switch to another day or clear
      if (currentDay === day) {
        setCurrentDay(newDays.length > 0 ? newDays[0] : '');
      }
    }
  };

  const handleWeeklyDaySelect = (day: string) => {
    setSelectedDays([day]);
  };

  // Clear selected days only when order type or package plan actually changes (not on mount)
  useEffect(() => {
    const orderTypeChanged = prevOrderTypeRef.current !== orderType;
    const packagePlanChanged = prevPackagePlanRef.current !== packagePlan;
    
    if (orderTypeChanged || packagePlanChanged) {
      setSelectedDays([]);
      setCurrentDay('');
    }
    
    // Update refs for next comparison
    prevOrderTypeRef.current = orderType;
    prevPackagePlanRef.current = packagePlan;
  }, [orderType, packagePlan, setSelectedDays, setCurrentDay]);

  const handleNext = () => {
    if (canProceed) {
      if (onCheckout) {
        onCheckout();
      } else {
        navigate('/checkout', {
          state: {
            orderType,
            packagePlan,
            selectedDays
          }
        });
      }
    }
  };

  return (
    <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-sm border">
      {/* Step Indicator */}
      <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 mb-6 sm:mb-8">
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#6B6B6B] text-white flex items-center justify-center text-xs sm:text-sm font-medium">
            1
          </div>
          <span className="text-xs sm:text-sm font-medium text-charcoal">Välj dag</span>
        </div>
        <div className="w-4 sm:w-6 border-t border-mediumgray"></div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-[#6B6B6B] text-[#6B6B6B] flex items-center justify-center text-xs sm:text-sm font-medium">
            2
          </div>
          <span className="text-xs sm:text-sm text-[#6B6B6B]">Välj produkter</span>
        </div>
        <div className="w-4 sm:w-6 border-t border-mediumgray"></div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-[#6B6B6B] text-[#6B6B6B] flex items-center justify-center text-xs sm:text-sm font-medium">
            3
          </div>
          <span className="text-xs sm:text-sm text-[#6B6B6B]">Slutför</span>
        </div>
      </div>

      {/* Order Type Section */}
      <div className="mb-6 sm:mb-8">
        <h3 className="text-base sm:text-lg font-semibold text-charcoal mb-3 sm:mb-4">Typ av beställning</h3>
        <RadioGroup value={orderType} onValueChange={setOrderType} className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem 
              value="onetime" 
              id="onetime" 
              className="border-[#4CAF50] text-[#4CAF50] data-[state=checked]:bg-[#4CAF50]" 
            />
            <Label htmlFor="onetime" className="text-charcoal">Engångsköp</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem 
              value="subscription" 
              id="subscription"
              className="border-[#4CAF50] text-[#4CAF50] data-[state=checked]:bg-[#4CAF50]"
            />
            <Label htmlFor="subscription" className="text-charcoal">Lägg till Prenumeration</Label>
          </div>
        </RadioGroup>
      </div>


      {/* Select Days Section */}
      <div className="mb-6 sm:mb-8">
        <h3 className="text-base sm:text-lg font-semibold text-charcoal mb-3 sm:mb-4">Välj vilka dagar</h3>
        <div className="space-y-3">
          {isWeeklySubscription ? (
            // Checkboxes for weekly subscription (Monday and Wednesday)
            availableDays.map((day) => (
              <div key={day} className="flex items-center space-x-2">
                <Checkbox
                  id={day}
                  checked={selectedDays.includes(day)}
                  onCheckedChange={(checked) => handleDayChange(day, checked as boolean)}
                  className="border-[#4CAF50] data-[state=checked]:bg-[#4CAF50] data-[state=checked]:text-white"
                />
                <Label htmlFor={day} className="text-charcoal cursor-pointer">
                  {day}
                </Label>
              </div>
            ))
          ) : (
            // Checkboxes for other order types
            availableDays.map((day) => (
              <div key={day} className="flex items-center space-x-2">
                <Checkbox
                  id={day}
                  checked={selectedDays.includes(day)}
                  onCheckedChange={(checked) => handleDayChange(day, checked as boolean)}
                  className="border-[#4CAF50] data-[state=checked]:bg-[#4CAF50] data-[state=checked]:text-white"
                />
                <Label htmlFor={day} className="text-charcoal cursor-pointer">
                  {day}
                </Label>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Current Day Switcher - For any order type with multiple days */}
      {selectedDays.length > 1 && (
        <div className="mb-6 sm:mb-8 p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="text-sm font-semibold text-charcoal mb-3">Lägg till produkter för:</h3>
          <div className="flex gap-2">
            {selectedDays.map((day) => (
              <Button
                key={day}
                onClick={() => setCurrentDay(day)}
                variant={currentDay === day ? "default" : "outline"}
                className={currentDay === day ? "bg-[#4CAF50] hover:bg-[#45a049]" : ""}
                size="sm"
              >
                {day}
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Välj en dag ovan för att lägga till produkter för den dagen
          </p>
        </div>
      )}

      {/* Validation Messages */}
      {!canProceed && (
        <div className="mb-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {!hasItems && "Lägg till produkter i varukorgen. "}
              {!hasSelectedDays && "Välj minst en leveransdag."}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Next Button */}
      <Button 
        className={`w-full h-12 sm:h-10 text-base sm:text-sm font-medium ${
          canProceed 
            ? 'bg-[#4CAF50] hover:bg-[#45a049] text-white' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        onClick={handleNext}
        disabled={!canProceed}
      >
        Nästa {hasItems && `(${totalItems} produkter)`}
      </Button>
    </div>
  );
};

export default OrderSidebar;