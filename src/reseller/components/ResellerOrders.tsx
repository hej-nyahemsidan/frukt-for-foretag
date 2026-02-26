import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useResellerAuth } from '../contexts/ResellerAuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface Order {
  id: string;
  items: any;
  total_price: number | null;
  status: string;
  selected_days: string[] | null;
  notes: string | null;
  created_at: string;
  reseller_customer_id: string;
}

interface Customer {
  id: string;
  company_name: string;
}

const ResellerOrders = () => {
  const { reseller } = useResellerAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (reseller) fetchData();
  }, [reseller]);

  const fetchData = async () => {
    if (!reseller) return;

    const [ordersRes, customersRes] = await Promise.all([
      supabase.from('reseller_orders').select('*').eq('reseller_id', reseller.id).order('created_at', { ascending: false }),
      supabase.from('reseller_customers').select('id, company_name').eq('reseller_id', reseller.id),
    ]);

    if (ordersRes.data) setOrders(ordersRes.data);
    if (customersRes.data) {
      const map: Record<string, string> = {};
      customersRes.data.forEach(c => { map[c.id] = c.company_name; });
      setCustomers(map);
    }
    setLoading(false);
  };

  const statusLabels: Record<string, string> = {
    pending: 'Väntande',
    confirmed: 'Bekräftad',
    delivered: 'Levererad',
    cancelled: 'Avbruten',
  };

  const statusVariant = (status: string) => {
    if (status === 'delivered') return 'default' as const;
    if (status === 'cancelled') return 'destructive' as const;
    return 'secondary' as const;
  };

  if (loading) return <p className="text-muted-foreground">Laddar ordrar...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Ordrar</h2>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Inga ordrar ännu.
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Datum</TableHead>
                  <TableHead>Kund</TableHead>
                  <TableHead>Totalt</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Dagar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell className="text-sm">
                      {new Date(order.created_at).toLocaleDateString('sv-SE')}
                    </TableCell>
                    <TableCell>{customers[order.reseller_customer_id] || '—'}</TableCell>
                    <TableCell>{order.total_price ? `${order.total_price} kr` : '—'}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(order.status)}>
                        {statusLabels[order.status] || order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {order.selected_days?.join(', ') || '—'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResellerOrders;
