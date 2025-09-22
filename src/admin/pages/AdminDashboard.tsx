import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Users, ShoppingCart, BarChart3 } from 'lucide-react';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import FruktexpertenLogo from '@/components/FruktexpertenLogo';

const AdminDashboard = () => {
  const { logout, user } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: 'Utloggad',
        description: 'Du har loggats ut från administratörspanelen.',
      });
      navigate('/admin/login');
    } catch (error) {
      toast({
        title: 'Ett fel uppstod',
        description: 'Kunde inte logga ut. Försök igen.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FruktexpertenLogo />
              <span className="ml-3 text-lg font-semibold text-gray-800">Admin Panel</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Inloggad som: {user?.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logga ut
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Administratörspanel</h1>
            <p className="mt-2 text-gray-600">Hantera kunder, beställningar och systemet</p>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Totala kunder
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">--</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ShoppingCart className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Aktiva beställningar
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">--</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <BarChart3 className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Månadsintäkter
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">-- SEK</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Snabbåtgärder
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button className="justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Hantera kunder
                </Button>
                <Button className="justify-start" variant="outline">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Visa beställningar
                </Button>
                <Button className="justify-start" variant="outline">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Rapporter
                </Button>
                <Button className="justify-start" variant="outline">
                  Systeminställningar
                </Button>
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Välkommen till administratörspanelen!
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    Här kan du hantera alla aspekter av Fruktexpertens system. 
                    Använd menyn ovan för att navigera till olika funktioner.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;