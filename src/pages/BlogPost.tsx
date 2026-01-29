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
  published_at: string | null;
  created_at?: string | null;
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
  const displayDate = post?.published_at || post?.created_at || null;

  // Function to render text with bold markdown and links
  const renderContent = (text: string) => {
    // First split by links, then handle bold within each part
    const linkRegex = /(\[.*?\]\(.*?\))/g;
    const parts = text.split(linkRegex);
    
    return parts.map((part, index) => {
      // Check if this part is a link
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        const [, linkText, url] = linkMatch;
        return (
          <a 
            key={index} 
            href={url} 
            className="text-primary hover:underline"
            target={url.startsWith('http') ? '_blank' : undefined}
            rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {linkText}
          </a>
        );
      }
      
      // Handle bold text
      const boldParts = part.split(/(\*\*.*?\*\*)/g);
      return boldParts.map((boldPart, boldIndex) => {
        if (boldPart.startsWith('**') && boldPart.endsWith('**')) {
          return <strong key={`${index}-${boldIndex}`}>{boldPart.slice(2, -2)}</strong>;
        }
        return boldPart;
      });
    });
  };

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
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Tillbaka till startsidan
              </Link>
            </Button>
          </div>
        ) : (
          <article className="max-w-4xl mx-auto">
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Tillbaka till startsidan
              </Link>
            </Button>

            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center text-muted-foreground mb-6">
                <span>{post.author}</span>
                <span className="mx-2">•</span>
                {displayDate && (
                  <time dateTime={displayDate}>
                    {format(new Date(displayDate), 'dd MMMM yyyy', { locale: sv })}
                  </time>
                )}
              </div>
            </header>

            <div className="prose prose-lg max-w-none">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {renderContent(paragraph)}
                </p>
              ))}
            </div>

            <footer className="mt-12 pt-8 border-t">
              <Button asChild>
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Tillbaka till startsidan
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
