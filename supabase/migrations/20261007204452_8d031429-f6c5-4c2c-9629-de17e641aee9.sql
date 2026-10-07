UPDATE public.blog_posts
SET title = 'Kompletta guiden: så väljer företaget fruktleverantör (2026)',
    content = content || E'\n\n## Redo att komma igång?\n\nSe priser, storlekar och leveransområden på vår sida om [fruktkorg Stockholm](/fruktkorg-stockholm).\n'
WHERE slug = 'fruktkorg-stockholm-komplett-guide-foretag'
  AND position('](/fruktkorg-stockholm)' in content) = 0;