import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, Package, Upload, X, ChevronLeft } from 'lucide-react';

interface Reseller {
  id: string;
  name: string;
  logo_url: string | null;
  domain: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  active: boolean;
  created_at: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  image_url: string;
  prices: Record<string, number>;
}

interface ResellerPrice {
  id: string;
  product_id: string;
  price: number;
  size: string | null;
}

const AdminResellerManagement = () => {
  const { toast } = useToast();
  const [resellers, setResellers] = useState<Reseller[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedReseller, setSelectedReseller] = useState<Reseller | null>(null);
  const [resellerPrices, setResellerPrices] = useState<ResellerPrice[]>([]);
  const [editingReseller, setEditingReseller] = useState<Reseller | null>(null);
  const [uploading, setUploading] = useState(false);

  // Form state
  const [formName, setFormName] = useState('');
  const [formDomain, setFormDomain] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formLogoUrl, setFormLogoUrl] = useState('');

  useEffect(() => {
    fetchResellers();
    fetchProducts();
  }, []);

  const fetchResellers = async () => {
    const { data, error } = await supabase
      .from('resellers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Fel', description: 'Kunde inte hämta återförsäljare.', variant: 'destructive' });
    } else {
      setResellers(data || []);
    }
    setLoading(false);
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('category', { ascending: true });

    if (error) return;
    setProducts(
      (data || []).map((p) => ({
        ...p,
        prices: (typeof p.prices === 'object' && p.prices !== null ? p.prices : {}) as Record<string, number>,
      }))
    );
  };

  const fetchResellerPrices = async (resellerId: string) => {
    const { data, error } = await supabase
      .from('reseller_prices')
      .select('*')
      .eq('reseller_id', resellerId);

    if (!error) {
      setResellerPrices(data || []);
    }
  };

  const resetForm = () => {
    setFormName('');
    setFormDomain('');
    setFormEmail('');
    setFormPhone('');
    setFormLogoUrl('');
    setEditingReseller(null);
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `reseller-logo-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(fileName, file);

    if (uploadError) {
      toast({ title: 'Fel', description: 'Kunde inte ladda upp logotyp.', variant: 'destructive' });
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName);

    setFormLogoUrl(urlData.publicUrl);
    setUploading(false);
  };

  const handleAddReseller = async () => {
    if (!formName.trim()) {
      toast({ title: 'Fel', description: 'Namn krävs.', variant: 'destructive' });
      return;
    }

    const payload = {
      name: formName.trim(),
      domain: formDomain.trim() || null,
      contact_email: formEmail.trim() || null,
      contact_phone: formPhone.trim() || null,
      logo_url: formLogoUrl || null,
    };

    if (editingReseller) {
      const { error } = await supabase
        .from('resellers')
        .update(payload)
        .eq('id', editingReseller.id);

      if (error) {
        toast({ title: 'Fel', description: 'Kunde inte uppdatera.', variant: 'destructive' });
      } else {
        toast({ title: 'Uppdaterad', description: `${formName} har uppdaterats.` });
      }
    } else {
      const { error } = await supabase
        .from('resellers')
        .insert(payload);

      if (error) {
        toast({ title: 'Fel', description: 'Kunde inte lägga till.', variant: 'destructive' });
      } else {
        toast({ title: 'Tillagd', description: `${formName} har lagts till.` });
      }
    }

    resetForm();
    setShowAddDialog(false);
    fetchResellers();
  };

  const handleDeleteReseller = async (id: string, name: string) => {
    if (!confirm(`Är du säker på att du vill ta bort ${name}?`)) return;

    const { error } = await supabase.from('resellers').delete().eq('id', id);
    if (error) {
      toast({ title: 'Fel', description: 'Kunde inte ta bort.', variant: 'destructive' });
    } else {
      toast({ title: 'Borttagen', description: `${name} har tagits bort.` });
      fetchResellers();
    }
  };

  const handleEditClick = (reseller: Reseller) => {
    setEditingReseller(reseller);
    setFormName(reseller.name);
    setFormDomain(reseller.domain || '');
    setFormEmail(reseller.contact_email || '');
    setFormPhone(reseller.contact_phone || '');
    setFormLogoUrl(reseller.logo_url || '');
    setShowAddDialog(true);
  };

  const handleSelectReseller = async (reseller: Reseller) => {
    setSelectedReseller(reseller);
    await fetchResellerPrices(reseller.id);
  };

  const handlePriceChange = async (productId: string, size: string | null, newPrice: string) => {
    if (!selectedReseller) return;
    const price = parseFloat(newPrice);
    if (isNaN(price) || price < 0) return;

    const existing = resellerPrices.find(
      (rp) => rp.product_id === productId && rp.size === size
    );

    if (existing) {
      const { error } = await supabase
        .from('reseller_prices')
        .update({ price })
        .eq('id', existing.id);

      if (error) {
        toast({ title: 'Fel', description: 'Kunde inte uppdatera pris.', variant: 'destructive' });
        return;
      }
    } else {
      const { error } = await supabase
        .from('reseller_prices')
        .insert({
          reseller_id: selectedReseller.id,
          product_id: productId,
          price,
          size,
        });

      if (error) {
        toast({ title: 'Fel', description: 'Kunde inte spara pris.', variant: 'destructive' });
        return;
      }
    }

    await fetchResellerPrices(selectedReseller.id);
    toast({ title: 'Sparat', description: 'Inköpspriset har sparats.' });
  };

  const getResellerPrice = (productId: string, size: string | null): string => {
    const rp = resellerPrices.find(
      (p) => p.product_id === productId && p.size === size
    );
    return rp ? rp.price.toString() : '';
  };

  const groupedProducts = products.reduce<Record<string, Product[]>>((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {});

  const categoryLabels: Record<string, string> = {
    fruktkorgar: 'Fruktkorgar',
    fruktpasar: 'Fruktpåsar',
    lask: 'Läsk',
    mejeri: 'Mejeri',
    kaffe: 'Kaffe & Te',
    frukost: 'Frukost',
    snacks: 'Snacks',
    grönsaker: 'Grönsaker',
    stad: 'Städ',
    annat: 'Annat',
  };

  // Price setting view for a specific reseller
  if (selectedReseller) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => setSelectedReseller(null)}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Tillbaka
          </Button>
          <div className="flex items-center gap-3">
            {selectedReseller.logo_url && (
              <img
                src={selectedReseller.logo_url}
                alt={selectedReseller.name}
                className="w-8 h-8 object-contain rounded"
              />
            )}
            <h2 className="text-xl font-semibold">{selectedReseller.name} – Inköpspriser</h2>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Sätt det pris som {selectedReseller.name} betalar till er per produkt. Lämna tomt om produkten inte ska vara tillgänglig för denna ÅF.
        </p>

        {Object.entries(groupedProducts).map(([category, prods]) => (
          <Card key={category}>
            <CardHeader className="py-3">
              <CardTitle className="text-base">{categoryLabels[category] || category}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Bild</TableHead>
                    <TableHead>Produkt</TableHead>
                    <TableHead>Ert pris (kr)</TableHead>
                    <TableHead>ÅF inköpspris (kr)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prods.map((product) => {
                    const sizes = Object.keys(product.prices);
                    if (sizes.length > 1) {
                      return sizes.map((size) => (
                        <TableRow key={`${product.id}-${size}`}>
                          <TableCell>
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded"
                              onError={(e) => { (e.target as HTMLImageElement).src = '/assets/product-placeholder.jpg'; }}
                            />
                          </TableCell>
                          <TableCell>
                            <div>{product.name}</div>
                            <div className="text-xs text-muted-foreground">{size}</div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {product.prices[size]} kr
                          </TableCell>
                          <TableCell className="w-32">
                            <Input
                              type="number"
                              min="0"
                              step="1"
                              placeholder="—"
                              defaultValue={getResellerPrice(product.id, size)}
                              onBlur={(e) => {
                                if (e.target.value) handlePriceChange(product.id, size, e.target.value);
                              }}
                              className="w-24 h-8 text-sm"
                            />
                          </TableCell>
                        </TableRow>
                      ));
                    }

                    const defaultPrice = Object.values(product.prices)[0];
                    return (
                      <TableRow key={product.id}>
                        <TableCell>
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded"
                            onError={(e) => { (e.target as HTMLImageElement).src = '/assets/product-placeholder.jpg'; }}
                          />
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {defaultPrice} kr
                        </TableCell>
                        <TableCell className="w-32">
                          <Input
                            type="number"
                            min="0"
                            step="1"
                            placeholder="—"
                            defaultValue={getResellerPrice(product.id, null)}
                            onBlur={(e) => {
                              if (e.target.value) handlePriceChange(product.id, null, e.target.value);
                            }}
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
        ))}
      </div>
    );
  }

  // Main reseller list view
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Återförsäljare</h2>
        <Dialog open={showAddDialog} onOpenChange={(open) => { setShowAddDialog(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button size="sm" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Lägg till ÅF
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{editingReseller ? 'Redigera återförsäljare' : 'Lägg till återförsäljare'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="reseller-name">Företagsnamn *</Label>
                <Input
                  id="reseller-name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="House of Service"
                />
              </div>
              <div>
                <Label htmlFor="reseller-domain">Domän</Label>
                <Input
                  id="reseller-domain"
                  value={formDomain}
                  onChange={(e) => setFormDomain(e.target.value)}
                  placeholder="bestall.houseofservice.se"
                />
              </div>
              <div>
                <Label htmlFor="reseller-email">E-post</Label>
                <Input
                  id="reseller-email"
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="info@houseofservice.se"
                />
              </div>
              <div>
                <Label htmlFor="reseller-phone">Telefon</Label>
                <Input
                  id="reseller-phone"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  placeholder="08-123 456 78"
                />
              </div>
              <div>
                <Label>Logotyp</Label>
                {formLogoUrl ? (
                  <div className="flex items-center gap-3 mt-1">
                    <img src={formLogoUrl} alt="Logo" className="w-16 h-16 object-contain rounded border" />
                    <Button variant="ghost" size="sm" onClick={() => setFormLogoUrl('')}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="mt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-primary hover:underline">
                      <Upload className="w-4 h-4" />
                      {uploading ? 'Laddar upp...' : 'Ladda upp logotyp'}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoUpload}
                        disabled={uploading}
                      />
                    </label>
                  </div>
                )}
              </div>
              <Button onClick={handleAddReseller} className="w-full">
                {editingReseller ? 'Spara ändringar' : 'Lägg till'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p className="text-muted-foreground text-sm">Laddar...</p>
      ) : resellers.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Inga återförsäljare ännu. Klicka "Lägg till ÅF" för att börja.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {resellers.map((reseller) => (
            <Card key={reseller.id}>
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  {reseller.logo_url ? (
                    <img
                      src={reseller.logo_url}
                      alt={reseller.name}
                      className="w-12 h-12 object-contain rounded border"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-muted rounded border flex items-center justify-center text-muted-foreground text-xs">
                      Logo
                    </div>
                  )}
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {reseller.name}
                      <Badge variant={reseller.active ? 'default' : 'secondary'}>
                        {reseller.active ? 'Aktiv' : 'Inaktiv'}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-x-3">
                      {reseller.domain && <span>{reseller.domain}</span>}
                      {reseller.contact_email && <span>{reseller.contact_email}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSelectReseller(reseller)}
                    className="flex items-center gap-1"
                  >
                    <Package className="w-4 h-4" />
                    <span className="hidden sm:inline">Inköpspriser</span>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEditClick(reseller)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteReseller(reseller.id, reseller.name)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminResellerManagement;
