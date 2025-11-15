-- Ensure blog_posts table exists with correct structure
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  category TEXT CHECK (category IN ('tips', 'recept')),
  author TEXT DEFAULT 'Vitaminkorgen',
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample blog posts (avoid duplicates with ON CONFLICT)
INSERT INTO public.blog_posts (title, slug, content, excerpt, category, author, published, published_at) 
VALUES 
(
  '10 Hälsofördelar med Färsk Frukt på Kontoret',
  '10-halsofordelar-med-farsk-frukt-pa-kontoret',
  'Färsk frukt på kontoret är inte bara gott, det har också många hälsofördelar. Här är 10 anledningar att investera i fruktkorgar för dina anställda...

1. **Ökar energinivåerna** - Naturligt fruktsocker ger långvarig energi utan krascher
2. **Förbättrar koncentrationen** - Vitaminer och mineraler stödjer hjärnfunktionen
3. **Stärker immunförsvaret** - C-vitamin och antioxidanter skyddar mot sjukdomar
4. **Minskar stress** - Fruktsyror och magnesium har lugnande effekter
5. **Främjar god matspjälkning** - Fibrer håller magen i trim
6. **Hjälper viktkontrollen** - Nyttig mellanmål istället för godis
7. **Förbättrar humöret** - Naturliga sockrer påverkar serotoninnivåerna positivt
8. **Ger bättre sömn** - Vissa frukter innehåller melatonin
9. **Stärker teamkänslan** - Gemensam fruktstund skapar samhörighet
10. **Visar att företaget bryr sig** - Investering i medarbetarnas hälsa uppskattas

Vill du veta mer om hur frukt kan förbättra er arbetsmiljö? Kontakta oss på Vitaminkorgen!',
  'Upptäck hur färsk frukt kan förbättra hälsan och produktiviteten på din arbetsplats.',
  'tips',
  'Vitaminkorgen',
  true,
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.blog_posts (title, slug, content, excerpt, category, author, published, published_at) 
VALUES 
(
  'Recept: Energigivande Fruktsmothie',
  'recept-energigivande-fruktsmothie',
  'Denna smoothie är perfekt för att kickstarta dagen eller som mellanmål på kontoret.

## Ingredienser (2 portioner)
- 1 mogen banan
- 1 äpple (gärna sött, som Royal Gala)
- En handfull blåbär (fryst eller färskt)
- 2 dl havregryn
- 3 dl mjölk (eller växtbaserad alternativ)
- 1 msk honung
- 1 tsk kanel
- Isbit efter smak

## Instruktioner
1. Skölj frukten noga
2. Skär bananen och äpplet i bitar (kärna ur äpplet)
3. Lägg alla ingredienser i en mixer
4. Mixa i 30-60 sekunder tills det blir slätt
5. Häll upp i glas och njut direkt!

## Tips
- Frys bananer i skivor för extra krämig konsistens
- Byt ut blåbär mot andra bär för variation
- Tillsätt en matsked jordnötssmör för extra protein
- Toppa med granola och färska bär för extra lyxkänsla

Denna smoothie ger energi i flera timmar och är perfekt att dela med kollegor!',
  'En enkel och näringsrik smoothie som ger energi hela dagen.',
  'recept',
  'Vitaminkorgen',
  true,
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Admin sees all" ON public.blog_posts;
DROP POLICY IF EXISTS "Public sees published" ON public.blog_posts;
DROP POLICY IF EXISTS "Admin full access" ON public.blog_posts;
DROP POLICY IF EXISTS "Public can read published posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins manage everything" ON public.blog_posts;
DROP POLICY IF EXISTS "Public reads published" ON public.blog_posts;

-- Create simple, working policies
CREATE POLICY "Admin sees all" 
ON public.blog_posts 
FOR ALL 
USING (auth.email() = 'admin@vitaminkorgen.se')
WITH CHECK (auth.email() = 'admin@vitaminkorgen.se');

CREATE POLICY "Public sees published" 
ON public.blog_posts 
FOR SELECT 
USING (published = true);