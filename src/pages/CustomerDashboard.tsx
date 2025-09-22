import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import OrderSidebar from '@/components/OrderSidebar';
import ProductDisplay from '@/components/ProductDisplay';
import AdditionRequestForm from '@/components/customer/AdditionRequestForm';

const CustomerDashboard = () => {
  const { customer, logout } = useAuth();
  const navigate = useNavigate();
  const [packagePlan, setPackagePlan] = useState('weekly');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('fruktpaser');

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Simple Header */}
      <header className="header-professional">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span>Tillbaka</span>
              </Link>
              <div className="h-6 w-px bg-primary-foreground/30"></div>
              <h1 className="text-lg font-semibold text-primary-foreground">
                Välkommen, {customer?.contact_person}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
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
        
        <div className="space-y-8">
          <div className="flex gap-8">
            {/* Left Sidebar - 30% width */}
            <div className="w-[30%]">
              <OrderSidebar 
                packagePlan={packagePlan}
                setPackagePlan={setPackagePlan}
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
              />
            </div>
            
            {/* Right Main Area - 70% width */}
            <div className="w-[70%]">
              <ProductDisplay 
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            </div>
          </div>
          
          {/* Addition Request Form */}
          <div className="max-w-4xl mx-auto">
            <AdditionRequestForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;