import { useEffect, useMemo, useState } from 'react';
import { BarChart3, Eye, MousePointerClick, Send, ShoppingBasket, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ConversionEvent {
  id: string;
  session_id: string;
  event_name: string;
  basket_type: string | null;
  employee_count: number | null;
  price: number | null;
  created_at: string;
}

const steps = [
  { event: 'basket_selector_viewed', label: 'Såg korgväljaren' },
  { event: 'basket_selected', label: 'Valde en korg' },
  { event: 'employee_count_selected', label: 'Angav antal personer' },
  { event: 'price_viewed', label: 'Såg beräknat pris' },
  { event: 'quote_started', label: 'Fortsatte till offert' },
  { event: 'quote_submitted', label: 'Skickade offert' },
] as const;

const AdminConversionAnalytics = () => {
  const [days, setDays] = useState(30);
  const [events, setEvents] = useState<ConversionEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
      const { data, error } = await supabase
        .from('conversion_events')
        .select('id, session_id, event_name, basket_type, employee_count, price, created_at')
        .gte('created_at', since)
        .order('created_at', { ascending: false });
      if (!error) setEvents((data ?? []) as ConversionEvent[]);
      setLoading(false);
    };
    void load();
  }, [days]);

  const stats = useMemo(() => {
    const uniqueByStep = steps.map(step => ({
      ...step,
      count: new Set(events.filter(event => event.event_name === step.event).map(event => event.session_id)).size,
    }));
    const visitors = uniqueByStep[0].count;
    const submitted = uniqueByStep[5].count;
    const baskets = ['Original', 'Banan', 'Premium'].map(name => ({
      name,
      count: events.filter(event => event.event_name === 'basket_selected' && event.basket_type === name).length,
    }));
    const employeeCounts = new Map<number, number>();
    events.filter(event => event.event_name === 'employee_count_selected' && event.employee_count !== null).forEach(event => {
      const count = event.employee_count ?? 0;
      employeeCounts.set(count, (employeeCounts.get(count) ?? 0) + 1);
    });
    const popularSizes = [...employeeCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
    return { uniqueByStep, visitors, submitted, baskets, popularSizes };
  }, [events]);

  if (loading) return <p className="py-8 text-center text-gray-500">Laddar besöksanalys...</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Besöksanalys</h2>
          <p className="text-sm text-gray-500 mt-1">Anonym statistik från besökare som godkänt analyscookies.</p>
        </div>
        <div className="flex gap-2" aria-label="Välj tidsperiod">
          {[7, 30, 90].map(period => (
            <Button key={period} size="sm" variant={days === period ? 'default' : 'outline'} onClick={() => setDays(period)}>
              {period} dagar
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card><CardHeader className="pb-2 flex flex-row items-center justify-between"><CardTitle className="text-xs text-gray-500">Såg väljaren</CardTitle><Eye className="w-4 h-4 text-gray-400" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.visitors}</div></CardContent></Card>
        <Card><CardHeader className="pb-2 flex flex-row items-center justify-between"><CardTitle className="text-xs text-gray-500">Valde korg</CardTitle><ShoppingBasket className="w-4 h-4 text-gray-400" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.uniqueByStep[1].count}</div></CardContent></Card>
        <Card><CardHeader className="pb-2 flex flex-row items-center justify-between"><CardTitle className="text-xs text-gray-500">Till offert</CardTitle><MousePointerClick className="w-4 h-4 text-gray-400" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.uniqueByStep[4].count}</div></CardContent></Card>
        <Card><CardHeader className="pb-2 flex flex-row items-center justify-between"><CardTitle className="text-xs text-gray-500">Skickade offert</CardTitle><Send className="w-4 h-4 text-gray-400" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.submitted}</div><p className="text-xs text-gray-500 mt-1">{stats.visitors ? `${Math.round((stats.submitted / stats.visitors) * 100)}% av besökarna` : 'Ingen data ännu'}</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><BarChart3 className="w-5 h-5" />Konverteringstratt</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {stats.uniqueByStep.map((step, index) => {
            const previous = index === 0 ? step.count : stats.uniqueByStep[index - 1].count;
            const rate = previous ? Math.round((step.count / previous) * 100) : 0;
            const width = stats.visitors ? Math.max(4, (step.count / stats.visitors) * 100) : 0;
            return (
              <div key={step.event}>
                <div className="flex justify-between text-sm mb-1"><span className="font-medium">{step.label}</span><span>{step.count} besökare {index > 0 && `· ${rate}% från föregående steg`}</span></div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${width}%` }} /></div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><ShoppingBasket className="w-5 h-5" />Korgar som jämförs</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {stats.baskets.map(basket => <div key={basket.name} className="flex justify-between border-b pb-2 last:border-0"><span>{basket.name}</span><strong>{basket.count} val</strong></div>)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Users className="w-5 h-5" />Vanligaste antal personer</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {stats.popularSizes.length ? stats.popularSizes.map(([size, count]) => <div key={size} className="flex justify-between border-b pb-2 last:border-0"><span>{size} personer</span><strong>{count} val</strong></div>) : <p className="text-sm text-gray-500">Ingen data ännu.</p>}
          </CardContent>
        </Card>
      </div>

      <p className="text-xs text-gray-500">Kontaktuppgifter visas endast under Leads när besökaren själv har skickat formuläret. Påbörjade men oskickade uppgifter sparas inte.</p>
    </div>
  );
};

export default AdminConversionAnalytics;
