import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';
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

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string | null;
  author: string;
  published_at: string | null;
}

const BlogPost = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [related, setRelated] = useState<RelatedPost[]>([]);
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

      // Fetch related posts in same category (exclude current)
      const { data: relatedData } = await supabase
        .from('blog_posts')
        .select('id, title, slug, category, excerpt, author, published_at')
        .eq('category', category)
        .eq('published', true)
        .neq('slug', slug)
        .order('published_at', { ascending: false })
        .limit(3);
      setRelated(relatedData || []);
    } catch (error) {
      console.error('Error fetching post:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const displayDate = post?.published_at || post?.created_at || null;

  // Article (BlogPosting) JSON-LD schema for SEO + E-E-A-T
  const articleSchema = post
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt || post.title,
        image: post.image_url
          ? [post.image_url]
          : ["https://vitaminkorgen.se/opengraph-image.png"],
        datePublished: displayDate,
        dateModified: displayDate,
        author: {
          "@type": "Person",
          name: post.author,
          url: "https://vitaminkorgen.se/om-oss",
        },
        publisher: {
          "@type": "Organization",
          name: "Vitaminkorgen AB",
          logo: {
            "@type": "ImageObject",
            url: "https://vitaminkorgen.se/fruktexperten-logo.png",
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://vitaminkorgen.se/blogg/${post.category}/${post.slug}`,
        },
        articleSection: post.category === "tips" ? "Tips" : "Recept",
      }
    : null;

  // Function to render text with bold markdown and links
  const renderContent = (text: string) => {
    const linkRegex = /(\[.*?\]\(.*?\))/g;
    const parts = text.split(linkRegex);
    
    return parts.map((part, index) => {
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        const [, linkText, url] = linkMatch;
        const isExternal = url.startsWith('http');
        if (isExternal) {
          return (
            <a 
              key={index} 
              href={url} 
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {linkText}
            </a>
          );
        }
        return (
          <Link 
            key={index} 
            to={url} 
            className="text-primary hover:underline"
          >
            {linkText}
          </Link>
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
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
            <Breadcrumbs
              items={[
                { label: "Blogg", href: "/blogg" },
                {
                  label: post.category === "tips" ? "Tips" : "Recept",
                  href: `/blogg/${post.category}`,
                },
                { label: post.title },
              ]}
            />

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
              {post.content.split('\n').map((line, index) => {
                const trimmed = line.trim();
                
                // Skip empty lines
                if (!trimmed) return null;
                
                // Skip H1 that duplicates the title
                if (trimmed.startsWith('# ') && index < 3) return null;
                
                // H2
                if (trimmed.startsWith('## ')) {
                  return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{renderContent(trimmed.slice(3))}</h2>;
                }
                // H3
                if (trimmed.startsWith('### ')) {
                  return <h3 key={index} className="text-xl font-semibold mt-6 mb-3">{renderContent(trimmed.slice(4))}</h3>;
                }
                // Unordered list item
                if (trimmed.startsWith('- ')) {
                  return (
                    <div key={index} className="flex gap-2 ml-4 mb-1">
                      <span className="text-primary mt-1">•</span>
                      <span className="leading-relaxed">{renderContent(trimmed.slice(2))}</span>
                    </div>
                  );
                }
                // Ordered list item
                const orderedMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
                if (orderedMatch) {
                  return (
                    <div key={index} className="flex gap-2 ml-4 mb-1">
                      <span className="font-semibold text-primary min-w-[1.5rem]">{orderedMatch[1]}.</span>
                      <span className="leading-relaxed">{renderContent(orderedMatch[2])}</span>
                    </div>
                  );
                }
                // Table header row
                if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
                  // Skip separator rows like |---|---|---|
                  if (/^\|[\s-|]+\|$/.test(trimmed)) return null;
                  const cells = trimmed.split('|').filter(c => c.trim());
                  // Check if next line is separator (header row)
                  const nextLine = post.content.split('\n')[index + 1]?.trim();
                  const isHeader = nextLine && /^\|[\s-|]+\|$/.test(nextLine);
                  return (
                    <div key={index} className={`grid gap-2 mb-1 ${cells.length === 3 ? 'grid-cols-3' : cells.length === 2 ? 'grid-cols-2' : 'grid-cols-4'}`}>
                      {cells.map((cell, i) => (
                        <span key={i} className={`px-2 py-1 text-sm ${isHeader ? 'font-bold bg-muted rounded' : ''}`}>
                          {renderContent(cell.trim())}
                        </span>
                      ))}
                    </div>
                  );
                }
                // Horizontal rule
                if (trimmed === '---') {
                  return <hr key={index} className="my-8 border-border" />;
                }
                // Italic block (wrapped in single *)
                if (trimmed.startsWith('*') && trimmed.endsWith('*') && !trimmed.startsWith('**')) {
                  return <p key={index} className="mb-4 leading-relaxed italic text-muted-foreground">{renderContent(trimmed.slice(1, -1))}</p>;
                }
                // Regular paragraph
                return (
                  <p key={index} className="mb-4 leading-relaxed">
                    {renderContent(trimmed)}
                  </p>
                );
              })}
            </div>

            {/* Internal links back to main pages */}
            <footer className="mt-12 pt-8 border-t space-y-6">
              {related.length > 0 && (
                <section aria-labelledby="related-heading">
                  <h2 id="related-heading" className="text-2xl font-bold mb-4">
                    Relaterade artiklar
                  </h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    {related.map((rp) => (
                      <Link
                        key={rp.id}
                        to={`/blogg/${rp.category}/${rp.slug}`}
                        className="block"
                      >
                        <Card className="h-full hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <CardTitle className="text-base line-clamp-2">
                              {rp.title}
                            </CardTitle>
                            <CardDescription className="text-xs">
                              {rp.author}
                              {rp.published_at &&
                                ` • ${format(new Date(rp.published_at), "dd MMM yyyy", { locale: sv })}`}
                            </CardDescription>
                          </CardHeader>
                          {rp.excerpt && (
                            <CardContent>
                              <p className="text-sm text-muted-foreground line-clamp-3">
                                {rp.excerpt}
                              </p>
                            </CardContent>
                          )}
                        </Card>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              <div className="bg-green-50 rounded-xl p-6">
                <h2 className="text-lg font-bold text-green-900 mb-3">Vill du testa fruktkorgar på jobbet?</h2>
                <p className="text-gray-600 mb-4">Vi levererar färska fruktkorgar till kontor i hela Stockholm. Prova gratis!</p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild className="bg-green-700 hover:bg-green-800">
                    <Link to="/kontakt">Beställ gratis provkorg</Link>
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
