import { createClient } from '@supabase/supabase-js';
import { isIndexableBlogPost } from '../src/lib/blog-policy';

// Run with bun; public credentials only. Never silently write a partial sitemap.
const url = process.env['SUPABASE_URL'] ?? process.env['VITE_SUPABASE_URL'];
const key = process.env['SUPABASE_PUBLISHABLE_KEY'] ?? process.env['VITE_SUPABASE_PUBLISHABLE_KEY'] ?? process.env['VITE_SUPABASE_ANON_KEY'];
if (!url || !key) throw new Error('Public Supabase configuration is missing');
const client = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
  global: { fetch: (input, init) => {
    const headers = new Headers(init?.headers);
    if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization');
    headers.set('apikey', key);
    return fetch(input, { ...init, headers });
  } },
});
const posts = [];
for (let offset = 0; ; offset += 500) {
  const { data, error } = await client.from('blog_posts').select('slug,category,updated_at,published_at')
    .eq('published', true).order('id').range(offset, offset + 499);
  if (error) throw error;
  posts.push(...(data ?? []));
  if (!data || data.length < 500) break;
}
const file = Bun.file('public/sitemap.xml');
const oldXml = await file.text();
const originMatch = oldXml.match(/<loc>(https:\/\/[^/]+)\//);
const origin = originMatch?.[1];
if (!origin) throw new Error('Existing sitemap origin missing');
const staticEntries = [...oldXml.matchAll(/<url>[\s\S]*?<\/url>/g)]
  .map(match => match[0]).filter(entry => !/<loc>[^<]*\/blogg\/[^/<]+\/[^<]+<\/loc>/.test(entry));
const escapeXml = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
const blogEntries = posts.filter(isIndexableBlogPost).map(post => {
  const timestamp = post.updated_at ?? post.published_at;
  const date = timestamp && !Number.isNaN(Date.parse(timestamp)) ? new Date(timestamp).toISOString().slice(0, 10) : null;
  return `<url><loc>${origin}/blogg/${escapeXml(post.category)}/${escapeXml(post.slug)}</loc>${date ? `<lastmod>${date}</lastmod>` : ''}<changefreq>monthly</changefreq><priority>0.7</priority></url>`;
});
await Bun.write(file, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...staticEntries, ...blogEntries].map(entry => `  ${entry}`).join('\n')}\n</urlset>\n`);
console.log(`Updated ${blogEntries.length} public article URLs; preserved ${staticEntries.length} other URLs and ${origin}.`);
