import { ShoppingCart, X, Plus, Minus, FileText, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePublicCart } from '@/contexts/PublicCartContext';
import { useNavigate } from 'react-router-dom';
import { trackBeginCheckout } from '@/lib/gtm';

const WEEKDAYS = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag'];

interface PublicOrderSidebarProps {
  className?: string;
}

const PublicOrderSidebar = ({ className = '' }: PublicOrderSidebarProps) => {
  const { items, getTotalItems, getTotalPrice, updateQuantity, removeItem, updateDay, clearCart } = usePublicCart();
  const navigate = useNavigate();

  const itemsByDay = items.reduce((acc, item) => {
    const day = item.day && WEEKDAYS.includes(item.day) ? item.day : 'Ej vald dag';
    if (!acc[day]) acc[day] = [];
    acc[day].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  const orderedDays = [...WEEKDAYS.filter((d) => itemsByDay[d]), ...(itemsByDay['Ej vald dag'] ? ['Ej vald dag'] : [])];

  const handleCheckout = () => {
    trackBeginCheckout(getTotalPrice(), getTotalItems());
    navigate('/kontakt');
  };

  return (
    <aside className={`rounded-xl border-2 border-primary/20 bg-card shadow-sm ${className}`}>
      <div className="flex items-center justify-between gap-2 border-b p-4">
        <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
          <ShoppingCart className="h-5 w-5 text-primary" />
          Dina varor
          {items.length > 0 && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
              {getTotalItems()}
            </span>
          )}
        </h2>
        {items.length > 0 && (
          <Button
            onClick={clearCart}
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive"
            aria-label="Töm varukorgen"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="max-h-[55vh] overflow-y-auto p-4">
        {items.length === 0 ? (
          <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
            <p className="mb-2 font-medium text-foreground">Här samlas din beställning</p>
            <p>1. Välj fruktkorg → 2. Lägg till tillbehör → 3. Välj leveransdag → 4. Skicka beställningen.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {orderedDays.map((day) => (
              <div key={day}>
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{day}</p>
                <div className="space-y-3">
                  {itemsByDay[day].map((item) => (
                    <div key={`${item.id}-${item.day}-${item.size || ''}`} className="rounded-lg border p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">{item.name}</p>
                          {item.size && <p className="text-xs text-muted-foreground">{item.size}</p>}
                        </div>
                        <button
                          onClick={() => removeItem(item.id, item.day, item.size)}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                          aria-label={`Ta bort ${item.name}`}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-2">
                        <Select
                          value={WEEKDAYS.includes(item.day || '') ? item.day! : ''}
                          onValueChange={(v) => updateDay(item.id, item.day, item.size, v)}
                        >
                          <SelectTrigger className="h-8 text-xs" aria-label={`Leveransdag för ${item.name}`}>
                            <SelectValue placeholder="Välj leveransdag" />
                          </SelectTrigger>
                          <SelectContent>
                            {WEEKDAYS.map((d) => (
                              <SelectItem key={d} value={d}>{d}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="mt-2 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.day, item.size)}
                            aria-label={`Minska antal ${item.name}`}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-9 text-center text-sm font-semibold">{item.quantity} st</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.day, item.size)}
                            aria-label={`Öka antal ${item.name}`}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="text-sm font-bold text-primary">{item.price * item.quantity} kr</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-semibold">Totalt</span>
          <span className="text-xl font-bold text-primary">{getTotalPrice()} kr</span>
        </div>
        <Button onClick={handleCheckout} size="lg" className="w-full" disabled={items.length === 0}>
          <FileText className="mr-2 h-4 w-4" />
          Skicka din beställning
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Inget köp binds här – vi bekräftar upplägget innan första leveransen.
        </p>
      </div>
    </aside>
  );
};

export default PublicOrderSidebar;
