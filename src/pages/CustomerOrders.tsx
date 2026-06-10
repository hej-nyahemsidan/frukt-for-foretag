import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, ArrowLeft } from 'lucide-react';
import CustomerOrderHistory from '@/components/CustomerOrderHistory';
import { useIsMobile } from '@/hooks/use-mobile';

const CustomerOrders = () => {
  const { customer, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 sm:py-0 sm:h-16 gap-2 sm:gap-4">
            <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
              <Link to="/mina-sidor" className="flex items-center text-charcoal hover:text-secondary transition-colors">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                <span className="text-sm sm:text-base">Mina sidor</span>
              </Link>
              <div className="h-4 sm:h-6 w-px bg-gray-300 hidden sm:block"></div>
              <h1 className="text-base sm:text-lg font-semibold text-charcoal truncate">
                Mina ordrar
              </h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-end">
              {isMobile && (
                <span className="text-xs text-muted-foreground truncate max-w-32">
                  {customer?.contact_person}
                </span>
              )}
              <Button onClick={handleLogout} variant="outline" size="sm" className="flex-shrink-0">
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Logga ut</span>
                <span className="sm:hidden">Ut</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-charcoal mb-6">Mina ordrar</h1>
        <CustomerOrderHistory />
      </main>
    </div>
  );
};

export default CustomerOrders;