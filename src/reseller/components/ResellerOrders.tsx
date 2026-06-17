import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useResellerAuth } from '../contexts/ResellerAuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { toast } from 'sonner';
import { CheckCircle2, Truck, XCircle } from 'lucide-react';

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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

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

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    const { error } = await supabase
      .from('reseller_orders')
      .update({ status: newStatus })
      .eq('id', orderId);
    setUpdatingId(null);
    if (error) {
      toast.error('Kunde inte uppdatera status');
      return;
    }
    toast.success(`Status uppdaterad till ${statusLabels[newStatus]}`);
    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o)));
    setSelectedOrder(prev => (prev && prev.id === orderId ? { ...prev, status: newStatus } : prev));
  };

  const renderActions = (order: Order) => {
    const busy = updatingId === order.id;
    return (
      <div className="flex flex-wrap gap-1" onClick={(e) => e.stopPropagation()}>
        {order.status === 'pending' && (
          <Button size="sm" variant="default" disabled={busy} onClick={() => updateStatus(order.id, 'confirmed')}>
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Bekräfta
          </Button>
        )}
        {order.status === 'confirmed' && (
          <Button size="sm" variant="default" disabled={busy} onClick={() => updateStatus(order.id, 'delivered')}>
            <Truck className="h-3.5 w-3.5 mr-1" /> Levererad
          </Button>
        )}
        {(order.status === 'pending' || order.status === 'confirmed') && (
          <Button size="sm" variant="outline" disabled={busy} onClick={() => updateStatus(order.id, 'cancelled')}>
            <XCircle className="h-3.5 w-3.5 mr-1" /> Avbryt
          </Button>
        )}
      </div>
    );
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
                  <TableHead className="text-right">Åtgärder</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map(order => (
                  <TableRow
                    key={order.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedOrder(order)}
                  >
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
                    <TableCell className="text-right">{renderActions(order)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Sheet open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <SheetContent className="overflow-y-auto sm:max-w-lg">
          {selectedOrder && (
            <>
              <SheetHeader>
                <SheetTitle>Orderdetaljer</SheetTitle>
                <SheetDescription>
                  {customers[selectedOrder.reseller_customer_id] || '—'} ·{' '}
                  {new Date(selectedOrder.created_at).toLocaleDateString('sv-SE')}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-5">
                <div className="flex items-center justify-between">
                  <Badge variant={statusVariant(selectedOrder.status)}>
                    {statusLabels[selectedOrder.status] || selectedOrder.status}
                  </Badge>
                  <span className="font-semibold">
                    {selectedOrder.total_price ? `${selectedOrder.total_price} kr` : '—'}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2">Produkter</h4>
                  {Array.isArray(selectedOrder.items) && selectedOrder.items.length > 0 ? (
                    <ul className="space-y-2 text-sm">
                      {selectedOrder.items.map((item: any, idx: number) => (
                        <li key={idx} className="flex justify-between border-b pb-2">
                          <span>
                            {item.quantity}× {item.name || item.product_name || 'Produkt'}
                            {item.size ? ` (${item.size})` : ''}
                          </span>
                          <span className="text-muted-foreground">
                            {item.price ? `${item.price} kr` : ''}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">Inga produktrader.</p>
                  )}
                </div>

                {selectedOrder.selected_days && selectedOrder.selected_days.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Leveransdagar</h4>
                    <p className="text-sm">{selectedOrder.selected_days.join(', ')}</p>
                  </div>
                )}

                {selectedOrder.notes && (
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Notering</h4>
                    <p className="text-sm whitespace-pre-wrap">{selectedOrder.notes}</p>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <h4 className="text-sm font-semibold mb-2">Ändra status</h4>
                  {renderActions(selectedOrder)}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ResellerOrders;
