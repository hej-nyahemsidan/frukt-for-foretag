import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Package, Users, ShoppingCart, Home } from 'lucide-react';
import { useResellerAuth } from '../contexts/ResellerAuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import ResellerProductPricing from '../components/ResellerProductPricing';
import ResellerCustomerManagement from '../components/ResellerCustomerManagement';
import ResellerOrders from '../components/ResellerOrders';

const ResellerDashboard = () => {
  const { logout, reseller, user } = useResellerAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    await logout();
    toast({ title: 'Utloggad', description: 'Du har loggats ut.' });
    navigate('/af/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              {reseller?.logo_url && (
                <img src={reseller.logo_url} alt={reseller.name} className="h-8 w-auto object-contain" />
              )}
              <span className="text-lg font-semibold text-foreground">
                {reseller?.name || 'Återförsäljare'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden sm:inline">{user?.email}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Logga ut</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="products" className="flex items-center gap-2 text-sm">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Produkter & Priser</span>
              <span className="sm:hidden">Priser</span>
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Kunder</span>
              <span className="sm:hidden">Kunder</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2 text-sm">
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Ordrar</span>
              <span className="sm:hidden">Ordrar</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <ResellerProductPricing />
          </TabsContent>
          <TabsContent value="customers">
            <ResellerCustomerManagement />
          </TabsContent>
          <TabsContent value="orders">
            <ResellerOrders />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ResellerDashboard;
