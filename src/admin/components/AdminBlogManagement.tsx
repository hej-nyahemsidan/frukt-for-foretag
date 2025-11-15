import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus, Eye, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

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
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
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
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts((data || []) as BlogPost[]);
    } catch (error) {
      toast({
        title: 'Fel',
        description: 'Kunde inte hämta blogginlägg',
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
      toast({
        title: 'Fel',
        description: 'Kunde inte spara blogginlägget',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (post: BlogPost) => {
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
    setEditing(post.id);
    setIsAddingNew(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Raderat',
        description: 'Blogginlägget har raderats',
      });
      fetchPosts();
    } catch (error) {
      toast({
        title: 'Fel',
        description: 'Kunde inte radera blogginlägget',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
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
    setEditing(null);
    setIsAddingNew(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blogginlägg</h2>
        {!isAddingNew && (
          <Button onClick={() => setIsAddingNew(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nytt inlägg
          </Button>
        )}
      </div>

      {isAddingNew && (
        <Card>
          <CardHeader>
            <CardTitle>{editing ? 'Redigera inlägg' : 'Nytt inlägg'}</CardTitle>
            <CardDescription>
              {editing ? 'Uppdatera blogginlägget' : 'Skapa ett nytt blogginlägg'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titel *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL) *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Kategori *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: 'tips' | 'recept') =>
                    setFormData({ ...formData, category: value })
                  }
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
                <Label htmlFor="excerpt">Kort beskrivning</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Innehåll *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={10}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">Bild-URL</Label>
                <Input
                  id="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Författare</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, published: checked })
                  }
                />
                <Label htmlFor="published">Publicerad</Label>
              </div>

              <div className="flex gap-2">
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

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <CardDescription>
                    {post.category === 'tips' ? 'Tips' : 'Recept'} •{' '}
                    {post.published ? 'Publicerad' : 'Utkast'} •{' '}
                    {format(new Date(post.created_at), 'dd MMM yyyy')}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      window.open(`/blogg/${post.category}/${post.slug}`, '_blank')
                    }
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(post)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Är du säker?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Detta kommer att permanent radera blogginlägget.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Avbryt</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(post.id)}>
                          Radera
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            {post.excerpt && (
              <CardContent>
                <p className="text-sm text-muted-foreground">{post.excerpt}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminBlogManagement;
