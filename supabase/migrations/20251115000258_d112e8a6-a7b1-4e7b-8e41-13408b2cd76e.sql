-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  category TEXT NOT NULL CHECK (category IN ('tips', 'recept')),
  author TEXT NOT NULL DEFAULT 'Vitaminkorgen',
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin management
CREATE POLICY "Admins can view all blog posts"
ON public.blog_posts
FOR SELECT
USING (is_admin_user());

CREATE POLICY "Admins can insert blog posts"
ON public.blog_posts
FOR INSERT
WITH CHECK (is_admin_user());

CREATE POLICY "Admins can update blog posts"
ON public.blog_posts
FOR UPDATE
USING (is_admin_user())
WITH CHECK (is_admin_user());

CREATE POLICY "Admins can delete blog posts"
ON public.blog_posts
FOR DELETE
USING (is_admin_user());

-- Public can view published posts
CREATE POLICY "Public can view published blog posts"
ON public.blog_posts
FOR SELECT
USING (published = true);

-- Create trigger for updated_at
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better query performance
CREATE INDEX idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON public.blog_posts(published, published_at DESC);