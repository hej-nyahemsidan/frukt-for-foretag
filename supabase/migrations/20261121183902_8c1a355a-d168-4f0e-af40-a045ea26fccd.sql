UPDATE public.blog_posts SET content = regexp_replace(content, '\| Antal medarbetare \| Rekommendation \| Leveranser/vecka \|[\s\S]*?\n\n### Priser', E'| Antal personer på plats | Mängd som utgångspunkt | Planering |\n| --- | --- | --- |\n| 5–12 | Cirka 6–7 kg frukt | Anpassa efter närvaro och åtgång |\n| Fler än 12 | Be om ett anpassat förslag | Kundservice hjälper er med mängd och leveransdagar |\n\nRiktlinjen är ingen garanti för hur länge frukten räcker. Följ upp de första leveranserna och justera efter behov.\n\n### Priser'), updated_at=now() WHERE slug='fruktlada-till-kontoret-storlekar-priser' AND category='tips';
UPDATE public.blog_posts SET content = regexp_replace(content, '\| Antal medarbetare \| Storlek per vecka \| Tips \|[\s\S]*?\n\n## Så vet du', E'| Antal personer på plats | Mängd som utgångspunkt | Tips |\n|---|---|---|\n| 5–12 | Cirka 6–7 kg frukt | Anpassa efter närvaro och åtgång |\n| Fler än 12 | Ett anpassat förslag | Kundservice hjälper er med mängd och leveransdagar |\n\nCirka 6–7 kg för 5–12 personer är en riktlinje, inte en garanti för hur länge frukten räcker. Behovet beror på närvaro, åtgång och hur ofta ni får leverans.\n\n## Så vet du'), updated_at=now() WHERE slug='hur-manga-racker-en-fruktkorg' AND category='tips';
UPDATE public.blog_posts SET content = regexp_replace(regexp_replace(content, 'Efter mer än tio år som', 'Som'), '\| Antal medarbetare \| Rekommenderad korg \| Frekvens \|[\s\S]*?\n\nDet är ungefärliga siffror\.', E'| Antal personer på plats | Mängd som utgångspunkt | Planering |\n|---|---|---|\n| 5–12 | Cirka 6–7 kg frukt | Anpassa efter närvaro och åtgång |\n| Fler än 12 | Be om ett anpassat förslag | Kundservice hjälper er med mängd och leveransdagar |\n\nDet är ungefärliga siffror.'), updated_at=now() WHERE slug='hur-mycket-frukt-behovs-till-kontor' AND category='tips';
UPDATE public.blog_posts SET content=$article$## Vad kostar en fruktkorg på jobbet 2026?

Vitaminkorgens sortiment börjar **från 140 kr**. Det är ett frånpris för sortimentet, inte ett fast pris för alla korgar eller för 6–7 kg frukt. Den totala kostnaden beror på vilken produkt, storlek och hur många leveranser ni väljer.

### Priser för fruktkorgar

Våra huvudkorgar heter **Original, Premium och Banan**. Som exempel finns Original 4 kg från 220 kr, Premium 4 kg från 250 kr och Banan från 230 kr per leverans. Se [aktuella priser och storlekar](/produkter) innan ni beställer.

Fri leverans ingår. Pant och moms tillkommer på fakturan; vi lägger inte på dem i prisguiden. Ni får månadsfaktura.

### Vad påverkar priset?

- **Produkt och innehåll:** välj den korg som passar kontoret.
- **Storlek och antal korgar:** anpassa efter hur många som är på plats.
- **Leveransdagar:** planera efter er faktiska åtgång.
- **Tillbehör:** fika, mejeri och catering beställs efter behov.

### Hur mycket frukt behöver vi?

Räkna med **cirka 6–7 kg frukt för 5–12 personer** som utgångspunkt. Det är en riktlinje, inte en garanti för hur länge frukten räcker. Följ upp efter de första leveranserna och anpassa efter närvaro och åtgång.

Läs vår [storleksguide](/blogg/tips/hur-manga-racker-en-fruktkorg) eller be kundservice om hjälp.

### Jämför egen inköpsrunda med fruktservice

När ni jämför alternativ behöver ni räkna in både inköpet och tiden för att handla, transportera och placera frukten. Med vår service väljer ni startdatum och leveransdagar, och vi levererar när ni vill börja. Vi kan placera frukt och mjölk där ni önskar enligt ert upplägg.

