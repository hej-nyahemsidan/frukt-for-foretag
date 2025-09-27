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
  created_at?: string;
  updated_at?: string;
}

interface ProductFormData {
  name: string;
  category: string;
  image_url: string;
  prices: Record<string, number>;
}

const AdminProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingPrices, setEditingPrices] = useState<Record<string, Record<string, string | number>>>({});
  const [activeTab, setActiveTab] = useState('fruktkorgar');
  const { toast } = useToast();

  // Form state for adding new products
  const [newProductForm, setNewProductForm] = useState<ProductFormData>({
    name: '',
    category: 'fruktkorgar',
    image_url: '',
    prices: {}
  });

  const categories = [
    { value: 'fruktkorgar', label: 'Fruktkorgar' },
    { value: 'fruktpasar', label: 'Fruktpåsar' },
    { value: 'mejeri', label: 'Mejeri' },
    { value: 'lask', label: 'Läsk' },
    { value: 'kaffe', label: 'Kaffe & Te' },
    { value: 'annat', label: 'Annat' }
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
          prices: newProductForm.prices as Json
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
        prices: {}
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

  const getProductPriceSizes = (product: Product) => {
    if (product.category === 'fruktkorgar') {
      return ['4kg', '6kg', '9kg', '11kg'];
    }
    return ['default'];
  };

  const getPriceLabel = (size: string) => {
    if (size === 'default') return 'Styckpris';
    return size;
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
  };

  const renderProductGrid = (categoryProducts: Product[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categoryProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden">
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
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex justify-between items-start">
              <span>{product.name}</span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteProduct(product.id)}
                className="ml-2"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardTitle>
            <p className="text-sm text-gray-500 capitalize">{product.category}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getProductPriceSizes(product).map(size => (
                <div key={size} className="flex items-center justify-between gap-2">
                  <Label className="text-sm font-medium">{getPriceLabel(size)}:</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={editingPrices[product.id]?.[size] ?? product.prices[size] ?? ''}
                      onChange={(e) => handlePriceChange(product.id, size, e.target.value)}
                      className="w-20 text-sm text-right"
                    />
                    <span className="text-sm text-gray-500">kr</span>
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
                      className="p-1 h-8 w-8"
                    >
                      <Save className="w-3 h-3" />
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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Produkthantering</h2>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Lägg till produkt
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Lägg till ny produkt</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Produktnamn</Label>
                <Input
                  id="name"
                  value={newProductForm.name}
                  onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                  placeholder="T.ex. Fruktkorg Premium"
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

              <div className="flex gap-2">
                <Button onClick={handleAddProduct} className="flex-1">
                  Lägg till
                </Button>
                <Button variant="outline" onClick={() => setShowAddDialog(false)} className="flex-1">
                  Avbryt
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          {categories.map((category) => (
            <TabsTrigger key={category.value} value={category.value}>
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
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