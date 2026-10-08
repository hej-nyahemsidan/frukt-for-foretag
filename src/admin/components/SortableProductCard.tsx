import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GripVertical, Save, Trash2, Pencil, FolderInput } from 'lucide-react';
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
  display_order?: number | null;
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
  onMoveProduct: (productId: string, targetCategory: string, prices: Record<string, number>) => Promise<boolean>;
  categories: { value: string; label: string }[];
  getProductPriceSizes: (product: Product) => string[];
  getPriceSizesForCategory: (category: string) => string[];
  getPriceLabel: (size: string) => string;
}

const categoryLabel = (categories: { value: string; label: string }[], value: string) =>
  categories.find((c) => c.value === value)?.label ?? value;

/** Tar reda på ett pris som går att använda som utgångsläge i en ny kategori. */
const fallbackPrice = (product: Product): string => {
  const preferred = ['4kg', 'styck', 'default'];
  for (const key of preferred) {
    if (product.prices?.[key] !== undefined) return String(product.prices[key]);
  }
  const first = Object.values(product.prices ?? {})[0];
  return first === undefined ? '' : String(first);
};

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
  onMoveProduct,
  categories,
  getProductPriceSizes,
  getPriceSizesForCategory,
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
  const [editPrices, setEditPrices] = React.useState<Record<string, string>>({});

  const [moveOpen, setMoveOpen] = React.useState(false);
  const [moving, setMoving] = React.useState(false);
  const [moveTarget, setMoveTarget] = React.useState('');
  const [movePrices, setMovePrices] = React.useState<Record<string, string>>({});

  /** Förifyll priser för en kategori: befintligt pris, annars produktens nuvarande pris på första fältet. */
  const draftFor = (category: string): Record<string, string> => {
    const sizes = getPriceSizesForCategory(category);
    const draft: Record<string, string> = {};
    sizes.forEach((size, index) => {
      const existing = product.prices?.[size];
      if (existing !== undefined) {
        draft[size] = String(existing);
      } else {
        draft[size] = index === 0 ? fallbackPrice(product) : '';
      }
    });
    return draft;
  };

  const openEdit = () => {
    setForm({ name: product.name, description: product.description ?? '', category: product.category, image_url: product.image_url });
    setEditPrices({});
    setEditOpen(true);
  };

  const changeEditCategory = (value: string) => {
    setForm((prev) => ({ ...prev, category: value }));
    setEditPrices(value === product.category ? {} : draftFor(value));
  };

  const editSizes = form.category === product.category ? [] : getPriceSizesForCategory(form.category);
  const editPricesReady = editSizes.every((size) => {
    const raw = editPrices[size];
    return raw !== undefined && raw !== '' && !isNaN(Number(raw)) && Number(raw) >= 0;
  });

  const saveEdit = async () => {
    if (!form.name.trim() || !editPricesReady) return;
    setSaving(true);
    const mergedPrices: Record<string, number> = { ...product.prices };
    if (editSizes.length > 0) {
      editSizes.forEach((size) => {
        mergedPrices[size] = Number(editPrices[size]);
      });
    }
    const fields: { name: string; description: string | null; category: string; image_url: string; prices?: Record<string, number> } = {
      name: form.name.trim(),
      description: form.description.trim() || null,
      category: form.category,
      image_url: form.image_url.trim(),
    };
    if (editSizes.length > 0) fields.prices = mergedPrices;
    const ok = await onUpdateProduct(product.id, fields);
    setSaving(false);
    if (ok) setEditOpen(false);
  };

  const openMove = () => {
    setMoveTarget('');
    setMovePrices({});
    setMoveOpen(true);
  };

  const chooseMoveTarget = (value: string) => {
    setMoveTarget(value);
    setMovePrices(draftFor(value));
  };

  const moveSizes = moveTarget ? getPriceSizesForCategory(moveTarget) : [];
  const moveReady =
    moveTarget !== '' &&
    moveTarget !== product.category &&
    moveSizes.every((size) => {
      const raw = movePrices[size];
      return raw !== undefined && raw !== '' && !isNaN(Number(raw)) && Number(raw) >= 0;
    });

  const confirmMove = async () => {
    if (!moveReady) return;
    setMoving(true);
    const mergedPrices: Record<string, number> = { ...product.prices };
    moveSizes.forEach((size) => {
      mergedPrices[size] = Number(movePrices[size]);
    });
    const ok = await onMoveProduct(product.id, moveTarget, mergedPrices);
    setMoving(false);
    if (ok) setMoveOpen(false);
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  const renderPriceInputs = (
    sizes: string[],
    values: Record<string, string>,
    onChange: (size: string, value: string) => void,
  ) => (
    <div className="grid grid-cols-2 gap-2 p-3 bg-muted/50 rounded-md">
      {sizes.map((size) => (
        <div key={size} className="flex items-center gap-2">
          <Label className="text-xs font-medium whitespace-nowrap">{getPriceLabel(size)}:</Label>
          <Input
            type="number"
            min="0"
            value={values[size] ?? ''}
            onChange={(e) => onChange(size, e.target.value)}
            placeholder="0"
            className="h-8 text-sm"
          />
          <span className="text-xs text-muted-foreground">kr</span>
        </div>
      ))}
    </div>
  );

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
              variant="outline"
              size="sm"
              onClick={openMove}
              className="ml-1 h-6 w-6 p-0 flex-shrink-0"
              aria-label="Flytta till annan kategori"
              title="Flytta till annan kategori"
            >
              <FolderInput className="w-2.5 h-2.5" />
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
          <p className="text-[10px] text-gray-500">{categoryLabel(categories, product.category)}</p>
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
              <Select value={form.category} onValueChange={changeEditCategory}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{categories.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
              </Select></div>
            {editSizes.length > 0 && (
              <div className="space-y-1">
                <Label>Priser i {categoryLabel(categories, form.category)}</Label>
                <p className="text-xs text-muted-foreground">
                  Fyll i pris för varje storlek som visas i den nya kategorin.
                </p>
                {renderPriceInputs(editSizes, editPrices, (size, value) => setEditPrices((prev) => ({ ...prev, [size]: value })))}
              </div>
            )}
            <div className="space-y-1"><Label>Bildlänk</Label>
              <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>Avbryt</Button>
            <Button onClick={saveEdit} disabled={saving || !form.name.trim() || !editPricesReady}>
              {saving ? 'Sparar...' : 'Spara'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={moveOpen} onOpenChange={setMoveOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Flytta produkt</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{product.name}</span> ligger just nu i{' '}
              <span className="font-medium text-foreground">{categoryLabel(categories, product.category)}</span>.
            </p>
            <div className="space-y-1">
              <Label>NY kategori</Label>
              <Select value={moveTarget} onValueChange={chooseMoveTarget}>
                <SelectTrigger><SelectValue placeholder="Välj kategori" /></SelectTrigger>
                <SelectContent>
                  {categories
                    .filter((c) => c.value !== product.category)
                    .map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            {moveTarget && moveSizes.length > 0 && (
              <div className="space-y-1">
                <Label>Priser i {categoryLabel(categories, moveTarget)}</Label>
                <p className="text-xs text-muted-foreground">
                  Kontrollera att priserna stämmer för den nya kategorin.
                </p>
                {renderPriceInputs(moveSizes, movePrices, (size, value) => setMovePrices((prev) => ({ ...prev, [size]: value })))}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Produkten hamnar sist i listan i den nya kategorin och kan sorteras om med draghandtaget.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMoveOpen(false)}>Avbryt</Button>
            <Button onClick={confirmMove} disabled={!moveReady || moving}>
              {moving ? 'Flyttar...' : 'Flytta produkt'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SortableProductCard;
