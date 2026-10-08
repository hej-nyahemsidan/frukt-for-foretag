import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GripVertical, Save, Trash2, Pencil } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export interface Product {
  id: string;
  name: string;
  category: string;
  image_url: string;
  prices: Record<string, number>;
  description?: string | null;
}

interface SortableProductCardProps {
  product: Product;
  editingDescriptions: Record<string, string>;
  editingPrices: Record<string, Record<string, string | number>>;
  onDescriptionChange: (productId: string, value: string) => void;
  onDescriptionSave: (productId: string, description: string) => void;
  onPriceChange: (productId: string, size: string, value: string) => void;
  onPriceSave: (productId: string, size: string, price: number) => void;
  onDelete: (productId: string) => void;
  onUpdateProduct: (productId: string, fields: { name: string; description: string | null; category: string; image_url: string }) => Promise<boolean>;
  categories: { value: string; label: string }[];
  getProductPriceSizes: (product: Product) => string[];
  getPriceLabel: (size: string) => string;
}

const SortableProductCard: React.FC<SortableProductCardProps> = ({
  product,
  editingDescriptions,
  editingPrices,
  onDescriptionChange,
  onDescriptionSave,
  onPriceChange,
  onPriceSave,
  onDelete,
  onUpdateProduct,
  categories,
  getProductPriceSizes,
  getPriceLabel,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: product.id });

  const [editOpen, setEditOpen] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', description: '', category: '', image_url: '' });
  const openEdit = () => {
    setForm({ name: product.name, description: product.description ?? '', category: product.category, image_url: product.image_url });
    setEditOpen(true);
  };
  const saveEdit = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    const ok = await onUpdateProduct(product.id, {
      name: form.name.trim(),
      description: form.description.trim() || null,
      category: form.category,
      image_url: form.image_url.trim(),
    });
    setSaving(false);
    if (ok) setEditOpen(false);
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card className={`overflow-hidden flex flex-col max-w-[280px] ${isDragging ? 'shadow-2xl ring-2 ring-primary' : ''}`}>
        {/* Drag handle */}
        <div 
          {...attributes} 
          {...listeners}
          className="flex items-center justify-center py-1.5 bg-muted/50 cursor-grab active:cursor-grabbing hover:bg-muted transition-colors border-b"
        >
          <GripVertical className="w-4 h-4 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground ml-1">Dra för att sortera</span>
        </div>
        
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
            <Button variant="outline" size="sm" onClick={openEdit} className="ml-1 h-6 w-6 p-0 flex-shrink-0" aria-label="Redigera produkt">
              <Pencil className="w-2.5 h-2.5" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(product.id)}
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
                  onChange={(e) => onDescriptionChange(product.id, e.target.value)}
                  placeholder="Ingen beskrivning..."
                  className="w-full min-h-[32px] px-1.5 py-1 text-[10px] rounded-md border border-input bg-background resize-none"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const newDescription = editingDescriptions[product.id] ?? product.description ?? '';
                    onDescriptionSave(product.id, newDescription);
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
                    onChange={(e) => onPriceChange(product.id, size, e.target.value)}
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
                        onPriceSave(product.id, size, numericPrice);
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
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Redigera produkt</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1"><Label>Namn</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div className="space-y-1"><Label>Beskrivning</Label>
              <Textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div className="space-y-1"><Label>Kategori</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{categories.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
              </Select></div>
            <div className="space-y-1"><Label>Bildlänk</Label>
              <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>Avbryt</Button>
            <Button onClick={saveEdit} disabled={saving || !form.name.trim()}>{saving ? 'Sparar...' : 'Spara'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SortableProductCard;
