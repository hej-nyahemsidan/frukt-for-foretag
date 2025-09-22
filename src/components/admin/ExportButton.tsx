import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CustomerAccount {
  id: string;
  name: string;
  company: string;
  email: string;
  current_plan: string;
  delivery_days: string[];
  status: string;
  created_at: string;
}

interface ExportButtonProps {
  customers: CustomerAccount[];
}

const ExportButton: React.FC<ExportButtonProps> = ({ customers }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const exportToCSV = async () => {
    setLoading(true);
    
    try {
      // Prepare CSV headers
      const headers = [
        'Namn',
        'Företag', 
        'E-post',
        'Plan',
        'Leveransdagar',
        'Status',
        'Skapad datum'
      ];

      // Prepare CSV data
      const csvData = customers.map(customer => [
        customer.name,
        customer.company,
        customer.email,
        getPlanText(customer.current_plan),
        customer.delivery_days.join('; '),
        customer.status === 'active' ? 'Aktiv' : 'Inaktiv',
        new Date(customer.created_at).toLocaleDateString('sv-SE')
      ]);

      // Combine headers and data
      const csvContent = [headers, ...csvData]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');

      // Create and download file
      const blob = new Blob(['\ufeff' + csvContent], { 
        type: 'text/csv;charset=utf-8;' 
      });
      
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `fruktexperten-kunder-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: 'Export slutförd',
        description: `${customers.length} kunder exporterade till CSV-fil`,
      });
    } catch (error) {
      console.error('Error exporting data:', error);
      toast({
        title: 'Export misslyckades',
        description: 'Ett fel uppstod vid export av kunddata',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getPlanText = (plan: string) => {
    const plans = {
      weekly: 'Veckovis',
      monthly: 'Månadsvis',
      yearly: 'Årsvis'
    };
    return plans[plan as keyof typeof plans] || plan;
  };

  return (
    <Button
      variant="outline"
      onClick={exportToCSV}
      disabled={loading || customers.length === 0}
      className="admin-button bg-[hsl(220_13%_18%)] text-[hsl(0_0%_85%)] hover:bg-[hsl(220_13%_22%)]"
    >
      <Download className="w-4 h-4 mr-2" />
      {loading ? 'Exporterar...' : `Exportera (${customers.length})`}
    </Button>
  );
};

export default ExportButton;