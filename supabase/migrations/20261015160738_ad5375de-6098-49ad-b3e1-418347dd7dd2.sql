UPDATE public.blog_posts SET content = replace(replace(content,
'| 5–8 | 4 kg | En korg per vecka räcker oftast |\n| 10–15 | 6 kg | Vanligast för mindre kontor |',
'| 5–12 | ca 6–7 kg | Vår tumregel för mindre kontor |\n| 12–20 | 9 kg | Vanligast för växande kontor |'),
'[Begär gratis offert](/kontakt)',
E'## Mer än frukt\n\nVi levererar även fika, bullar, tårta, smörgåsar, mackor och frallor – både som catering till möten och som vanliga beställningar. Alla kunder får en egen kundportal och personlig kundservice.\n\n[Begär gratis offert](/kontakt)')
WHERE slug = 'hur-manga-racker-en-fruktkorg';