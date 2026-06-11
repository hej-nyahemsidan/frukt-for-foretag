DROP POLICY IF EXISTS "Admin sees all" ON public.blog_posts;
CREATE POLICY "Admin sees all" ON public.blog_posts
  FOR ALL
  TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());