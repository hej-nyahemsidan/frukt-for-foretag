import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
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
      <SEOHead
        title={`${categoryTitle} – Blogg | Vitaminkorgen`}
        description={categoryDescription}
        keywords={`frukt ${category}, fruktkorgar tips, hälsa arbetsplats, ${category} frukt`}
      />
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
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {/* Internal links */}
          <div className="mt-12 pt-8 border-t flex flex-wrap gap-3">
            <Link to="/blogg" className="text-sm text-green-700 hover:underline">← Tillbaka till bloggen</Link>
            <span className="text-gray-300">|</span>
            <Link to="/produkter" className="text-sm text-green-700 hover:underline">Se våra fruktkorgar</Link>
            <span className="text-gray-300">|</span>
            <Link to="/offertforfragan" className="text-sm text-green-700 hover:underline">Beställ gratis provkorg</Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogList;
