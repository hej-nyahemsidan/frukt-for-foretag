import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DeleteCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerName: string;
  onConfirm: () => void;
  loading: boolean;
}

const DeleteCustomerDialog: React.FC<DeleteCustomerDialogProps> = ({
  open,
  onOpenChange,
  customerName,
  onConfirm,
  loading
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="admin-card">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[hsl(0_0%_95%)]">
            Ta bort kund
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[hsl(0_0%_75%)]">
            Är du säker på att du vill ta bort kunden{' '}
            <span className="font-semibold text-[hsl(0_66%_51%)]">
              {customerName}
            </span>
            ?
            <br />
            <br />
            Denna åtgärd kan inte ångras och kommer att ta bort:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Kundens kontoinformation</li>
              <li>Alla associerade beställningar</li>
              <li>Leveranshistorik</li>
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            className="admin-button bg-[hsl(220_13%_18%)] text-[hsl(0_0%_85%)] hover:bg-[hsl(220_13%_22%)]"
          >
            Avbryt
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={loading}
            className="bg-[hsl(0_66%_51%)] text-white hover:bg-[hsl(0_66%_45%)]"
          >
            {loading ? 'Tar bort...' : 'Ta bort kund'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCustomerDialog;