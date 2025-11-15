-- Ensure blog_posts RLS is correctly configured
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Drop a variety of possible existing policies safely
DROP POLICY IF EXISTS "Anyone can view published blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Public can view published blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Public can read published posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can view all blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can insert blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can update blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can delete blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can manage all blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admin sees all" ON public.blog_posts;
DROP POLICY IF EXISTS "Public sees published" ON public.blog_posts;

-- Create simple, explicit policies
CREATE POLICY "Admin sees all"
ON public.blog_posts
FOR ALL
TO authenticated
USING (auth.email() = 'admin@vitaminkorgen.se')
WITH CHECK (auth.email() = 'admin@vitaminkorgen.se');

CREATE POLICY "Public sees published"
ON public.blog_posts
FOR SELECT
TO anon
USING (published = true);
