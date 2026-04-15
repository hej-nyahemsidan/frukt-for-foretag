import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Mail, Phone, Building2, Clock, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PricelistLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
}

interface PriceGuideLead {
  id: string;
  company_name: string;
  employee_count: string;
  delivery_frequency: string;
  email: string;
  phone: string;
  leftover_fruit: string | null;
  delivery_time: string | null;
  current_basket_name: string | null;
  created_at: string;
}

const AdminLeadManagement = () => {
  const { toast } = useToast();
  const [pricelistLeads, setPricelistLeads] = useState<PricelistLead[]>([]);
  const [priceGuideLeads, setPriceGuideLeads] = useState<PriceGuideLead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    setLoading(true);
    const [plRes, pgRes] = await Promise.all([
      supabase.from('pricelist_leads').select('*').order('created_at', { ascending: false }),
      supabase.from('price_guide_leads').select('*').order('created_at', { ascending: false }),
    ]);

    if (plRes.data) setPricelistLeads(plRes.data);
    if (pgRes.data) setPriceGuideLeads(pgRes.data);
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  const deletePricelistLead = async (id: string) => {
    const { error } = await supabase.from('pricelist_leads').delete().eq('id', id);
    if (!error) {
      setPricelistLeads(prev => prev.filter(l => l.id !== id));
      toast({ title: 'Lead borttaget' });
    }
  };

  const deletePriceGuideLead = async (id: string) => {
    const { error } = await supabase.from('price_guide_leads').delete().eq('id', id);
    if (!error) {
      setPriceGuideLeads(prev => prev.filter(l => l.id !== id));
      toast({ title: 'Lead borttaget' });
    }
  };

  const formatDate = (d: string) => new Date(d).toLocaleString('sv-SE', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  if (loading) return <p className="text-center py-8 text-gray-500">Laddar leads...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Leads</h2>
        <span className="text-sm text-gray-500">
          Totalt: {pricelistLeads.length + priceGuideLeads.length} leads
        </span>
      </div>

      <Tabs defaultValue="pricelist">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pricelist" className="text-xs sm:text-sm">
            <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            Prislista ({pricelistLeads.length})
          </TabsTrigger>
          <TabsTrigger value="priceguide" className="text-xs sm:text-sm">
            <Building2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            Frukttips ({priceGuideLeads.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pricelist">
          {pricelistLeads.length === 0 ? (
            <p className="text-center py-8 text-gray-400">Inga prislisteleads ännu.</p>
          ) : (
            <div className="space-y-3">
              {pricelistLeads.map(lead => (
                <div key={lead.id} className="bg-white border rounded-lg p-4 flex items-start justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{lead.name}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{lead.email}</span>
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{lead.phone}</span>
                    </div>
                    <p className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{formatDate(lead.created_at)}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deletePricelistLead(lead.id)} className="text-red-400 hover:text-red-600 flex-shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="priceguide">
          {priceGuideLeads.length === 0 ? (
            <p className="text-center py-8 text-gray-400">Inga frukttips-leads ännu.</p>
          ) : (
            <div className="space-y-3">
              {priceGuideLeads.map(lead => (
                <div key={lead.id} className="bg-white border rounded-lg p-4 flex items-start justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{lead.company_name}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{lead.email}</span>
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{lead.phone}</span>
                      <span>{lead.employee_count} anst.</span>
                      <span>{lead.delivery_frequency}/vecka</span>
                      {lead.delivery_time && <span>Lev: {lead.delivery_time}</span>}
                      {lead.current_basket_name && <span>Korg: {lead.current_basket_name}</span>}
                    </div>
                    {lead.leftover_fruit && (
                      <p className="text-xs text-muted-foreground">Blir över: {lead.leftover_fruit}</p>
                    )}
                    <p className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{formatDate(lead.created_at)}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deletePriceGuideLead(lead.id)} className="text-red-400 hover:text-red-600 flex-shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminLeadManagement;
