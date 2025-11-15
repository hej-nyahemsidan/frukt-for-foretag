import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const LegacyBlogRedirect = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const resolveAndRedirect = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('category, slug')
          .eq('slug', slug)
          .eq('published', true)
          .maybeSingle();

        if (error) {
          setNotFound(true);
          return;
        }

        if (data?.category && data?.slug) {
          navigate(`/blogg/${data.category}/${data.slug}`, { replace: true });
          return;
        }

        setNotFound(true);
      } catch (e) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    resolveAndRedirect();
  }, [slug, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : notFound ? (
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Bloggpost hittades inte</h1>
            <p className="text-muted-foreground mb-8">Den bloggpost du letar efter finns inte.</p>
            <div className="flex gap-3 justify-center">
              <Button asChild>
                <Link to="/">Tillbaka till startsidan</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/blogg">Gå till bloggen</Link>
              </Button>
            </div>
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  );
};

export default LegacyBlogRedirect;
