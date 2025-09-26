import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Search, 
  Edit,
  RefreshCw,
  UserPlus,
  Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import AdminEditUserModal from './AdminEditUserModal';
import AdminAddUserModal from './AdminAddUserModal';

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  updated_at: string;
}

const AdminUserManagement = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<Profile | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      
      // Fetch profiles from public schema (this will work with RLS)
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;
      
      console.log('Fetched profiles:', profilesData?.length || 0);
      console.log('Profiles:', profilesData?.map(p => p.email) || []);

      setProfiles(profilesData || []);
      setFilteredProfiles(profilesData || []);
      
    } catch (error: any) {
      toast({
        title: 'Fel',
        description: 'Kunde inte hämta användardata: ' + error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProfiles(profiles);
    } else {
      const filtered = profiles.filter(profile =>
        profile.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProfiles(filtered);
    }
  }, [searchQuery, profiles]);

  const getStatusBadge = (profile: Profile) => {
    const isAdmin = profile.email === 'admin@vitaminkorgen.se';
    
    if (isAdmin) {
      return <Badge variant="destructive" className="admin-badge-admin">Admin</Badge>;
    }
    
    return (
      <Badge variant="default" className="admin-badge-status">
        Aktiv
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAddUser = async (email: string, password: string, fullName?: string) => {
    try {
      // Call the Edge function to create user with email confirmation bypassed
      const { data: functionData, error } = await supabase.functions.invoke('create-user', {
        body: { 
          email: email.trim(), 
          password: password, 
          fullName: fullName || '',
          companyName: 'Företag AB'
        }
      });
      
      if (error) throw error;
      
      if (functionData.error) {
        throw new Error(functionData.error);
      }
      
      // Refresh users list
      await fetchUsers();
      
      // Close modal and show success
      setShowAddModal(false);
      toast({
        title: 'Användare skapad',
        description: 'Användaren har skapats framgångsrikt och kan logga in direkt.',
      });
    } catch (error: any) {
      toast({
        title: 'Fel',
        description: `Fel vid skapande av användare: ${error.message}`,
        variant: 'destructive',
      });
    }
  };

  const handleDeleteUser = async (profile: Profile) => {
    if (profile.email === 'admin@vitaminkorgen.se') {
      toast({
        title: 'Fel',
        description: 'Admin-användaren kan inte tas bort.',
        variant: 'destructive',
      });
      return;
    }

    if (!confirm(`Är du säker på att du vill ta bort användaren ${profile.email}?`)) {
      return;
    }

    try {
      // Delete from profiles table (this should also delete from auth via cascade)
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', profile.id);

      if (error) throw error;

      await fetchUsers();
      toast({
        title: 'Användare borttagen',
        description: 'Användaren har tagits bort framgångsrikt.',
      });
    } catch (error: any) {
      toast({
        title: 'Fel',
        description: `Fel vid borttagning av användare: ${error.message}`,
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="admin-loading-container flex items-center justify-center p-8">
        <div className="admin-loading-spinner flex items-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>Laddar användare...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-user-management space-y-6">
      {/* Header */}
      <div className="admin-user-header flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="admin-user-title text-2xl font-bold text-gray-900">Användarhantering</h2>
          <p className="admin-user-subtitle text-gray-600">Hantera användare i systemet</p>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          className="admin-btn-add-user bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Lägg till användare
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="admin-user-controls flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="admin-search-container relative flex-1 max-w-md">
          <Search className="admin-search-icon absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Sök användare..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-search-input pl-10"
          />
        </div>
        <div className="admin-user-stats flex items-center gap-4 text-sm text-gray-600">
          <span>Totalt: {profiles.length}</span>
          <span>Visas: {filteredProfiles.length}</span>
        </div>
      </div>

      {/* Users Table */}
      <div className="admin-user-table-container bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="admin-table-header">
              <TableHead className="admin-th-email">E-post</TableHead>
              <TableHead className="admin-th-name">Namn</TableHead>
              <TableHead className="admin-th-created">Skapad</TableHead>
              <TableHead className="admin-th-status">Status</TableHead>
              <TableHead className="admin-th-actions text-right">Åtgärder</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProfiles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="admin-empty-state text-center py-8 text-gray-500">
                  {searchQuery ? 'Inga användare matchar sökningen' : 'Inga användare hittades'}
                </TableCell>
              </TableRow>
            ) : (
              filteredProfiles.map((profile) => (
                <TableRow key={profile.id} className="admin-user-row">
                  <TableCell className="admin-cell-email font-medium">
                    {profile.email}
                  </TableCell>
                  <TableCell className="admin-cell-name">
                    {profile.full_name || 'Ej angivet'}
                  </TableCell>
                  <TableCell className="admin-cell-created">
                    {formatDate(profile.created_at)}
                  </TableCell>
                  <TableCell className="admin-cell-status">
                    {getStatusBadge(profile)}
                  </TableCell>
                  <TableCell className="admin-cell-actions text-right">
                    <div className="admin-action-buttons flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingUser(profile)}
                        className="admin-btn-edit flex items-center gap-1"
                        disabled={profile.email === 'admin@vitaminkorgen.se'}
                      >
                        <Edit className="w-3 h-3" />
                        Visa
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteUser(profile)}
                        className="admin-btn-delete flex items-center gap-1 text-red-600 hover:text-red-700"
                        disabled={profile.email === 'admin@vitaminkorgen.se'}
                      >
                        <Trash2 className="w-3 h-3" />
                        Ta bort
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add User Modal */}
      <AdminAddUserModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddUser={handleAddUser}
      />

      {/* Edit Modal */}
      <AdminEditUserModal
        user={editingUser}
        onClose={() => setEditingUser(null)}
        onUserUpdated={fetchUsers}
      />
    </div>
  );
};

export default AdminUserManagement;