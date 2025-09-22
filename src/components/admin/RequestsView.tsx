import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, RefreshCw } from 'lucide-react';

interface AdditionRequest {
  id: string;
  customer_name: string;
  customer_email: string;
  items: any;
  total_monthly_cost: number;
  total_onetime_cost: number;
  message: string;
  status: string;
  created_at: string;
}

const RequestsView = () => {
  const [requests, setRequests] = useState<AdditionRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('addition_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateRequestStatus = async (requestId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('addition_requests')
        .update({ status })
        .eq('id', requestId);

      if (error) throw error;
      fetchRequests();
    } catch (error) {
      console.error('Error updating request status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'default';
      case 'processed': return 'default';
      case 'cancelled': return 'secondary';
      default: return 'default';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Laddar förfrågningar...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Kundförfrågningar</h3>
        <Button variant="outline" onClick={fetchRequests}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Uppdatera
        </Button>
      </div>

      {requests.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">Inga förfrågningar hittades</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <Card key={request.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{request.customer_name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{request.customer_email}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(request.created_at).toLocaleDateString('sv-SE')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getStatusColor(request.status)}>
                      {request.status === 'pending' ? 'Väntande' : 
                       request.status === 'processed' ? 'Behandlad' : 'Avbruten'}
                    </Badge>
                    {request.status === 'pending' && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateRequestStatus(request.id, 'processed')}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateRequestStatus(request.id, 'cancelled')}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Items */}
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Begärda artiklar:</h4>
                  <div className="space-y-2">
                    {Array.isArray(request.items) && request.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span>{item.name}</span>
                        <div className="flex items-center space-x-2">
                          <span>Antal: {item.quantity}</span>
                          <Badge variant="outline" className="text-xs">
                            {item.type === 'permanent' ? 'Permanent' : 'Engångs'}
                          </Badge>
                          <span>{formatCurrency(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="flex justify-between items-center text-sm border-t pt-2">
                  <span>Total månadsvis:</span>
                  <span className="font-medium">{formatCurrency(request.total_monthly_cost)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Total engångs:</span>
                  <span className="font-medium">{formatCurrency(request.total_onetime_cost)}</span>
                </div>

                {/* Message */}
                {request.message && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <h4 className="font-medium mb-1">Meddelande:</h4>
                    <p className="text-sm">{request.message}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestsView;