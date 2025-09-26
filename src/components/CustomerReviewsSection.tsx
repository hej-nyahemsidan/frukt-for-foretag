import React, { useEffect, useState } from 'react';
import { Star, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from '@/components/ui/carousel';
import avatarOlivia from '@/assets/avatar-olivia.jpg';
import avatarEmmy from '@/assets/avatar-emmy.jpg';
import avatarJoel from '@/assets/avatar-joel.jpg';
import avatarClaudio from '@/assets/avatar-claudio.jpg';

const reviews = [
  {
    text: "Riktigt bra service! Härlig personal med god kundservice och utmärkt med lite frukt till kontoret!",
    author: "Olivia Nordman",
    avatar: avatarOlivia
  },
  {
    text: "Superduktiga och härliga! Glad för frukten och energin jag får varje dag 🫶🏼",
    author: "Emmy Zachrisson",
    avatar: avatarEmmy
  },
  {
    text: "Livsviktig på jobbet, räddat mig många gånger!",
    author: "Joel Yosief",
    avatar: avatarJoel
  },
  {
    text: "Vi har fått fruktkorgar från Vitaminkorgen i flera år nu och vi är lika nöjda än idag som vi var efter första leveransen vi fick.",
    author: "Claudio Leonide",
    avatar: avatarClaudio
  }
];

const StarRating = () => (
  <div className="flex gap-2 mb-6">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className="w-8 h-8 fill-gradient-to-r from-yellow-400 to-orange-400 text-yellow-400 drop-shadow-sm"
      />
    ))}
  </div>
);

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
  <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-green-50 via-orange-50 to-green-100 border-0 shadow-2xl rounded-3xl overflow-hidden">
    <CardContent className="p-8 md:p-12">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Text Content */}
        <div className="order-2 md:order-1">
          <StarRating />
          <blockquote className="text-xl md:text-2xl text-foreground/90 mb-6 italic font-light leading-relaxed">
            "{review.text}"
          </blockquote>
          <cite className="text-lg font-semibold text-primary">
            - {review.author}
          </cite>
        </div>
        
        {/* Avatar */}
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-sm opacity-30"></div>
            <img 
              src={review.avatar} 
              alt={review.author}
              className="relative w-48 h-48 md:w-56 md:h-56 rounded-full object-cover shadow-xl ring-4 ring-white/50"
            />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const CustomerReviewsSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    // Auto-play functionality
    const autoPlay = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000);

    return () => clearInterval(autoPlay);
  }, [api]);

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-10 h-10 fill-yellow-400 text-yellow-400 drop-shadow-lg"
                />
              ))}
            </div>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Vad våra kunder säger
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Vi är stolta över våra 5 stjärnor på Google och håller alltid hög standard för våra kunder. 
            Här är vad några av våra nöjda kunder säger om oss.
          </p>
        </div>

        {/* Single Review Carousel */}
        <div className="mb-16">
          <Carousel 
            setApi={setApi}
            className="w-full"
            opts={{
              align: "center",
              loop: true,
            }}
          >
            <CarouselContent>
              {reviews.map((review, index) => (
                <CarouselItem key={index}>
                  <div className="flex justify-center">
                    <ReviewCard review={review} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-8 gap-3">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === current 
                    ? 'bg-primary shadow-lg scale-125' 
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
        </div>

        {/* Google Reviews Button */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground px-10 py-6 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <a
              href="https://www.google.com/search?sca_esv=6fbc5b85f7533cfa&rlz=1C5CHFA_enSE1126SE1128&uds=AOm0WdE2fekQnsyfYEw8JPYozOKzfl40QptZ7MXLZb4siiCsw-as-8RddsKtLw2yiePDaTHL92LTh4CLn9IsluB0VyRv9_FlEKvLVfiUvsuRIJYEuaGir36t3QbRfcoukUVA0zbmV0CBzHr1IDacMYeFTxtvvqcGfwhtjZP54Ta9FN50MnIJuUeQjnDxkQcXf6MA41tt3g5G&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E3yhgpTOU0Jq5Iak9AL4XGxA9UY4rzdViwab-MwNaagG51K8AO1XyaZNEmVjWwAUjUiJiDM%3D&q=Vitaminkorgen+i+Stockholm+-+Frukt+p%C3%A5+jobbet+Recensioner&sa=X&ved=2ahUKEwjXxcHHt_ePAxWbLBAIHRicGZgQ3PALegQIUhAF&biw=1600&bih=812&dpr=1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3"
            >
              Läs alla recensioner på Google
              <ExternalLink className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviewsSection;