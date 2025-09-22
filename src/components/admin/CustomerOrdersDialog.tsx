import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Calendar, DollarSign } from 'lucide-react';

interface Order {
  id: string;
  package_plan: string;
  status: string;
  total_price: number;
  next_delivery_date: string;
  selected_days: string[];
  created_at: string;
  items: any;
}

interface CustomerOrdersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerId: string;
  customerName: string;
}

const CustomerOrdersDialog: React.FC<CustomerOrdersDialogProps> = ({
  open,
  onOpenChange,
  customerId,
  customerName
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCustomerOrders = async () => {
    if (!customerId) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching customer orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && customerId) {
      fetchCustomerOrders();
    }
  }, [open, customerId]);

  const getPlanText = (plan: string) => {
    const plans = {
      weekly: 'Veckovis',
      monthly: 'Månadsvis',
      yearly: 'Årsvis'
    };
    return plans[plan as keyof typeof plans] || plan;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'paused': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'default';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE');
  };

  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto admin-card">
          <DialogHeader>
            <DialogTitle className="text-[hsl(0_0%_95%)]">
              Beställningar för {customerName}
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-[hsl(0_0%_65%)]">Laddar beställningar...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto admin-card">
        <DialogHeader>
          <DialogTitle className="text-[hsl(0_0%_95%)]">
            Beställningar för {customerName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {orders.length === 0 ? (
            <Card className="admin-card">
              <CardContent className="text-center py-8">
                <Package className="h-12 w-12 text-[hsl(0_0%_45%)] mx-auto mb-4" />
                <p className="text-[hsl(0_0%_65%)]">
                  Inga beställningar hittades för denna kund
                </p>
              </CardContent>
            </Card>
          ) : (
            orders.map((order) => (
              <Card key={order.id} className="admin-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-[hsl(0_0%_95%)]">
                        {getPlanText(order.package_plan)} Prenumeration
                      </CardTitle>
                      <p className="text-sm text-[hsl(0_0%_65%)]">
                        Beställning #{order.id.slice(0, 8)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getStatusColor(order.status)}>
                        {order.status === 'active' ? 'Aktiv' : 
                         order.status === 'paused' ? 'Pausad' : 'Avbruten'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-[hsl(122_39%_49%)]" />
                      <div>
                        <p className="text-sm text-[hsl(0_0%_65%)]">Totalpris</p>
                        <p className="font-semibold text-[hsl(0_0%_95%)]">
                          {formatCurrency(order.total_price)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-[hsl(207_79%_42%)]" />
                      <div>
                        <p className="text-sm text-[hsl(0_0%_65%)]">Nästa leverans</p>
                        <p className="font-semibold text-[hsl(0_0%_95%)]">
                          {order.next_delivery_date ? formatDate(order.next_delivery_date) : 'Ej schemalagd'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-[hsl(34_100%_50%)]" />
                      <div>
                        <p className="text-sm text-[hsl(0_0%_65%)]">Leveransdagar</p>
                        <p className="font-semibold text-[hsl(0_0%_95%)]">
                          {order.selected_days.length > 0 ? 
                            order.selected_days.join(', ') : 
                            'Inga dagar valda'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-[hsl(220_13%_18%)]">
                    <p className="text-sm text-[hsl(0_0%_65%)] mb-2">
                      Beställd: {formatDate(order.created_at)}
                    </p>
                    
                    {order.items && Object.keys(order.items).length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-[hsl(0_0%_85%)] mb-2">
                          Beställda produkter:
                        </p>
                        <div className="space-y-1">
                          {Object.entries(order.items).map(([item, quantity], index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-[hsl(0_0%_75%)]">{item}</span>
                              <span className="text-[hsl(0_0%_85%)]">Antal: {quantity as number}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerOrdersDialog;