
DROP POLICY IF EXISTS "Admin sees all" ON public.blog_posts;
CREATE POLICY "Admin sees all"
  ON public.blog_posts
  FOR ALL
  TO public
  USING (is_admin_user())
  WITH CHECK (is_admin_user());
