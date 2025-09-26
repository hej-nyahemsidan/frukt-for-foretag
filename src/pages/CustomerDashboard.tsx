import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, ArrowLeft } from 'lucide-react';
import OrderSidebar from '@/components/OrderSidebar';
import ProductDisplay from '@/components/ProductDisplay';
import SimplifiedCheckout from '@/components/SimplifiedCheckout';

const CustomerDashboard = () => {
  const { user, customer, logout } = useAuth();
  const navigate = useNavigate();
  const [packagePlan, setPackagePlan] = useState('weekly');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
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
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Link to="/" className="flex items-center text-charcoal hover:text-secondary transition-colors">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  <span>Hem</span>
                </Link>
                <div className="h-6 w-px bg-gray-300"></div>
                <h1 className="text-lg font-semibold text-charcoal">
                  Slutför beställning
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  {customer?.contact_person}
                </span>
                <Button 
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logga ut
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <SimplifiedCheckout 
            packagePlan={packagePlan}
            selectedDays={selectedDays}
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
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-charcoal hover:text-secondary transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span>Hem</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-lg font-semibold text-charcoal">
                Mina Sidor - {customer?.contact_person}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleLogout}
                variant="outline"
                size="sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logga ut
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-charcoal text-center mb-8">
          Beställ Fruktkorg
        </h1>
        
        <div className="flex gap-8">
          {/* Left Sidebar - 30% width */}
          <div className="w-[30%]">
            <OrderSidebar 
              packagePlan={packagePlan}
              setPackagePlan={setPackagePlan}
              selectedDays={selectedDays}
              setSelectedDays={setSelectedDays}
              onCheckout={handleCheckout}
            />
          </div>
          
          {/* Right Main Area - 70% width */}
          <div className="w-[70%]">
            <ProductDisplay 
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              selectedDays={selectedDays}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;