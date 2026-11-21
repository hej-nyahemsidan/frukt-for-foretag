import { useSuspenseQuery } from '@tanstack/react-query';
import { blogQueryOptions, type BlogData } from '@/lib/blog-query';
import { isIndexableBlogPost } from '@/lib/blog-policy';
import { useParams, Link } from '@/lib/router-compat';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';

const BlogList = ({ initialData }: { initialData: BlogData }) => {
  const { category } = useParams<{ category: 'tips' | 'recept' }>();
  const { data } = useSuspenseQuery({ ...blogQueryOptions(category), initialData });
  const posts = data.posts.filter(isIndexableBlogPost);

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
        type="minimal"
      />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs
            items={[
              { label: 'Blogg', href: '/blogg' },
              { label: categoryTitle },
            ]}
          />
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">{categoryTitle}</h1>
            <p className="text-xl text-muted-foreground">{categoryDescription}</p>
          </div>

          {posts.length === 0 ? (
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
                        {format(new Date(post.published_at ?? 0), 'dd MMMM yyyy', { locale: sv })}
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
            <Link to="/kontakt" className="text-sm text-green-700 hover:underline">Beställ gratis provkorg</Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogList;
