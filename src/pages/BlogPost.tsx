import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
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

  const displayDate = post?.published_at || post?.created_at || null;

  // Function to render text with bold markdown and links
  const renderContent = (text: string) => {
    const linkRegex = /(\[.*?\]\(.*?\))/g;
    const parts = text.split(linkRegex);
    
    return parts.map((part, index) => {
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
      {post && (
        <SEOHead
          title={`${post.title} | Vitaminkorgen Blogg`}
          description={post.excerpt || `Läs ${post.title} på Vitaminkorgens blogg.`}
          keywords={`fruktkorgar, frukt på jobbet, ${post.category === 'tips' ? 'hälsotips kontor' : 'fruktrecept'}`}
        />
      )}
      {!post && (
        <SEOHead
          title="Blogg | Vitaminkorgen"
          description="Läs tips och recept om frukt på jobbet."
        />
      )}
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
              <Link to="/blogg">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Tillbaka till bloggen
              </Link>
            </Button>
          </div>
        ) : (
          <article className="max-w-4xl mx-auto">
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/blogg">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Tillbaka till bloggen
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

            {/* Internal links back to main pages */}
            <footer className="mt-12 pt-8 border-t space-y-6">
              <div className="bg-green-50 rounded-xl p-6">
                <h2 className="text-lg font-bold text-green-900 mb-3">Vill du testa fruktkorgar på jobbet?</h2>
                <p className="text-gray-600 mb-4">Vi levererar färska fruktkorgar till kontor i hela Stockholm. Prova gratis!</p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild className="bg-green-700 hover:bg-green-800">
                    <Link to="/offertforfragan">Beställ gratis provkorg</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/produkter">Se alla fruktkorgar</Link>
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link to="/blogg" className="text-green-700 hover:underline">← Tillbaka till bloggen</Link>
                <span className="text-gray-300">|</span>
                <Link to="/fruktkorg-pa-jobbet" className="text-green-700 hover:underline">Frukt på jobbet</Link>
                <span className="text-gray-300">|</span>
                <Link to="/fruktkorg-stockholm" className="text-green-700 hover:underline">Fruktkorg Stockholm</Link>
                <span className="text-gray-300">|</span>
                <Link to="/fruktkorg-foretag" className="text-green-700 hover:underline">Fruktkorg företag</Link>
              </div>
            </footer>
          </article>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
