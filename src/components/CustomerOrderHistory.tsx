import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Package, Calendar, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

interface OrderItem {
  id?: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  assignedDay?: string;
  orderType?: string;
}

interface Order {
  id: string;
  package_plan: string;
  selected_days: string[] | null;
  items: OrderItem[];
  status: string;
  total_price: number;
  next_delivery_date: string | null;
  created_at: string;
}

const statusLabel = (s: string) => {
  const map: Record<string, string> = {
    pending: 'Mottagen',
    confirmed: 'Bekräftad',
    delivered: 'Levererad',
    cancelled: 'Avbruten',
  };
  return map[s] ?? s;
};

const CustomerOrderHistory = () => {
  const { customer } = useAuth();
  const { addItem } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!customer?.id) return;
    let cancel = false;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_id', customer.id)
        .order('created_at', { ascending: false });
      if (!cancel) {
        if (!error && data) setOrders(data as unknown as Order[]);
        setLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, [customer?.id]);

  const reorder = (o: Order) => {
    const list = Array.isArray(o.items) ? o.items : [];
    if (list.length === 0) {
      toast({ title: 'Inga produkter att lägga till' });
      return;
    }
    list.forEach((it) => {
      addItem({
        id: it.id || `${it.name}-${it.size || ''}`,
        name: it.name,
        price: Number(it.price) || 0,
        category: 'fruktkorgar',
        size: it.size,
        assignedDay: it.assignedDay,
        orderType: it.orderType || (o.package_plan === 'weekly' ? 'subscription' : 'onetime'),
        quantity: it.quantity || 1,
      });
    });
    toast({
      title: 'Produkter tillagda',
      description: `${list.reduce((s, i) => s + (i.quantity || 1), 0)} produkter lades till i din beställning.`,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 text-center text-muted-foreground">
        Laddar dina tidigare beställningar...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 text-center text-muted-foreground">
        <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
        Du har inga tidigare beställningar ännu.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex items-center gap-2">
        <Package className="w-5 h-5 text-secondary" />
        <h2 className="text-lg font-semibold text-charcoal">Tidigare beställningar</h2>
        <span className="ml-auto text-sm text-muted-foreground">{orders.length} st</span>
      </div>
      <ul className="divide-y divide-gray-100">
        {orders.map((o) => {
          const isOpen = expanded === o.id;
          const date = new Date(o.created_at).toLocaleDateString('sv-SE', {
            year: 'numeric', month: 'short', day: 'numeric',
          });
          const itemCount = Array.isArray(o.items)
            ? o.items.reduce((s, i) => s + (i.quantity || 1), 0)
            : 0;
          return (
            <li key={o.id} className="px-4 sm:px-6 py-4">
              <button
                onClick={() => setExpanded(isOpen ? null : o.id)}
                className="w-full flex items-center gap-3 text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-medium text-charcoal">{date}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">
                      {statusLabel(o.status)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {o.package_plan === 'weekly' ? 'Prenumeration' : 'Engångsköp'}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {itemCount} produkter · {Number(o.total_price).toFixed(2)} kr
                    {o.next_delivery_date && (
                      <> · Nästa leverans {new Date(o.next_delivery_date).toLocaleDateString('sv-SE')}</>
                    )}
                  </div>
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
              </button>

              <div className="mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => { e.stopPropagation(); reorder(o); }}
                  className="gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Beställ samma igen
                </Button>
              </div>

              {isOpen && (
                <div className="mt-3 pl-1 sm:pl-2 border-l-2 border-secondary/30">
                  {o.selected_days && o.selected_days.length > 0 && (
                    <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Leveransdagar: {o.selected_days.join(', ')}
                    </div>
                  )}
                  <ul className="space-y-1 text-sm">
                    {(o.items || []).map((it, idx) => (
                      <li key={idx} className="flex justify-between gap-3 py-1">
                        <span className="text-charcoal">
                          {it.quantity}× {it.name}
                          {it.size && <span className="text-muted-foreground"> ({it.size})</span>}
                          {it.assignedDay && <span className="text-muted-foreground"> – {it.assignedDay}</span>}
                        </span>
                        <span className="text-muted-foreground whitespace-nowrap">
                          {(Number(it.price) * (it.quantity || 1)).toFixed(2)} kr
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CustomerOrderHistory;