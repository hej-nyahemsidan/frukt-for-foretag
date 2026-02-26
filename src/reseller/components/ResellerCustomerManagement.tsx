import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useResellerAuth } from '../contexts/ResellerAuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Users, ChevronLeft } from 'lucide-react';

interface ResellerCustomer {
  id: string;
  company_name: string;
  contact_person: string | null;
  email: string;
  phone: string | null;
  address: string | null;
  active: boolean;
  user_id: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  prices: Record<string, number>;
  image_url: string;
}

interface CustomerPrice {
  id: string;
  product_id: string;
  price: number;
  size: string | null;
}

interface StandardPrice {
  product_id: string;
  price: number;
  size: string | null;
}

const ResellerCustomerManagement = () => {
  const { reseller } = useResellerAuth();
  const { toast } = useToast();
  const [customers, setCustomers] = useState<ResellerCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<ResellerCustomer | null>(null);
  const [customerPrices, setCustomerPrices] = useState<CustomerPrice[]>([]);
  const [standardPrices, setStandardPrices] = useState<StandardPrice[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // Form state
  const [formCompany, setFormCompany] = useState('');
  const [formContact, setFormContact] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (reseller) {
      fetchCustomers();
      fetchProducts();
      fetchStandardPrices();
    }
  }, [reseller]);

  const fetchCustomers = async () => {
    if (!reseller) return;
    const { data, error } = await supabase
      .from('reseller_customers')
      .select('*')
      .eq('reseller_id', reseller.id)
      .order('company_name');

    if (!error) setCustomers(data || []);
    setLoading(false);
  };

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('category');
    if (data) {
      setProducts(data.map(p => ({
        ...p,
        prices: (typeof p.prices === 'object' && p.prices !== null ? p.prices : {}) as Record<string, number>,
      })));
    }
  };

  const fetchStandardPrices = async () => {
    if (!reseller) return;
    const { data } = await supabase
      .from('reseller_product_prices')
      .select('product_id, price, size')
      .eq('reseller_id', reseller.id);
    if (data) setStandardPrices(data);
  };

  const fetchCustomerPrices = async (customerId: string) => {
    const { data } = await supabase
      .from('reseller_customer_prices')
      .select('id, product_id, price, size')
      .eq('reseller_customer_id', customerId);
    if (data) setCustomerPrices(data);
  };

  const resetForm = () => {
    setFormCompany('');
    setFormContact('');
    setFormEmail('');
    setFormPhone('');
    setFormAddress('');
    setFormPassword('');
  };

  const handleCreateCustomer = async () => {
    if (!reseller || !formEmail || !formPassword || !formCompany) {
      toast({ title: 'Fel', description: 'Fyll i alla obligatoriska fält.', variant: 'destructive' });
      return;
    }

    setCreating(true);
    try {
      // Create auth user via edge function
      const { data, error } = await supabase.functions.invoke('create-reseller-customer', {
        body: {
          email: formEmail,
          password: formPassword,
          companyName: formCompany,
          contactPerson: formContact,
          phone: formPhone,
          address: formAddress,
          resellerId: reseller.id,
        },
      });

      if (error || data?.error) {
        toast({
          title: 'Fel',
          description: data?.error || error?.message || 'Kunde inte skapa kund.',
          variant: 'destructive',
        });
      } else {
        toast({ title: 'Kund skapad', description: `${formCompany} har lagts till.` });
        resetForm();
        setShowAddDialog(false);
        fetchCustomers();
      }
    } catch (err) {
      toast({ title: 'Fel', description: 'Något gick fel.', variant: 'destructive' });
    } finally {
      setCreating(false);
    }
  };

  const handleSelectCustomer = async (customer: ResellerCustomer) => {
    setSelectedCustomer(customer);
    await fetchCustomerPrices(customer.id);
  };

  const getStandardPrice = (productId: string, size: string | null): number | null => {
    const p = standardPrices.find(sp => sp.product_id === productId && sp.size === size);
    return p ? p.price : null;
  };

  const getCustomerPrice = (productId: string, size: string | null): string => {
    const p = customerPrices.find(cp => cp.product_id === productId && cp.size === size);
    return p ? p.price.toString() : '';
  };

  const handleCustomerPriceChange = async (productId: string, size: string | null, value: string) => {
    if (!selectedCustomer) return;
    const price = parseFloat(value);
    if (isNaN(price) || price < 0) return;

    const existing = customerPrices.find(cp => cp.product_id === productId && cp.size === size);

    if (existing) {
      const { error } = await supabase
        .from('reseller_customer_prices')
        .update({ price })
        .eq('id', existing.id);
      if (error) {
        toast({ title: 'Fel', description: 'Kunde inte uppdatera.', variant: 'destructive' });
        return;
      }
    } else {
      const { error } = await supabase
        .from('reseller_customer_prices')
        .insert({
          reseller_customer_id: selectedCustomer.id,
          product_id: productId,
          price,
          size,
        });
      if (error) {
        toast({ title: 'Fel', description: 'Kunde inte spara.', variant: 'destructive' });
        return;
      }
    }

    await fetchCustomerPrices(selectedCustomer.id);
    toast({ title: 'Sparat', description: 'Kundpriset har sparats.' });
  };

  const categoryLabels: Record<string, string> = {
    fruktkorgar: 'Fruktkorgar', fruktpasar: 'Fruktpåsar', lask: 'Läsk',
    mejeri: 'Mejeri', kaffe: 'Kaffe & Te', frukost: 'Frukost',
    snacks: 'Snacks', grönsaker: 'Grönsaker', stad: 'Städ', annat: 'Annat',
  };

  // Customer price view
  if (selectedCustomer) {
    const groupedProducts = products.reduce<Record<string, Product[]>>((acc, p) => {
      if (!acc[p.category]) acc[p.category] = [];
      acc[p.category].push(p);
      return acc;
    }, {});

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => setSelectedCustomer(null)}>
            <ChevronLeft className="w-4 h-4 mr-1" /> Tillbaka
          </Button>
          <h2 className="text-lg font-semibold">{selectedCustomer.company_name} – Kundspecifika priser</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Lämna tomt för att använda ditt standardpris. Fyll i bara om denna kund ska ha ett annat pris.
        </p>

        {Object.entries(groupedProducts).map(([category, prods]) => {
          const hasStandard = prods.some(p => {
            const sizes = Object.keys(p.prices);
            if (sizes.length > 1) return sizes.some(s => getStandardPrice(p.id, s) !== null);
            return getStandardPrice(p.id, null) !== null;
          });
          if (!hasStandard) return null;

          return (
            <Card key={category}>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produkt</TableHead>
                      <TableHead>Standardpris</TableHead>
                      <TableHead>Kundpris (kr)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {prods.map(product => {
                      const sizes = Object.keys(product.prices);
                      if (sizes.length > 1) {
                        return sizes.map(size => {
                          const sp = getStandardPrice(product.id, size);
                          if (sp === null) return null;
                          return (
                            <TableRow key={`${product.id}-${size}`}>
                              <TableCell>
                                <div>{product.name}</div>
                                <div className="text-xs text-muted-foreground">{size}</div>
                              </TableCell>
                              <TableCell>{sp} kr</TableCell>
                              <TableCell className="w-32">
                                <Input
                                  type="number" min="0" step="1" placeholder={`${sp}`}
                                  defaultValue={getCustomerPrice(product.id, size)}
                                  onBlur={(e) => { if (e.target.value) handleCustomerPriceChange(product.id, size, e.target.value); }}
                                  className="w-24 h-8 text-sm"
                                />
                              </TableCell>
                            </TableRow>
                          );
                        });
                      }
                      const sp = getStandardPrice(product.id, null);
                      if (sp === null) return null;
                      return (
                        <TableRow key={product.id}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{sp} kr</TableCell>
                          <TableCell className="w-32">
                            <Input
                              type="number" min="0" step="1" placeholder={`${sp}`}
                              defaultValue={getCustomerPrice(product.id, null)}
                              onBlur={(e) => { if (e.target.value) handleCustomerPriceChange(product.id, null, e.target.value); }}
                              className="w-24 h-8 text-sm"
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }

  // Customer list view
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Kunder</h2>
        <Dialog open={showAddDialog} onOpenChange={(open) => { setShowAddDialog(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Ny kund</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Skapa ny kund</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <Label>Företagsnamn *</Label>
                <Input value={formCompany} onChange={(e) => setFormCompany(e.target.value)} placeholder="Företag AB" />
              </div>
              <div>
                <Label>Kontaktperson</Label>
                <Input value={formContact} onChange={(e) => setFormContact(e.target.value)} placeholder="Namn" />
              </div>
              <div>
                <Label>E-post *</Label>
                <Input type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} placeholder="kund@foretag.se" />
              </div>
              <div>
                <Label>Lösenord *</Label>
                <Input type="text" value={formPassword} onChange={(e) => setFormPassword(e.target.value)} placeholder="Minst 6 tecken" />
              </div>
              <div>
                <Label>Telefon</Label>
                <Input value={formPhone} onChange={(e) => setFormPhone(e.target.value)} placeholder="08-123 456" />
              </div>
              <div>
                <Label>Adress</Label>
                <Input value={formAddress} onChange={(e) => setFormAddress(e.target.value)} placeholder="Gata, stad" />
              </div>
              <Button onClick={handleCreateCustomer} disabled={creating} className="w-full">
                {creating ? 'Skapar...' : 'Skapa kund'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p className="text-muted-foreground text-sm">Laddar...</p>
      ) : customers.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Inga kunder ännu. Klicka "Ny kund" för att skapa den första.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {customers.map(customer => (
            <Card key={customer.id}>
              <CardContent className="flex items-center justify-between py-4">
                <div>
                  <div className="font-medium flex items-center gap-2">
                    {customer.company_name}
                    <Badge variant={customer.active ? 'default' : 'secondary'}>
                      {customer.active ? 'Aktiv' : 'Inaktiv'}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {customer.contact_person && <span>{customer.contact_person} · </span>}
                    {customer.email}
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleSelectCustomer(customer)}>
                  <Pencil className="w-4 h-4 mr-1" /> Priser
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResellerCustomerManagement;
