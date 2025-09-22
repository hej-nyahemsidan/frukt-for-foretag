import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  LogOut, 
  Home, 
  Package, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Edit,
  Plus,
  Clock,
  CheckCircle,
  Pause,
  X
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Order {
  id: string;
  package_plan: string;
  selected_days: string[];
  status: string;
  total_price: number;
  next_delivery_date: string | null;
  created_at: string;
  items: any;
}

const CustomerDashboard = () => {
  const { user, customer, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [customer]);

  const fetchOrders = async () => {
    if (!customer?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_id', customer.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching orders:', error);
      } else {
        setOrders(data || []);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { label: 'Aktiv', variant: 'default' as const },
      paused: { label: 'Pausad', variant: 'secondary' as const },
      cancelled: { label: 'Avbruten', variant: 'destructive' as const }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.active;
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  const getPlanLabel = (plan: string) => {
    const planMap = {
      weekly: 'Veckovis',
      monthly: 'Månadsvis',
      yearly: 'Årsvis'
    };
    return planMap[plan as keyof typeof planMap] || plan;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Laddar instrumentpanel...</p>
        </div>
      </div>
    );
  }

  const activeOrders = orders.filter(order => order.status === 'active');
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-gray-600 hover:text-green-600">
                <Home className="w-5 h-5 mr-2" />
                <span>Tillbaka till hemsidan</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Välkommen, {customer?.contact_person}</span>
              <Button 
                onClick={handleLogout}
                variant="outline" 
                className="flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logga ut
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Kundportal - {customer?.company_name}
          </h1>
          <p className="text-gray-600">
            Hantera dina fruktleveranser och kontoinställningar
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Active Subscriptions Card */}
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2 text-green-600" />
                Aktiva Prenumerationer
              </CardTitle>
              <CardDescription>
                Dina pågående fruktleveranser
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activeOrders.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Inga aktiva prenumerationer</p>
                  <Button className="mt-4 bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Beställ fruktkorg
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 bg-white">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{getPlanLabel(order.package_plan)}</h4>
                          <p className="text-sm text-gray-600">
                            {order.total_price} kr / leverans
                          </p>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                      {order.next_delivery_date && (
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <Calendar className="w-4 h-4 mr-1" />
                          Nästa leverans: {formatDate(order.next_delivery_date)}
                        </div>
                      )}
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Pause className="w-4 h-4 mr-1" />
                          Pausa
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-1" />
                          Ändra
                        </Button>
                        <Button size="sm" variant="outline">
                          <X className="w-4 h-4 mr-1" />
                          Avbryt
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Snabbåtgärder</CardTitle>
              <CardDescription>
                Vanliga uppgifter
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-green-600 hover:bg-green-700 justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Beställ ny fruktkorg
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="w-4 h-4 mr-2" />
                Ändra leveransadress
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="w-4 h-4 mr-2" />
                Kontakta oss
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order History Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-green-600" />
                Senaste Beställningar
              </CardTitle>
              <CardDescription>
                Historik över dina leveranser
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentOrders.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p>Inga beställningar än</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{getPlanLabel(order.package_plan)}</p>
                        <p className="text-sm text-gray-600">{formatDate(order.created_at)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{order.total_price} kr</p>
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Account Settings Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Edit className="w-5 h-5 mr-2 text-green-600" />
                Kontoinställningar
              </CardTitle>
              <CardDescription>
                Din företagsinformation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-5 h-5 mr-3 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">{customer?.company_name}</p>
                    <p className="text-sm text-gray-600">Företagsnamn</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-gray-400" />
                  <div>
                    <p className="font-medium">{customer?.email}</p>
                    <p className="text-sm text-gray-600">E-post</p>
                  </div>
                </div>
                
                {customer?.phone && (
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-3 text-gray-400" />
                    <div>
                      <p className="font-medium">{customer.phone}</p>
                      <p className="text-sm text-gray-600">Telefon</p>
                    </div>
                  </div>
                )}
                
                {customer?.address && (
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                    <div>
                      <p className="font-medium">{customer.address}</p>
                      <p className="text-sm text-gray-600">Adress</p>
                    </div>
                  </div>
                )}
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                <Edit className="w-4 h-4 mr-2" />
                Redigera information
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;