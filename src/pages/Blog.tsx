import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const blogContent = {
  'frukt-pa-jobbet': {
    title: 'Därför ska du ha frukt på jobbet – en fräsch investering i välmående och energi',
    date: '2024-03-15',
    readTime: '5 min',
    content: `
      <p>
        Att erbjuda frukt på jobbet har blivit allt mer populärt bland företag i Stockholm – och det är lätt att förstå varför. En färsk fruktkorg på kontoret är inte bara en omtänksam gest mot personalen, utan också ett enkelt sätt att främja hälsa, energi och trivsel under arbetsdagen.
      </p>
      
      <h2>1. Mer energi och bättre fokus</h2>
      <p>
        Istället för att sträcka sig efter ännu en kopp kaffe eller en sockrig snack, ger frukt ett naturligt energitillskott som håller längre. Apelsiner, bananer, äpplen och päron innehåller vitaminer och fibrer som hjälper kroppen att orka mer – perfekt för eftermiddagens möten och deadlines.
      </p>
      
      <h2>2. Minskad sjukfrånvaro</h2>
      <p>
        Forskning visar att en kost rik på frukt och grönt stärker immunförsvaret. När dina medarbetare får i sig mer näring varje dag, minskar risken för förkylningar och andra sjukdomar. Frukt på jobbet kan alltså bidra till färre sjukdagar – en investering som snabbt lönar sig.
      </p>
      
      <h2>3. En starkare arbetskultur</h2>
      <p>
        En fruktkorg i fikarummet gör mer än att bara stilla hungern. Den skapar en naturlig mötesplats där kollegor kan ta en kort paus, snacka och ladda om. Små stunder av social kontakt bygger gemenskap och stärker teamkänslan.
      </p>
      
      <h2>4. Hållbar arbetsplats med omtanke</h2>
      <p>
        Att välja fruktleverans till kontoret i Stockholm från lokala aktörer visar att ditt företag bryr sig – både om medarbetarna och om miljön. På Vitaminkorgen jobbar vi med noga utvalda frukter, ofta ekologiska, och vi levererar direkt till er dörr.
      </p>
      
      <h2>Frukt på jobbet i Stockholm – enkelt med Vitaminkorgen</h2>
      <p>
        Vi på Vitaminkorgen levererar fräscha, handplockade fruktkorgar till företag i hela Stockholm. Oavsett om ni är ett mindre team eller ett större kontor, kan vi anpassa leveransen efter ert behov – varje vecka, varannan vecka eller enligt önskemål.
      </p>
      
      <h3>🎯 Vad du får med oss:</h3>
      <ul>
        <li>Alltid säsongens bästa frukt</li>
        <li>Möjlighet att välja till extra godsaker som nötter eller juicer</li>
        <li>Smidig leverans direkt till jobbet</li>
        <li>Personlig service och flexibla lösningar</li>
      </ul>
      
      <p>
        Vill du veta mer om hur frukt på jobbet i Stockholm kan göra skillnad för din arbetsplats?
      </p>
      <p>
        👉 Kontakta oss idag eller beställ en provkorg och upptäck fördelarna själv!
      </p>
    `
  },
  'frukt-som-mellanmal': {
    title: 'Frukt som mellanmål – en naturlig investering i din långsiktiga hälsa',
    date: '2024-03-10',
    readTime: '8 min',
    content: `
      <p>
        Att välja frukt som mellanmål är ett av de enklaste och mest effektiva sätten att förbättra sin hälsa – både på kort och lång sikt. Frukt är naturens egen snabbmat: färgglad, god, full av näring och redo att ätas precis som den är. Den innehåller vitaminer, mineraler, antioxidanter, fibrer och vatten – en komplett kombination för att hålla kroppen i balans och sinnet klart. I en värld där många kämpar med stress, stillasittande och snabba matval kan frukt vara en nyckel till att må bättre varje dag.
      </p>
      
      <h2>En jämn energinivå hela dagen</h2>
      <p>
        Till skillnad från processade snacks som ger en snabb blodsockerkick – följt av en energikrasch – ger frukt en mer stabil och hållbar energinivå. Det beror på att fruktens naturliga sockerarter, som fruktos och glukos, kombineras med fibrer och vatten, vilket gör att kroppen tar upp energin långsammare. Resultatet blir att du håller dig piggare längre, utan att känna dig slö eller trött efteråt. Bananer, päron, äpplen och citrusfrukter är särskilt bra exempel på frukter som ger långvarig energi – perfekta för en eftermiddag på jobbet eller mellan måltiderna.
      </p>
      
      <h2>Frukt och matsmältning</h2>
      <p>
        Fibrerna i frukt är viktiga för matsmältningen. De hjälper tarmen att arbeta regelbundet och minskar risken för förstoppning. Frukt som äpplen, päron och plommon innehåller lösliga fibrer som även hjälper till att balansera blodsockret och sänka kolesterolvärdet. En frisk tarm påverkar hela kroppen positivt – inklusive immunförsvaret, sömnen och till och med humöret.
      </p>
      
      <h2>Långsiktiga hälsofördelar</h2>
      <p>
        Regelbunden fruktkonsumtion är kopplad till minskad risk för flera av våra vanligaste livsstilssjukdomar, såsom typ 2-diabetes, hjärt- och kärlsjukdomar samt vissa former av cancer. Fruktens innehåll av antioxidanter och polyfenoler motverkar inflammation och oxidativ stress, som annars kan leda till kroniska sjukdomar. Dessutom hjälper frukt till att hålla blodtrycket i schack, tack vare sitt naturligt låga natriuminnehåll och höga nivåer av kalium – särskilt i frukter som banan, melon och apelsin.
      </p>
      
      <h2>Stöd för hjärnan och det mentala välmåendet</h2>
      <p>
        Frukt påverkar inte bara kroppen, utan även sinnet. Bananer innehåller vitamin B6, som behövs för att producera serotonin – ett hormon som påverkar humöret positivt. Blåbär är fulla av antioxidanter som visat sig kunna förbättra minnesförmåga och koncentration. Citrusfrukter som apelsin och clementin ger inte bara en fräsch känsla – de ger också ett rejält tillskott av C-vitamin som minskar stress och trötthet. Med andra ord: frukt är bra bränsle för både kroppen och hjärnan.
      </p>
      
      <h2>Bra för immunförsvaret</h2>
      <p>
        När du äter frukt dagligen får du i dig viktiga vitaminer och mineraler som hjälper kroppen att stå emot infektioner. C-vitamin, som finns i exempelvis kiwi, apelsin, jordgubbar och mango, stärker immunförsvaret och kan göra att du återhämtar dig snabbare från förkylningar. Frukt innehåller även zink, magnesium och andra näringsämnen som kroppen behöver för att hålla sig stark året om.
      </p>
      
      <h2>Frukt och viktbalans</h2>
      <p>
        Många oroar sig för sockerinnehållet i frukt, men det är oftast obefogat. Till skillnad från processat socker i kakor och godis innehåller frukt även fibrer, vatten och näring, vilket gör att du blir mätt på ett helt annat sätt. Frukt är energisnål mat som ger mycket näring per kalori – ett perfekt mellanmål om du vill gå ner i vikt eller bara behålla en hälsosam balans. Frukt som mellanmål kan minska behovet av onödiga småätanden och stilla sötsuget på ett mer naturligt sätt.
      </p>
      
      <h2>Frukt främjar sunda vanor</h2>
      <p>
        Att äta frukt regelbundet kan också skapa en positiv kedjereaktion. När du börjar göra hälsosamma val i vardagen, som att ta ett äpple istället för en kanelbulle, blir det ofta lättare att göra fler bra val. Du kanske känner dig mer energisk och orkar träna, eller sover bättre på natten. Frukt fungerar alltså ofta som en startpunkt för bättre vanor överlag.
      </p>
      
      <h2>Frukt och hållbarhet</h2>
      <p>
        Förutom de personliga hälsofördelarna är frukt också ett mer hållbart val jämfört med många andra snacks. Särskilt säsongsanpassad och närodlad frukt har låg klimatpåverkan och kräver mindre resurser att producera än exempelvis kött, mejerivaror eller förpackade mellanmål. Genom att välja frukt stödjer du även ofta mindre jordbruk och bidrar till en mer hållbar matkultur.
      </p>
      
      <h2>Så får du in mer frukt i vardagen</h2>
      <ul>
        <li>Ha alltid en fruktskål framme – synlig frukt lockar till spontana val</li>
        <li>Skär upp frukt på morgonen och ta med i en matlåda</li>
        <li>Gör smoothies av frukt och bär – perfekt till frukost eller mellis</li>
        <li>Frys in fruktbitar som ett svalkande snack på sommaren</li>
        <li>Blanda frukt med nötter eller yoghurt för ett komplett mellanmål</li>
      </ul>
      
      <h2>Sammanfattning</h2>
      <p>
        Frukt är ett av de mest tillgängliga, prisvärda och hälsosamma livsmedel vi har. Det är lätt att bära med sig, enkelt att förbereda och passar alla – oavsett ålder eller livsstil. Att göra frukt till en självklar del av vardagen är ett smart val för dig som vill ha mer energi, bättre fokus och en starkare kropp. På lång sikt kan det bidra till ett friskare liv, med färre sjukdagar, bättre matsmältning och mindre risk för livsstilsrelaterade sjukdomar. Det är helt enkelt en vana värd att hålla fast vid.
      </p>
    `
  },
  'blommor-vaxter-jobbet': {
    title: 'Blommor & växter till jobbet – enkelt med Vitaminkorgen 🌸',
    date: '2024-03-05',
    readTime: '3 min',
    content: `
      <p>
        Visste du att vi på Vitaminkorgen även erbjuder uthyrning av blommor och växter till företag? Det är en smidig och uppskattad tjänst som gör arbetsmiljön både trevligare och mer levande – utan att ni behöver tänka på skötsel eller inköp.
      </p>
      
      <p>
        Vi levererar fräscha växter och vackra blomsterarrangemang till ert kontor, entré eller fikarum. Allt sköts automatiskt, och ni kan enkelt pausa tjänsten när det behövs – till exempel under semestertider. Behöver ni lägga till extra blommor till någon som fyller år eller ska avtackas? Inga problem – det fixar vi med ett enkelt meddelande.
      </p>
      
      <h2>🌿 Så funkar det:</h2>
      <ul>
        <li>Vi levererar blommor & växter efter överenskommelse</li>
        <li>Regelbunden uppdatering och utbyte så allt håller sig fräscht</li>
        <li>Ni kan pausa, justera eller lägga till när ni vill</li>
        <li>Perfekt för att skapa en trivsam och välkomnande miljö</li>
      </ul>
      
      <p>
        Tjänsten passar företag som vill ha det snyggt och ombonat utan att behöva tänka på vattning, jord eller vissna blad. Vi tar hand om allt – ni bara njuter av grönskan.
      </p>
      
      <p>
        Vill du veta mer? Kontakta oss så berättar vi mer om våra lösningar för blommor och växter på jobbet!
      </p>
    `
  }
};

