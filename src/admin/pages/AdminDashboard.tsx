import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Users, ShoppingCart, BarChart3, Home, FileText } from 'lucide-react';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import AdminUserManagement from '../components/AdminUserManagement';
import AdminProductManagement from '../components/AdminProductManagement';
import AdminBlogManagement from '../components/AdminBlogManagement';
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
          <div className="admin-header-content flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 py-3 sm:py-0 sm:h-16">
            <div className="admin-header-left flex items-center w-full sm:w-auto">
              <div className="flex-shrink-0">
                <VitaminKorgenLogo 
                  size="small" 
                  variant="horizontal" 
                  className="h-8 w-auto max-w-[120px] sm:h-10 sm:max-w-[150px]" 
                />
              </div>
              <span className="admin-title ml-2 sm:ml-3 text-sm sm:text-lg font-semibold text-gray-800 truncate">
                Admin Dashboard
              </span>
            </div>
            <div className="admin-header-right flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-between sm:justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="admin-home-btn flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
              >
                <Home className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Hem</span>
              </Button>
              <span className="admin-user-info text-xs sm:text-sm text-gray-600 truncate max-w-32 sm:max-w-none">
                {user?.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="admin-logout-btn flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
              >
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Logga ut</span>
                <span className="sm:hidden">Ut</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="admin-main max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="admin-main-content px-4 py-6 sm:px-0">
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4 sm:mb-6">
              <TabsTrigger value="users" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3">
                <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Användare</span>
                <span className="xs:hidden">User</span>
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3">
                <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Produkter</span>
                <span className="xs:hidden">Prod</span>
              </TabsTrigger>
              <TabsTrigger value="blog" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3">
                <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Blogg</span>
                <span className="xs:hidden">Blog</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="users" className="space-y-4">
              <AdminUserManagement />
            </TabsContent>
            
            <TabsContent value="products" className="space-y-4">
              <AdminProductManagement />
            </TabsContent>

            <TabsContent value="blog" className="space-y-4">
              <AdminBlogManagement />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;