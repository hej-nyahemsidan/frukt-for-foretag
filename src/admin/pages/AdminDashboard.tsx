import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Users, ShoppingCart, BarChart3 } from 'lucide-react';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import AdminUserManagement from '../components/AdminUserManagement';
import AdminProductManagement from '../components/AdminProductManagement';
import VitaminKorgenLogo from '../../components/VitaminKorgenLogo';

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
    <div className="admin-dashboard min-h-screen bg-gray-50">
      {/* Header */}
      <header className="admin-header bg-white shadow-sm border-b">
        <div className="admin-header-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="admin-header-content flex justify-between items-center h-16">
            <div className="admin-header-left flex items-center">
              <VitaminKorgenLogo size="medium" variant="horizontal" />
              <span className="admin-title ml-3 text-lg font-semibold text-gray-800">Admin Dashboard</span>
            </div>
            <div className="admin-header-right flex items-center space-x-4">
              <span className="admin-user-info text-sm text-gray-600">
                Inloggad som: {user?.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="admin-logout-btn flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logga ut
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="admin-main max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="admin-main-content px-4 py-6 sm:px-0">
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Användare
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Produkter
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="users" className="space-y-4">
              <AdminUserManagement />
            </TabsContent>
            
            <TabsContent value="products" className="space-y-4">
              <AdminProductManagement />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;