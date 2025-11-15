import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  image_url: string | null;
  category: string;
  author: string;
  published_at: string;
}

const BlogList = () => {
  const { category } = useParams<{ category: 'tips' | 'recept' }>();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, [category]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, image_url, category, author, published_at')
        .eq('category', category)
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const categoryTitle = category === 'tips' ? 'Tips' : 'Recept';
  const categoryDescription =
    category === 'tips'
      ? 'Upptäck användbara tips för ett hälsosammare liv på jobbet'
      : 'Smakrika och hälsosamma recept med färsk frukt';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">{categoryTitle}</h1>
            <p className="text-xl text-muted-foreground">{categoryDescription}</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Inga inlägg hittades än.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {posts.map((post) => (
                <Link key={post.id} to={`/blogg/${post.category}/${post.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow">
                    <div className="md:flex">
                      {post.image_url && (
                        <div className="md:w-1/3">
                          <img
                            src={post.image_url}
                            alt={post.title}
                            className="w-full h-48 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                          />
                        </div>
                      )}
                      <div className={post.image_url ? 'md:w-2/3' : 'w-full'}>
                        <CardHeader>
                          <CardTitle className="text-2xl">{post.title}</CardTitle>
                          <CardDescription>
                            {post.author} •{' '}
                            {format(new Date(post.published_at), 'dd MMMM yyyy', { locale: sv })}
                          </CardDescription>
                        </CardHeader>
                        {post.excerpt && (
                          <CardContent>
                            <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                            <Button variant="link" className="mt-4 px-0">
                              Läs mer →
                            </Button>
                          </CardContent>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogList;
