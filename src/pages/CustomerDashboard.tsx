import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SimpleOrderForm from '@/components/customer/SimpleOrderForm';

const CustomerDashboard = () => {
  const { customer, logout } = useAuth();
  const navigate = useNavigate();

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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground text-center mb-2">
            Ändra din beställning
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Lägg till eller ta bort artiklar från din beställning
          </p>
          
          <SimpleOrderForm />
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;