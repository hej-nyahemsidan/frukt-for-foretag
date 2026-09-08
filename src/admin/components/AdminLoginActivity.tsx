import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ActivityUser {
  id: string;
  email: string;
  company_name: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  email_confirmed_at: string | null;
  invite_created_at: string | null;
  invite_expires_at: string | null;
  invite_used_at: string | null;
}

const fmt = (value: string | null | undefined) => {
  if (!value) return '—';
  return new Date(value).toLocaleString('sv-SE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const AdminLoginActivity = () => {
  const [users, setUsers] = useState<ActivityUser[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.functions.invoke('admin-list-users');
      if (error) throw error;
      setUsers((data?.users || []) as ActivityUser[]);
    } catch (e) {
      toast({
        title: 'Kunde inte hämta inloggningsdata',
        description: 'Försök igen om en stund.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = q
      ? users.filter(
          (u) =>
            u.email?.toLowerCase().includes(q) ||
            (u.company_name || '').toLowerCase().includes(q)
        )
      : users;
    return [...rows].sort((a, b) => {
      const av = a.last_sign_in_at ? new Date(a.last_sign_in_at).getTime() : 0;
      const bv = b.last_sign_in_at ? new Date(b.last_sign_in_at).getTime() : 0;
      return bv - av;
    });
  }, [users, query]);

  const stats = useMemo(() => {
    const now = Date.now();
    return {
      total: users.length,
      loggedIn: users.filter((u) => !!u.last_sign_in_at).length,
      neverLoggedIn: users.filter((u) => !u.last_sign_in_at).length,
      expired: users.filter(
        (u) =>
          u.invite_expires_at &&
          !u.invite_used_at &&
          new Date(u.invite_expires_at).getTime() < now
      ).length,
    };
  }, [users]);

  const linkStatus = (u: ActivityUser) => {
    if (!u.invite_expires_at) {
      return <Badge variant="outline">Ingen länk registrerad</Badge>;
    }
    if (u.invite_used_at) {
      return <Badge className="bg-green-600 hover:bg-green-600">Använd {fmt(u.invite_used_at)}</Badge>;
    }
    const expires = new Date(u.invite_expires_at).getTime();
    if (expires < Date.now()) {
      return <Badge variant="destructive">Utgången {fmt(u.invite_expires_at)}</Badge>;
    }
    const daysLeft = Math.ceil((expires - Date.now()) / (1000 * 60 * 60 * 24));
    return (
      <Badge className="bg-amber-500 hover:bg-amber-500">
        Aktiv – {daysLeft} dag{daysLeft === 1 ? '' : 'ar'} kvar
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-lg border p-4">
          <p className="text-xs text-gray-500">Totalt konton</p>
          <p className="text-2xl font-semibold">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <p className="text-xs text-gray-500">Har loggat in</p>
          <p className="text-2xl font-semibold text-green-600">{stats.loggedIn}</p>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <p className="text-xs text-gray-500">Aldrig inloggad</p>
          <p className="text-2xl font-semibold text-gray-700">{stats.neverLoggedIn}</p>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <p className="text-xs text-gray-500">Utgångna länkar</p>
          <p className="text-2xl font-semibold text-red-600">{stats.expired}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Sök e-post eller företag"
            className="pl-9"
            aria-label="Sök kund"
          />
        </div>
        <Button variant="outline" size="sm" onClick={fetchUsers} disabled={isLoading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Uppdatera
        </Button>
      </div>

      <div className="bg-white rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kund</TableHead>
              <TableHead>Senaste inloggning</TableHead>
              <TableHead>Konto skapat</TableHead>
              <TableHead>Länk skickad</TableHead>
              <TableHead>Länken går ut</TableHead>
              <TableHead>Status på länk</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  Laddar...
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  Inga kunder hittades.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="font-medium">{u.company_name || '—'}</div>
                    <div className="text-xs text-gray-500 break-all">{u.email}</div>
                  </TableCell>
                  <TableCell className={u.last_sign_in_at ? '' : 'text-gray-400'}>
                    {u.last_sign_in_at ? fmt(u.last_sign_in_at) : 'Aldrig inloggad'}
                  </TableCell>
                  <TableCell>{fmt(u.created_at)}</TableCell>
                  <TableCell>{fmt(u.invite_created_at)}</TableCell>
                  <TableCell>{fmt(u.invite_expires_at)}</TableCell>
                  <TableCell>{linkStatus(u)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminLoginActivity;
