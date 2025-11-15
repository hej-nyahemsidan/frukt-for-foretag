import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { useAdminAuth } from '../contexts/AdminAuthContext';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  image_url: string | null;
  category: 'tips' | 'recept';
  author: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

const AdminBlogManagement = () => {
  const { user } = useAdminAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    image_url: '',
    category: 'tips' as 'tips' | 'recept',
    author: 'Vitaminkorgen',
    published: false,
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    console.log('Fetching blog posts...');
    console.log('Current user email:', user?.email);
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error);
        toast({
          title: 'Fel',
          description: 'Kunde inte hämta blogginlägg: ' + error.message,
          variant: 'destructive',
        });
      } else {
        console.log('Fetched blog posts:', data);
        setPosts((data || []) as BlogPost[]);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: 'Fel',
        description: 'Ett oväntat fel uppstod',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/å/g, 'a')
      .replace(/ä/g, 'a')
      .replace(/ö/g, 'o')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const postData = {
        ...formData,
        published_at: formData.published ? new Date().toISOString() : null,
      };

      if (editing) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editing);

        if (error) throw error;

        toast({
          title: 'Uppdaterat',
          description: 'Blogginlägget har uppdaterats',
        });
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([postData]);

        if (error) throw error;

        toast({
          title: 'Skapat',
          description: 'Nytt blogginlägg har skapats',
        });
      }

      resetForm();
      fetchPosts();
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast({
        title: 'Fel',
        description: 'Kunde inte spara blogginlägget',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditing(post.id);
    setIsAddingNew(true);
    setFormData({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt || '',
      image_url: post.image_url || '',
      category: post.category,
      author: post.author,
      published: post.published,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirmDelete = (id: string) => {
    setPostToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!postToDelete) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postToDelete);

      if (error) throw error;

      toast({
        title: 'Borttaget',
        description: 'Blogginlägget har tagits bort',
      });

      fetchPosts();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast({
        title: 'Fel',
        description: 'Kunde inte ta bort blogginlägget',
        variant: 'destructive',
      });
    } finally {
      setDeleteDialogOpen(false);
      setPostToDelete(null);
    }
  };

  const resetForm = () => {
    setEditing(null);
    setIsAddingNew(false);
    setFormData({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      image_url: '',
      category: 'tips',
      author: 'Vitaminkorgen',
      published: false,
    });
  };

  return (
    <div className="p-8">
      {/* Debug Panel */}
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm font-medium mb-2">Debug Info:</p>
        <p className="text-xs text-gray-700">Inloggad som: {user?.email}</p>
        <p className="text-xs text-gray-700">Blogginlägg hittade: {posts.length}</p>
        <Button
          type="button"
          size="sm"
          className="mt-3"
          onClick={async () => {
            const { data, error } = await supabase
              .from('blog_posts')
              .select('id, title, published')
              .limit(10);
            console.log('Direct query result:', { data, error });
            alert(`Hittade ${data?.length || 0} inlägg. Kolla konsolen för detaljer.`);
          }}
        >
          Testa Databasanslutning
        </Button>
      </div>

      {/* Blog Posts List */}
      {loading ? (
        <div className="p-8 text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <p className="mt-4 text-muted-foreground">Laddar blogginlägg...</p>
        </div>
      ) : posts.length > 0 ? (
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Befintliga Blogginlägg ({posts.length})</CardTitle>
            <Button onClick={() => setIsAddingNew(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nytt inlägg
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Titel</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Kategori</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Skapad</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Åtgärder</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td className="px-4 py-4 text-sm font-medium">{post.title}</td>
                      <td className="px-4 py-4 text-sm capitalize">{post.category}</td>
                      <td className="px-4 py-4 text-sm">
                        {post.published ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            ✓ Publicerad
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            ⏸ Utkast
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm text-muted-foreground">
                        {format(new Date(post.created_at), 'yyyy-MM-dd')}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(post)}
                          className="mr-2"
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Redigera
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => confirmDelete(post.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Ta bort
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-8">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground mb-2">Inga blogginlägg hittades.</p>
            <p className="text-sm text-muted-foreground mb-4">
              Klicka på 'Nytt inlägg' för att skapa ditt första blogginlägg.
            </p>
            <Button onClick={() => setIsAddingNew(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nytt inlägg
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Form */}
      {isAddingNew && (
        <Card>
          <CardHeader>
            <CardTitle>{editing ? 'Redigera Blogginlägg' : 'Nytt Blogginlägg'}</CardTitle>
            <CardDescription>
              {editing ? 'Uppdatera befintligt blogginlägg' : 'Skapa ett nytt blogginlägg'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Titel *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                  placeholder="Ange blogginläggets titel"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL-vänlig) *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                  placeholder="automatiskt-genererad-slug"
                />
                <p className="text-xs text-muted-foreground">
                  Genereras automatiskt från titeln, men kan redigeras
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Kategori *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: 'tips' | 'recept') => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tips">Tips</SelectItem>
                    <SelectItem value="recept">Recept</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Utdrag</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Kort beskrivning av blogginlägget"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Innehåll *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  placeholder="Skriv blogginläggets innehåll här..."
                  rows={12}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Markdown-formatering stöds
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">Bild-URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  type="url"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Författare</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Vitaminkorgen"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                />
                <Label htmlFor="published" className="cursor-pointer">
                  Publicera direkt
                </Label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit">
                  {editing ? 'Uppdatera' : 'Skapa'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Avbryt
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Är du säker?</AlertDialogTitle>
            <AlertDialogDescription>
              Är du säker på att du vill ta bort detta blogginlägg? Denna åtgärd kan inte ångras.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPostToDelete(null)}>Avbryt</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Ta bort
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminBlogManagement;
