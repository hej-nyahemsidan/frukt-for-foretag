import { useState, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Save, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ImageUpload } from '@/components/ui/image-upload';
import type { Json } from '@/integrations/supabase/types';

interface Product {
  id: string;
  name: string;
  category: string;
  image_url: string;
  prices: Record<string, number>;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

interface ProductFormData {
  name: string;
  category: string;
  image_url: string;
  prices: Record<string, number>;
  description: string;
}

const AdminProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingPrices, setEditingPrices] = useState<Record<string, Record<string, string | number>>>({});
  const [editingDescriptions, setEditingDescriptions] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState('fruktkorgar');
  const { toast } = useToast();

  // Form state for adding new products
  const [newProductForm, setNewProductForm] = useState<ProductFormData>({
    name: '',
    category: 'fruktkorgar',
    image_url: '',
    prices: {},
    description: ''
  });

  const categories = [
    { value: 'fruktkorgar', label: 'Fruktkorgar' },
    { value: 'fruktpasar', label: 'Fruktpåsar' },
    { value: 'mejeri', label: 'Mejeri' },
    { value: 'lask', label: 'Läsk' },
    { value: 'kaffe', label: 'Kaffe & Te' },
    { value: 'annat', label: 'Skafferi' },
    { value: 'gronsaker', label: 'Grönsaker' },
    { value: 'stad', label: 'Städ' }
  ];

  const sizeOptions = ['4kg', '6kg', '9kg', '11kg'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');

      if (error) throw error;
      
      // Type assertion to handle Json type from Supabase
      const typedProducts: Product[] = (data || []).map(product => ({
        ...product,
        prices: product.prices as Record<string, number>
      }));
      
      setProducts(typedProducts);
    } catch (error) {
      toast({
        title: 'Fel',
        description: 'Kunde inte hämta produkter.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePrice = async (productId: string, size: string, newPrice: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const updatedPrices = { ...product.prices, [size]: newPrice };

    try {
      const { error } = await supabase
        .from('products')
        .update({ prices: updatedPrices as Json })
        .eq('id', productId);

      if (error) throw error;

      setProducts(products.map(p => 
        p.id === productId 
          ? { ...p, prices: updatedPrices }
          : p
      ));

      // Clear editing state for this product
      setEditingPrices(prev => {
        const updated = { ...prev };
        if (updated[productId]) {
          delete updated[productId][size];
          if (Object.keys(updated[productId]).length === 0) {
            delete updated[productId];
          }
        }
        return updated;
      });

      toast({
        title: 'Sparat',
        description: 'Priset har uppdaterats.',
      });
    } catch (error) {
      toast({
        title: 'Fel',
        description: 'Kunde inte uppdatera priset.',
        variant: 'destructive',
      });
    }
  };

  const handleAddProduct = async () => {
    if (!newProductForm.name || !newProductForm.image_url) {
      toast({
        title: 'Fel',
        description: 'Namn och bild-URL är obligatoriska.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          name: newProductForm.name,
          category: newProductForm.category,
          image_url: newProductForm.image_url,
          prices: newProductForm.prices as Json,
          description: newProductForm.description || null
        }])
        .select()
        .single();

      if (error) throw error;

      const newProduct: Product = {
        ...data,
        prices: data.prices as Record<string, number>
      };

      setProducts([...products, newProduct]);
      setNewProductForm({
        name: '',
        category: 'fruktkorgar',
        image_url: '',
        prices: {},
        description: ''
      });
      setShowAddDialog(false);

      toast({
        title: 'Tillagd',
        description: 'Produkten har lagts till.',
      });
    } catch (error) {
      toast({
        title: 'Fel',
        description: 'Kunde inte lägga till produkten.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm('Är du säker på att du vill ta bort denna produkt?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      setProducts(products.filter(p => p.id !== productId));
      toast({
        title: 'Borttagen',
        description: 'Produkten har tagits bort.',
      });
    } catch (error) {
      toast({
        title: 'Fel',
        description: 'Kunde inte ta bort produkten.',
        variant: 'destructive',
      });
    }
  };

  const handlePriceChange = (productId: string, size: string, value: string) => {
    setEditingPrices(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [size]: value === '' ? '' : parseFloat(value) || 0
      }
    }));
  };

  const handleUpdateDescription = async (productId: string, newDescription: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ description: newDescription || null })
        .eq('id', productId);

      if (error) throw error;

      setProducts(products.map(p => 
        p.id === productId 
          ? { ...p, description: newDescription }
          : p
      ));

      setEditingDescriptions(prev => {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      });

      toast({
        title: 'Sparat',
        description: 'Beskrivningen har uppdaterats.',
      });
    } catch (error) {
      toast({
        title: 'Fel',
        description: 'Kunde inte uppdatera beskrivningen.',
        variant: 'destructive',
      });
    }
  };

  const getProductPriceSizes = (product: Product) => {
    if (product.category === 'fruktkorgar') {
      return ['4kg', '6kg', '9kg', '11kg'];
    }
    if (product.category === 'gronsaker') {
      return ['styck', 'pase'];
    }
    return ['default'];
  };

  const getPriceLabel = (size: string) => {
    if (size === 'default') return 'Styckpris';
    if (size === 'styck') return 'Styck';
    if (size === 'pase') return 'Påse';
    return size;
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
  };

  const renderProductGrid = (categoryProducts: Product[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
      {categoryProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden flex flex-col max-w-[280px]">
          <div className="aspect-square bg-gray-100 overflow-hidden">
            <img 
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/assets/product-placeholder.jpg';
              }}
            />
          </div>
          <CardHeader className="pb-1 pt-2 px-3">
            <CardTitle className="text-xs flex justify-between items-start leading-tight">
              <span className="line-clamp-2">{product.name}</span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteProduct(product.id)}
                className="ml-1 h-6 w-6 p-0 flex-shrink-0"
              >
                <Trash2 className="w-2.5 h-2.5" />
              </Button>
            </CardTitle>
            <p className="text-[10px] text-gray-500 capitalize">{product.category}</p>
          </CardHeader>
          <CardContent className="pt-0 pb-2 px-3 flex-1">
            <div className="space-y-1.5">
              <div className="space-y-0.5">
                <Label className="text-[10px] font-medium">Beskrivning:</Label>
                <div className="flex items-start gap-1">
                  <textarea
                    value={editingDescriptions[product.id] ?? product.description ?? ''}
                    onChange={(e) => setEditingDescriptions(prev => ({ ...prev, [product.id]: e.target.value }))}
                    placeholder="Ingen beskrivning..."
                    className="w-full min-h-[32px] px-1.5 py-1 text-[10px] rounded-md border border-input bg-background resize-none"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const newDescription = editingDescriptions[product.id] ?? product.description ?? '';
                      handleUpdateDescription(product.id, newDescription);
                    }}
                    className="p-0.5 h-6 w-6 flex-shrink-0"
                  >
                    <Save className="w-2.5 h-2.5" />
                  </Button>
                </div>
              </div>
              {getProductPriceSizes(product).map(size => (
                <div key={size} className="flex items-center justify-between gap-0.5">
                  <Label className="text-[10px] font-medium">{getPriceLabel(size)}:</Label>
                  <div className="flex items-center gap-0.5">
                    <Input
                      type="number"
                      value={editingPrices[product.id]?.[size] ?? product.prices[size] ?? ''}
                      onChange={(e) => handlePriceChange(product.id, size, e.target.value)}
                      className="w-12 text-[10px] text-right h-6 px-1"
                    />
                    <span className="text-[10px] text-gray-500">kr</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const newPrice = editingPrices[product.id]?.[size] ?? product.prices[size];
                        const numericPrice = typeof newPrice === 'string' ? parseFloat(newPrice) || 0 : newPrice;
                        if (typeof numericPrice === 'number') {
                          handleUpdatePrice(product.id, size, numericPrice);
                        }
                      }}
                      className="p-0.5 h-6 w-6"
                    >
                      <Save className="w-2.5 h-2.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
      {categoryProducts.length === 0 && (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-500">Inga produkter i denna kategori.</p>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-lg">Laddar produkter...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Produkthantering</h2>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-3 sm:px-4 py-2 w-full sm:w-auto">
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Lägg till produkt</span>
              <span className="sm:hidden">Lägg till</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md sm:max-w-lg p-0 flex flex-col max-h-[90vh]">
            <DialogHeader className="p-4 pb-3 border-b shrink-0">
              <DialogTitle>Lägg till ny produkt</DialogTitle>
            </DialogHeader>
            
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleAddProduct();
              }}
              className="flex flex-col flex-1 min-h-0"
            >
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div>
                  <Label htmlFor="name">Produktnamn</Label>
                  <Input
                    id="name"
                    value={newProductForm.name}
                    onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                    placeholder="T.ex. Fruktkorg Premium"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Kategori</Label>
                  <Select value={newProductForm.category} onValueChange={(value) => setNewProductForm({ ...newProductForm, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Produktbild</Label>
                  <ImageUpload
                    value={newProductForm.image_url}
                    onChange={(url) => setNewProductForm({ ...newProductForm, image_url: url })}
                    onRemove={() => setNewProductForm({ ...newProductForm, image_url: '' })}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Beskrivning (valfri)</Label>
                  <textarea
                    id="description"
                    value={newProductForm.description}
                    onChange={(e) => setNewProductForm({ ...newProductForm, description: e.target.value })}
                    placeholder="Produktbeskrivning..."
                    className="w-full min-h-[80px] px-3 py-2 text-sm rounded-md border border-input bg-background"
                  />
                </div>

                <div>
                  <Label>Priser</Label>
                  {newProductForm.category === 'fruktkorgar' ? (
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Viktbaserade priser för fruktkorgar</p>
                      <div className="grid grid-cols-2 gap-2 p-3 bg-muted/50 rounded-md">
                        {sizeOptions.map(size => (
                          <div key={size} className="flex items-center space-x-2">
                            <Label className="w-10 text-sm font-medium">{size}:</Label>
                            <Input
                              type="number"
                              value={newProductForm.prices[size] || ''}
                              onChange={(e) => setNewProductForm({
                                ...newProductForm,
                                prices: { ...newProductForm.prices, [size]: e.target.value === '' ? 0 : parseFloat(e.target.value) || 0 }
                              })}
                              placeholder="0"
                              className="text-sm"
                            />
                            <span className="text-xs text-muted-foreground">kr</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : newProductForm.category === 'gronsaker' ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Typ</Label>
                        <Select
                          value={newProductForm.prices['styck'] ? 'styck' : newProductForm.prices['pase'] ? 'pase' : 'styck'}
                          onValueChange={(value) => {
                            const currentPrice = newProductForm.prices['styck'] || newProductForm.prices['pase'] || 0;
                            setNewProductForm({
                              ...newProductForm,
                              prices: { [value]: currentPrice }
                            });
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Välj typ" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="styck">Styck</SelectItem>
                            <SelectItem value="pase">Påse</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Pris</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            value={newProductForm.prices['styck'] || newProductForm.prices['pase'] || ''}
                            onChange={(e) => {
                              const type = newProductForm.prices['styck'] !== undefined ? 'styck' : 'pase';
                              const activeType = newProductForm.prices['styck'] ? 'styck' : newProductForm.prices['pase'] ? 'pase' : 'styck';
                              setNewProductForm({
                                ...newProductForm,
                                prices: { [activeType]: e.target.value === '' ? 0 : parseFloat(e.target.value) || 0 }
                              });
                            }}
                            placeholder="0"
                            className="text-sm"
                          />
                          <span className="text-xs text-muted-foreground">kr</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Styckpris för enskilda produkter</p>
                      <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-md">
                        <Label className="text-sm font-medium">Styckpris:</Label>
                        <Input
                          type="number"
                          value={newProductForm.prices['default'] || ''}
                          onChange={(e) => setNewProductForm({
                            ...newProductForm,
                            prices: { 'default': e.target.value === '' ? 0 : parseFloat(e.target.value) || 0 }
                          })}
                          placeholder="0"
                          className="text-sm flex-1"
                        />
                        <span className="text-sm text-muted-foreground">kr per styck</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border-t bg-background p-3 shrink-0 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddDialog(false)}
                >
                  Avbryt
                </Button>
                <Button type="submit">
                  Lägg till
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="grid w-full min-w-max sm:min-w-0 grid-cols-4 sm:grid-cols-8 h-auto">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.value} 
                value={category.value}
                className="text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        {categories.map((category) => (
          <TabsContent key={category.value} value={category.value} className="mt-6">
            {renderProductGrid(getProductsByCategory(category.value))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AdminProductManagement;