### Prova innan ni bestämmer er

**Första korgen är gratis.** [Begär en gratis offert](/kontakt) så hjälper vi er att välja mängd och upplägg. En offertförfrågan är inte en beställning. Villkor för ett abonnemang finns i [våra villkor](/villkor).

### Mer än frukt

Vi hjälper även till med fika, bullar, tårta, smörgåsar och frallor till kontoret, både som catering och som vanliga beställningar. Egen kundportal och kundservice gör det enklare att samla inköpen.

Läs mer om [frukt till jobbet](/fruktkorg-pa-jobbet) och [fruktkorg Stockholm](/fruktkorg-stockholm).
$article$, excerpt='Vad kostar frukt på jobbet? Frånpris 140 kr, aktuella produktpriser och råd om mängd, leverans och månadsfaktura för kontoret.', updated_at=now() WHERE slug='vad-kostar-fruktkorg-pa-jobbet-2026' AND category='tips';
UPDATE public.blog_posts SET content=$article$## Prisguide för fruktkorg på kontoret

Vitaminkorgens sortiment börjar **från 140 kr**. Frånpriset gäller sortimentet och ska inte tolkas som ett fast pris för 6–7 kg frukt. För aktuella val, läs [priserna i webshoppen](/produkter) och vår sida om [fruktkorg Stockholm](/fruktkorg-stockholm).

## Våra huvudkorgar

**Original, Premium och Banan** är våra huvudkorgar. Original 4 kg finns från 220 kr, Premium 4 kg från 250 kr och Banan från 230 kr per leverans. Priset varierar med produkt och storlek. Kontrollera alltid aktuellt pris när ni beställer.

## Vad ingår och hur betalar vi?

Fri leverans ingår och ni får månadsfaktura. Pant och moms tillkommer på fakturan. Ni väljer startdatum och vi levererar när ni vill börja.

## Planera mängden innan ni jämför kostnader

Vår riktlinje är **cirka 6–7 kg frukt för 5–12 personer**. Behovet beror på närvaro, åtgång och hur ofta ni får leverans. För större kontor hjälper kundservice er att välja ett upplägg; det finns ingen mängd som passar alla arbetsplatser.

Se vår [storleksguide](/blogg/tips/hur-manga-racker-en-fruktkorg). Följ upp efter de första leveranserna och justera mängden när behoven ändras.

## Så jämför ni offerter

- Jämför samma produkt, storlek och antal leveranser.
- Kontrollera vad som ingår i leveransen och vad som tillkommer på fakturan.
- Läs villkoren för ändringar och abonnemang.
- Räkna även med tiden som går åt om någon på kontoret handlar själv.

Vi publicerar inte obekräftade konkurrentpriser eller löften om att frukt räcker ett visst antal dagar. Be om en offert som passar just ert kontor.

## Mer än fruktkorgar

Vi levererar även fika, bullar, mejeri och skivad frukt. Vi hjälper till med catering såsom tårta, smörgåsar, mackor och frallor till möten. Egen kundportal och kundservice gör det enklare att samordna vanliga och extra beställningar.

## Vanliga frågor

### Vad kostar en fruktkorg?
Sortimentet börjar från 140 kr. Det aktuella priset för er beställning beror på vald produkt, storlek och antal leveranser. Se [sortimentet](/produkter).

### Hur mycket frukt behöver vi?
Cirka 6–7 kg för 5–12 personer är vår riktlinje. Anpassa efter närvaro och åtgång med hjälp av kundservice.

### Kan vi prova först?
Ja, första korgen är gratis. [Begär en gratis offert](/kontakt) för att diskutera rätt upplägg. Offertförfrågan är inte en beställning.

### Vilka villkor gäller?
Läs [våra villkor](/villkor) innan ni beställer ett abonnemang.

## Nästa steg

Se [fruktkorg till företag](/fruktkorg-foretag), [fruktlåda till företag](/fruktlada) eller [kontakta oss](/kontakt) för ett förslag utifrån era behov.
$article$, excerpt='Planera kostnaden för fruktkorg till kontoret: frånpris 140 kr, rätt mängd, fri leverans, månadsfaktura och aktuella priser i webshoppen.', updated_at=now() WHERE category='tips' AND slug IN ('fruktkorg-stockholm-pris-2026','vad-kostar-fruktkorg-stockholm-prisguide-2026');