const Blog = () => {
  const { slug } = useParams();
  
  if (!slug || !blogContent[slug as keyof typeof blogContent]) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-3xl font-bold text-charcoal mb-4">Bloggpost hittades inte</h1>
            <p className="text-gray-600 mb-8">Den bloggpost du letar efter finns inte.</p>
            <Link to="/">
              <Button>Tillbaka till startsidan</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const post = blogContent[slug as keyof typeof blogContent];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-secondary hover:text-secondary/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tillbaka till startsidan</span>
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-charcoal leading-tight mb-6">
              {post.title}
            </h1>
            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} läsning</span>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            <div 
              className="text-gray-700 leading-relaxed [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-charcoal [&>h2]:mt-12 [&>h2]:mb-6 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-charcoal [&>h3]:mt-8 [&>h3]:mb-4 [&>p]:mb-6 [&>ul]:mb-6 [&>ul]:pl-6 [&>li]:mb-2 [&>li]:list-disc"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Contact CTA */}
          <div className="mt-16 p-8 bg-lightgreen rounded-2xl text-center">
            <h3 className="text-2xl font-semibold text-charcoal mb-4">
              Intresserad av våra tjänster?
            </h3>
            <p className="text-gray-700 mb-6">
              Kontakta oss idag för att få veta mer om hur vi kan hjälpa er företag med färsk frukt, blommor och växter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/kontakt">
                <Button size="lg" className="w-full sm:w-auto">
                  Kontakta oss
                </Button>
              </Link>
              <Link to="/offertforfragan">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Begär offert
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;