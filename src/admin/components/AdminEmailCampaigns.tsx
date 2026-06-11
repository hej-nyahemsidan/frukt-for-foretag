import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Send, Loader2, Mail, Search } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Campaign {
  id: string;
  subject: string;
  segment: string;
  sent_count: number;
  failed_count: number;
  total_recipients: number;
  status: string;
  created_at: string;
  completed_at: string | null;
}

const SEGMENTS = [
  { value: 'all', label: 'Alla kunder' },
  { value: 'with_orders', label: 'Endast kunder med beställningar' },
  { value: 'no_orders', label: 'Endast kunder utan beställningar' },
  { value: 'custom', label: 'Välj kunder själv' },
];

const AdminEmailCampaigns = () => {
  const { toast } = useToast();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [segment, setSegment] = useState('all');
  const [sending, setSending] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [recipientCount, setRecipientCount] = useState<number | null>(null);
  const [customers, setCustomers] = useState<Array<{ email: string; company_name: string; contact_person: string }>>([]);
  const [selectedEmails, setSelectedEmails] = useState<Set<string>>(new Set());
  const [customerSearch, setCustomerSearch] = useState('');

  const fetchCampaigns = async () => {
    const { data } = await supabase
      .from('email_campaigns')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);
    setCampaigns((data || []) as Campaign[]);
  };

  const fetchRecipientCount = async () => {
    const { count } = await supabase
      .from('customers')
      .select('*', { count: 'exact', head: true });
    setRecipientCount(count ?? 0);
  };

  const fetchCustomers = async () => {
    const { data } = await supabase
      .from('customers')
      .select('email, company_name, contact_person')
      .order('company_name', { ascending: true });
    setCustomers((data || []).filter((c: any) => c.email) as any);
  };

  useEffect(() => {
    fetchCampaigns();
    fetchRecipientCount();
    fetchCustomers();
  }, []);

  const handleSend = async () => {
    if (!subject.trim() || !message.trim()) {
      toast({ title: 'Fyll i ämne och meddelande', variant: 'destructive' });
      return;
    }
    const confirmed = window.confirm(
      `Skicka detta utskick till valt segment?\n\nÄmne: ${subject}\nSegment: ${SEGMENTS.find(s => s.value === segment)?.label}\n\nDetta går inte att ångra.`
    );
    if (!confirmed) return;

    setSending(true);
    try {
      const body: any = { subject: subject.trim(), message: message.trim(), segment };
      if (segment === 'custom') {
        if (selectedEmails.size === 0) {
          toast({ title: 'Välj minst en mottagare', variant: 'destructive' });
          setSending(false);
          return;
        }
        body.emails = Array.from(selectedEmails);
      }
      const { data, error } = await supabase.functions.invoke('send-campaign', {
        body,
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast({
        title: 'Utskick klart',
        description: `Skickade ${data.sent} av ${data.total} e-postmeddelanden${data.failed ? ` (${data.failed} misslyckades)` : ''}.`,
      });
      setSubject('');
      setMessage('');
      setSelectedEmails(new Set());
      fetchCampaigns();
    } catch (e: any) {
      toast({ title: 'Fel vid utskick', description: e.message, variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  const formatDate = (d: string) => new Date(d).toLocaleString('sv-SE', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  const filteredCustomers = customers.filter(c => {
    if (!customerSearch.trim()) return true;
    const q = customerSearch.toLowerCase();
    return (
      c.email?.toLowerCase().includes(q) ||
      c.company_name?.toLowerCase().includes(q) ||
      c.contact_person?.toLowerCase().includes(q)
    );
  });

  const toggleEmail = (email: string) => {
    setSelectedEmails(prev => {
      const next = new Set(prev);
      if (next.has(email)) next.delete(email);
      else next.add(email);
      return next;
    });
  };

  const toggleAllFiltered = () => {
    const allEmails = filteredCustomers.map(c => c.email.toLowerCase());
    const allSelected = allEmails.every(e => selectedEmails.has(e));
    setSelectedEmails(prev => {
      const next = new Set(prev);
      if (allSelected) allEmails.forEach(e => next.delete(e));
      else allEmails.forEach(e => next.add(e));
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Massutskick</h2>
        <p className="text-sm text-gray-600">
          Skicka e-post till alla kunder från <strong>info@vitaminkorgen.se</strong>
          {recipientCount !== null && <> &middot; {recipientCount} kunder i databasen</>}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" /> Nytt utskick
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="segment">Mottagare</Label>
            <Select value={segment} onValueChange={setSegment}>
              <SelectTrigger id="segment"><SelectValue /></SelectTrigger>
              <SelectContent>
                {SEGMENTS.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          {segment === 'custom' && (
            <div className="border rounded-lg p-3 space-y-3 bg-slate-50">
              <div className="flex items-center justify-between gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    placeholder="Sök företag, namn eller e-post..."
                    className="pl-8"
                  />
                </div>
                <Button type="button" variant="outline" size="sm" onClick={toggleAllFiltered}>
                  Markera/avmarkera alla
                </Button>
              </div>
              <div className="text-xs text-gray-600">
                {selectedEmails.size} valda av {customers.length} kunder
              </div>
              <div className="max-h-72 overflow-y-auto border rounded bg-white divide-y">
                {filteredCustomers.length === 0 ? (
                  <div className="p-3 text-sm text-gray-500">Inga kunder matchar.</div>
                ) : filteredCustomers.map(c => {
                  const email = c.email.toLowerCase();
                  const checked = selectedEmails.has(email);
                  return (
                    <label key={email} className="flex items-center gap-3 p-2 hover:bg-slate-50 cursor-pointer text-sm">
                      <Checkbox checked={checked} onCheckedChange={() => toggleEmail(email)} />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{c.company_name || c.contact_person || c.email}</div>
                        <div className="text-xs text-gray-500 truncate">{c.email}{c.contact_person ? ` · ${c.contact_person}` : ''}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
          <div>
            <Label htmlFor="subject">Ämne</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Ex: Kampanj denna vecka — 20% rabatt"
              maxLength={200}
            />
            <p className="text-xs text-gray-500 mt-1">{subject.length}/200</p>
          </div>
          <div>
            <Label htmlFor="message">Meddelande</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Skriv ditt meddelande här. Använd blankrad för nytt stycke."
              rows={10}
              maxLength={10000}
            />
            <p className="text-xs text-gray-500 mt-1">{message.length}/10000 tecken</p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={handleSend} disabled={sending} className="bg-blue-600 hover:bg-blue-700">
              {sending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Skickar...</> : <><Send className="w-4 h-4 mr-2" /> Skicka utskick</>}
            </Button>
            <span className="text-xs text-gray-500">Avregistrerade kunder hoppas över automatiskt.</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tidigare utskick</CardTitle>
        </CardHeader>
        <CardContent>
          {campaigns.length === 0 ? (
            <p className="text-sm text-gray-500">Inga utskick ännu.</p>
          ) : (
            <div className="space-y-3">
              {campaigns.map(c => (
                <div key={c.id} className="border rounded-lg p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <div className="font-medium text-sm">{c.subject}</div>
                    <div className="text-xs text-gray-500">
                      {formatDate(c.created_at)} &middot; {SEGMENTS.find(s => s.value === c.segment)?.label || c.segment}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-700 border-green-300">
                      {c.sent_count} skickade
                    </Badge>
                    {c.failed_count > 0 && (
                      <Badge variant="outline" className="text-red-700 border-red-300">
                        {c.failed_count} fel
                      </Badge>
                    )}
                    <Badge variant={c.status === 'completed' ? 'default' : 'secondary'}>
                      {c.status}
                    </Badge>
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

export default AdminEmailCampaigns;