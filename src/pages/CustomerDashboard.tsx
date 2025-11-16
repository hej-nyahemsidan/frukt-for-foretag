import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, ArrowLeft } from 'lucide-react';
import OrderSidebar from '@/components/OrderSidebar';
import ProductDisplay from '@/components/ProductDisplay';
import SimplifiedCheckout from '@/components/SimplifiedCheckout';
import { useIsMobile } from '@/hooks/use-mobile';

const CustomerDashboard = () => {
  const { user, customer, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [packagePlan, setPackagePlan] = useState('weekly');
  const [orderType, setOrderType] = useState('subscription');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [currentDay, setCurrentDay] = useState<string>(''); // Active day for adding products
  const [activeCategory, setActiveCategory] = useState('fruktkorgar');
  const [showCheckout, setShowCheckout] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleBackFromCheckout = () => {
    setShowCheckout(false);
  };

  if (showCheckout) {
    return (
      <div className="min-h-screen bg-background">
        {/* Simple Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 sm:py-0 sm:h-16 gap-2 sm:gap-4">
              <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
                <Link to="/" className="flex items-center text-charcoal hover:text-secondary transition-colors">
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                  <span className="text-sm sm:text-base">Hem</span>
                </Link>
                <div className="h-4 sm:h-6 w-px bg-gray-300 hidden sm:block"></div>
                <h1 className="text-base sm:text-lg font-semibold text-charcoal truncate">
                  Slutför beställning
                </h1>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-xs sm:text-sm text-muted-foreground truncate max-w-32 sm:max-w-none">
                  {customer?.contact_person}
                </span>
                <Button 
                  onClick={handleLogout}
                  variant="outline"
                  size={isMobile ? "sm" : "sm"}
                  className="flex-shrink-0"
                >
                  <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Logga ut</span>
                  <span className="sm:hidden">Ut</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <SimplifiedCheckout 
            packagePlan={packagePlan}
            orderType={orderType}
            selectedDays={selectedDays}
            currentDay={currentDay}
            onBack={handleBackFromCheckout}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Simple Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 sm:py-0 sm:h-16 gap-2 sm:gap-4">
            <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
              <Link to="/" className="flex items-center text-charcoal hover:text-secondary transition-colors">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                <span className="text-sm sm:text-base">Hem</span>
              </Link>
              <div className="h-4 sm:h-6 w-px bg-gray-300 hidden sm:block"></div>
              <h1 className="text-base sm:text-lg font-semibold text-charcoal truncate">
                {isMobile ? 'Mina Sidor' : `Mina Sidor - ${customer?.contact_person}`}
              </h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-end">
              {isMobile && (
                <span className="text-xs text-muted-foreground truncate max-w-32">
                  {customer?.contact_person}
                </span>
              )}
              <Button 
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex-shrink-0"
              >
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Logga ut</span>
                <span className="sm:hidden">Ut</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 sm:py-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-charcoal text-center mb-6 sm:mb-8">
          Beställ Fruktkorg
        </h1>
        
        <div className="flex flex-col gap-6 sm:gap-8">
          {/* Order Selection Section - Now on top */}
          <div className="w-full">
            <OrderSidebar 
              packagePlan={packagePlan}
              setPackagePlan={setPackagePlan}
              orderType={orderType}
              setOrderType={setOrderType}
              selectedDays={selectedDays}
              setSelectedDays={setSelectedDays}
              currentDay={currentDay}
              setCurrentDay={setCurrentDay}
              onCheckout={handleCheckout}
            />
          </div>
          
          {/* Products Section - Now below */}
          <div className="w-full">
            <ProductDisplay 
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory}
              selectedDays={selectedDays}
              currentDay={currentDay}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;