import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

const BlogHome = () => {
  const [tipsPosts, setTipsPosts] = useState<BlogPost[]>([]);
  const [receptPosts, setReceptPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, image_url, category, author, published_at')
        .eq('published', true)
        .order('published_at', { ascending: false })
        .limit(6);

      if (error) throw error;

      const tips = (data || []).filter(post => post.category === 'tips');
      const recept = (data || []).filter(post => post.category === 'recept');
      
      setTipsPosts(tips);
      setReceptPosts(recept);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const PostCard = ({ post }: { post: BlogPost }) => (
    <Link to={`/blogg/${post.category}/${post.slug}`}>
      <Card className="hover:shadow-lg transition-shadow h-full">
        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        )}
        <CardHeader>
          <CardTitle className="text-xl">{post.title}</CardTitle>
          <CardDescription>
            {post.author} • {format(new Date(post.published_at), 'dd MMMM yyyy', { locale: sv })}
          </CardDescription>
        </CardHeader>
        {post.excerpt && (
          <CardContent>
            <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
          </CardContent>
        )}
      </Card>
    </Link>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Vår Blogg</h1>
            <p className="text-xl text-muted-foreground">
              Tips, recept och inspiration för ett hälsosammare liv
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <>
              {tipsPosts.length > 0 && (
                <section className="mb-12">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">Tips</h2>
                    <Button variant="link" asChild>
                      <Link to="/blogg/tips">Visa alla tips →</Link>
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tipsPosts.slice(0, 3).map(post => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                </section>
              )}

              {receptPosts.length > 0 && (
                <section>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">Recept</h2>
                    <Button variant="link" asChild>
                      <Link to="/blogg/recept">Visa alla recept →</Link>
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {receptPosts.slice(0, 3).map(post => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                </section>
              )}

              {tipsPosts.length === 0 && receptPosts.length === 0 && (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">Inga blogginlägg ännu. Kom tillbaka snart!</p>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogHome;
