import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useResellerAuth } from '../contexts/ResellerAuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, ShoppingCart, TrendingUp, Clock, ArrowUpRight } from 'lucide-react';

interface RecentOrder {
  id: string;
  total_price: number | null;
  status: string;
  created_at: string;
  reseller_customer_id: string;
}

const statusLabels: Record<string, string> = {
  pending: 'Väntande',
  confirmed: 'Bekräftad',
  delivered: 'Levererad',
  cancelled: 'Avbruten',
};

const ResellerOverview = ({ onJumpTo }: { onJumpTo?: (tab: string) => void }) => {
  const { reseller } = useResellerAuth();
  const [stats, setStats] = useState({
    totalCustomers: 0,
    activeCustomers: 0,
    monthOrders: 0,
    monthRevenue: 0,
    pending: 0,
  });
  const [recent, setRecent] = useState<RecentOrder[]>([]);
  const [customerNames, setCustomerNames] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (reseller) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reseller]);

  const load = async () => {
    if (!reseller) return;
    setLoading(true);
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const [customersRes, ordersRes] = await Promise.all([
      supabase.from('reseller_customers').select('id, company_name, active').eq('reseller_id', reseller.id),
      supabase.from('reseller_orders').select('id, total_price, status, created_at, reseller_customer_id').eq('reseller_id', reseller.id).order('created_at', { ascending: false }),
    ]);

    const customers = customersRes.data || [];
    const orders = ordersRes.data || [];
    const monthOrders = orders.filter(o => new Date(o.created_at) >= startOfMonth);

    setStats({
      totalCustomers: customers.length,
      activeCustomers: customers.filter(c => c.active).length,
      monthOrders: monthOrders.length,
      monthRevenue: monthOrders.reduce((sum, o) => sum + (o.total_price || 0), 0),
      pending: orders.filter(o => o.status === 'pending').length,
    });

    const map: Record<string, string> = {};
    customers.forEach(c => { map[c.id] = c.company_name; });
    setCustomerNames(map);
    setRecent(orders.slice(0, 5));
    setLoading(false);
  };

  const statusVariant = (s: string) => s === 'delivered' ? 'default' : s === 'cancelled' ? 'destructive' : 'secondary';

  const kpis = [
    {
      label: 'Aktiva kunder',
      value: stats.activeCustomers,
      sub: `av ${stats.totalCustomers} totalt`,
      icon: Users,
      tone: 'from-sky-500/15 to-sky-500/5 text-sky-700 dark:text-sky-300',
    },
    {
      label: 'Ordrar denna månad',
      value: stats.monthOrders,
      sub: 'Sedan månadsstart',
      icon: ShoppingCart,
      tone: 'from-emerald-500/15 to-emerald-500/5 text-emerald-700 dark:text-emerald-300',
    },
    {
      label: 'Omsättning (mån)',
      value: `${Math.round(stats.monthRevenue).toLocaleString('sv-SE')} kr`,
      sub: 'Summa av ordrar',
      icon: TrendingUp,
      tone: 'from-amber-500/15 to-amber-500/5 text-amber-700 dark:text-amber-300',
    },
    {
      label: 'Väntande ordrar',
      value: stats.pending,
      sub: 'Behöver hanteras',
      icon: Clock,
      tone: 'from-rose-500/15 to-rose-500/5 text-rose-700 dark:text-rose-300',
    },
  ];

  if (loading) {
    return <p className="text-muted-foreground text-sm">Laddar översikt...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(k => (
          <Card key={k.label} className={`overflow-hidden border-0 bg-gradient-to-br ${k.tone}`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium uppercase tracking-wide opacity-80">{k.label}</span>
                <k.icon className="w-5 h-5 opacity-70" />
              </div>
              <div className="text-2xl font-bold">{k.value}</div>
              <div className="text-xs opacity-70 mt-1">{k.sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Senaste ordrar</h3>
            {onJumpTo && (
              <button
                onClick={() => onJumpTo('orders')}
                className="text-sm text-primary flex items-center gap-1 hover:underline"
              >
                Visa alla <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          {recent.length === 0 ? (
            <p className="text-sm text-muted-foreground py-6 text-center">Inga ordrar ännu.</p>
          ) : (
            <div className="divide-y">
              {recent.map(o => (
                <div key={o.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div>
                    <div className="font-medium text-sm">{customerNames[o.reseller_customer_id] || '—'}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(o.created_at).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">
                      {o.total_price ? `${o.total_price.toLocaleString('sv-SE')} kr` : '—'}
                    </span>
                    <Badge variant={statusVariant(o.status)}>{statusLabels[o.status] || o.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResellerOverview;