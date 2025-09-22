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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  UserPlus,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import AdminAddUserModal from './AdminAddUserModal';
import AdminEditUserModal from './AdminEditUserModal';

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
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<Profile | null>(null);
  const [deletingUser, setDeletingUser] = useState<Profile | null>(null);
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

  const handleDeleteUser = async (profile: Profile) => {
    if (profile.email === 'admin@fruktexperten.se') {
      toast({
        title: 'Ej tillåtet',
        description: 'Administratörskontot kan inte tas bort.',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Delete the profile (which will cascade delete the auth user due to foreign key)
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', profile.id);

      if (error) throw error;

      // Update local state
      setProfiles(prev => prev.filter(p => p.id !== profile.id));
      setDeletingUser(null);
      
      toast({
        title: 'Användare borttagen',
        description: `${profile.email} har tagits bort från systemet.`,
      });
      
    } catch (error: any) {
      toast({
        title: 'Fel',
        description: 'Kunde inte ta bort användaren: ' + error.message,
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (profile: Profile) => {
    const isAdmin = profile.email === 'admin@fruktexperten.se';
    
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
          <p className="admin-user-subtitle text-gray-600">Hantera systemanvändare och deras behörigheter</p>
        </div>
        <Button 
          onClick={() => setShowAddModal(true)}
          className="admin-btn-add-user flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
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
                      >
                        <Edit className="w-3 h-3" />
                        Redigera
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="admin-btn-delete text-red-600 border-red-200 hover:bg-red-50 flex items-center gap-1"
                            disabled={profile.email === 'admin@fruktexperten.se'}
                          >
                            <Trash2 className="w-3 h-3" />
                            Radera
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="admin-delete-dialog">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Bekräfta borttagning</AlertDialogTitle>
                            <AlertDialogDescription>
                              Är du säker på att du vill ta bort användaren <strong>{profile.email}</strong>? 
                              Denna åtgärd kan inte ångras.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="admin-btn-cancel">Avbryt</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteUser(profile)}
                              className="admin-btn-confirm-delete bg-red-600 hover:bg-red-700"
                            >
                              Radera användare
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modals */}
      <AdminAddUserModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onUserAdded={fetchUsers}
      />

      <AdminEditUserModal
        user={editingUser}
        onClose={() => setEditingUser(null)}
        onUserUpdated={fetchUsers}
      />
    </div>
  );
};

export default AdminUserManagement;