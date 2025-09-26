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
  <div className="flex gap-1 mb-8">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className="w-10 h-10 fill-yellow-400 text-yellow-400 drop-shadow-lg"
      />
    ))}
  </div>
);

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
  <Card className="w-full max-w-5xl mx-auto bg-gradient-to-br from-white/90 via-primary/5 to-secondary/5 backdrop-blur-sm border border-white/20 shadow-2xl rounded-3xl overflow-hidden">
    <CardContent className="p-10 md:p-16">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Text Content */}
        <div className="order-2 md:order-1">
          <StarRating />
          <blockquote className="text-2xl md:text-3xl lg:text-4xl text-foreground/90 mb-8 italic font-light leading-relaxed">
            "{review.text}"
          </blockquote>
          <cite className="text-xl md:text-2xl font-semibold text-primary">
            - {review.author}
          </cite>
        </div>
        
        {/* Avatar */}
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-lg opacity-50"></div>
            <img 
              src={review.avatar} 
              alt={review.author}
              className="relative w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full object-cover shadow-2xl ring-4 ring-white/60"
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
    }, 4500);

    return () => clearInterval(autoPlay);
  }, [api]);

  return (
    <section className="py-24 bg-gradient-to-br from-background via-primary/3 to-secondary/5 relative overflow-hidden min-h-screen flex items-center">
      {/* Abstract gradient backgrounds */}
      <div className="absolute inset-0">
        {/* Organic gradient shapes */}
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-gradient-to-br from-primary/20 via-secondary/15 to-transparent rounded-full blur-3xl transform rotate-12"></div>
        <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-gradient-to-tr from-secondary/20 via-primary/10 to-transparent rounded-full blur-3xl transform -rotate-12"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-bl from-primary/15 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-gradient-to-tr from-secondary/25 to-transparent rounded-full blur-xl"></div>
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
              href="https://maps.app.goo.gl/hHiMYPXkVQBd3fDL9"
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