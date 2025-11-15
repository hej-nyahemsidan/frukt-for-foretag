import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Loader2, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';

interface BlogPostType {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  image_url: string | null;
  category: string;
  author: string;
  published_at: string;
}

const BlogPost = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [category, slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('category', category)
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) {
        setNotFound(true);
        return;
      }

      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const categoryTitle = category === 'tips' ? 'Tips' : 'Recept';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : notFound || !post ? (
          <div className="max-w-4xl mx-auto text-center py-12">
            <h1 className="text-4xl font-bold mb-4">Inlägget hittades inte</h1>
            <p className="text-muted-foreground mb-8">
              Tyvärr kunde vi inte hitta det blogginlägg du letade efter.
            </p>
            <Button asChild>
              <Link to={`/blogg/${category}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Tillbaka till {categoryTitle}
              </Link>
            </Button>
          </div>
        ) : (
          <article className="max-w-4xl mx-auto">
            <Button variant="ghost" asChild className="mb-6">
              <Link to={`/blogg/${category}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Tillbaka till {categoryTitle}
              </Link>
            </Button>

            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center text-muted-foreground mb-6">
                <span>{post.author}</span>
                <span className="mx-2">•</span>
                <time dateTime={post.published_at}>
                  {format(new Date(post.published_at), 'dd MMMM yyyy', { locale: sv })}
                </time>
              </div>
              {post.image_url && (
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
              )}
            </header>

            <div className="prose prose-lg max-w-none">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <footer className="mt-12 pt-8 border-t">
              <Button asChild>
                <Link to={`/blogg/${category}`}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Tillbaka till {categoryTitle}
                </Link>
              </Button>
            </footer>
          </article>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
