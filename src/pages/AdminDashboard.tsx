import React, { useState, useEffect } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { LogOut, Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CustomerForm from '@/components/admin/CustomerForm';
import RequestsView from '@/components/admin/RequestsView';

interface CustomerAccount {
  id: string;
  name: string;
  company: string;
  email: string;
  current_plan: string;
  delivery_days: string[];
  status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const { logout, user } = useAdmin();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<CustomerAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<CustomerAccount | null>(null);
  const [showRequests, setShowRequests] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from('customer_accounts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCustomers(data || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteCustomer = async (customerId: string) => {
    if (!confirm('Är du säker på att du vill ta bort denna kund?')) return;

    try {
      const { error } = await supabase
        .from('customer_accounts')
        .delete()
        .eq('id', customerId);

      if (error) throw error;
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const getPlanText = (plan: string) => {
    const plans = {
      weekly: 'Veckovis',
      monthly: 'Månadsvis',
      yearly: 'Årsvis'
    };
    return plans[plan as keyof typeof plans] || plan;
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'default' : 'secondary';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Välkommen, {user?.email}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowRequests(true)}
              >
                <Eye className="w-4 h-4 mr-2" />
                Visa förfrågningar
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logga ut
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Customer Management */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Kundhantering</CardTitle>
              <Dialog open={showCustomerForm} onOpenChange={setShowCustomerForm}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingCustomer(null)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Lägg till kund
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingCustomer ? 'Redigera kund' : 'Lägg till ny kund'}
                    </DialogTitle>
                  </DialogHeader>
                  <CustomerForm
                    customer={editingCustomer}
                    onSave={() => {
                      setShowCustomerForm(false);
                      setEditingCustomer(null);
                      fetchCustomers();
                    }}
                    onCancel={() => {
                      setShowCustomerForm(false);
                      setEditingCustomer(null);
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          
          <CardContent>
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Sök kunder..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Customers Table */}
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Laddar kunder...</p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Namn</TableHead>
                      <TableHead>Företag</TableHead>
                      <TableHead>E-post</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Leveransdagar</TableHead>
                      <TableHead className="text-right">Åtgärder</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          {searchTerm ? 'Inga kunder matchade din sökning' : 'Inga kunder hittades'}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell className="font-medium">{customer.name}</TableCell>
                          <TableCell>{customer.company}</TableCell>
                          <TableCell>{customer.email}</TableCell>
                          <TableCell>{getPlanText(customer.current_plan)}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(customer.status)}>
                              {customer.status === 'active' ? 'Aktiv' : 'Inaktiv'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {customer.delivery_days.length > 0 
                              ? customer.delivery_days.join(', ')
                              : 'Inga dagar valda'
                            }
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setEditingCustomer(customer);
                                  setShowCustomerForm(true);
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteCustomer(customer.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Requests Dialog */}
        <Dialog open={showRequests} onOpenChange={setShowRequests}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Kundförfrågningar</DialogTitle>
            </DialogHeader>
            <RequestsView />
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default AdminDashboard;