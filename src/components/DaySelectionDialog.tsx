import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, Calendar } from 'lucide-react';

interface DaySelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  availableDays: string[];
  onConfirm: (selectedDays: string[]) => void;
  productName: string;
}

const DaySelectionDialog: React.FC<DaySelectionDialogProps> = ({
  isOpen,
  onClose,
  availableDays,
  onConfirm,
  productName
}) => {
  const [selectedDays, setSelectedDays] = useState<string[]>([...availableDays]);

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleConfirm = () => {
    if (selectedDays.length > 0) {
      onConfirm(selectedDays);
      onClose();
    }
  };

  const selectAllDays = () => {
    setSelectedDays([...availableDays]);
  };

  const clearAllDays = () => {
    setSelectedDays([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#4CAF50]" />
            Välj leveransdagar
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Välj vilka dagar du vill få <span className="font-medium">{productName}</span>
          </p>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={selectAllDays}
              className="text-xs"
            >
              Välj alla
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllDays}
              className="text-xs"
            >
              Rensa alla
            </Button>
          </div>

          {/* Day Selection */}
          <div className="grid grid-cols-2 gap-2">
            {availableDays.map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`
                  p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium
                  ${selectedDays.includes(day)
                    ? 'border-[#4CAF50] bg-[#4CAF50] text-white' 
                    : 'border-gray-300 bg-white text-gray-700 hover:border-[#4CAF50] hover:bg-green-50'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <span>{day}</span>
                  {selectedDays.includes(day) && (
                    <Check size={16} />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Selected Count */}
          <div className="text-center text-sm text-muted-foreground">
            {selectedDays.length > 0 
              ? `${selectedDays.length} ${selectedDays.length === 1 ? 'dag' : 'dagar'} vald${selectedDays.length === 1 ? '' : 'a'}`
              : 'Ingen dag vald'
            }
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Avbryt
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={selectedDays.length === 0}
              className="flex-1 bg-[#4CAF50] hover:bg-[#45a049] text-white"
            >
              Fortsätt
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DaySelectionDialog;