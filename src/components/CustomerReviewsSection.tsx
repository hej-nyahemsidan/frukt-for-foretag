import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from '@/components/ui/carousel';


const reviews = [
  {
    text: "Riktigt bra service! Härlig personal med god kundservice och utmärkt med lite frukt till kontoret!",
    author: "Olivia Nordman"
  },
  {
    text: "Superduktiga och härliga! Glad för frukten och energin jag får varje dag 🫶🏼",
    author: "Emmy Zachrisson"
  },
  {
    text: "Livsviktig på jobbet, räddat mig många gånger!",
    author: "Joel Yosief"
  },
  {
    text: "Vi har fått fruktkorgar från Vitaminkorgen i flera år nu och vi är lika nöjda än idag som vi var efter första leveransen vi fick.",
    author: "Claudio Leonide"
  }
];

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
  <div className="relative w-full max-w-2xl mx-auto">
    {/* Soft organic gradient art underneath */}
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-4 left-6 w-24 h-24 bg-gradient-to-br from-primary/30 to-secondary/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-4 right-8 w-20 h-20 bg-gradient-to-tl from-[hsl(28_85%_58%)]/30 to-primary/15 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-secondary/25 to-transparent rounded-full blur-lg"></div>
    </div>
    
    <Card className="bg-gradient-to-br from-white/98 via-white/95 to-[hsl(140_30%_97%)] backdrop-blur-lg border border-white/40 shadow-[0_12px_40px_-12px_hsl(142_30%_30%/0.15)] rounded-3xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_60px_-15px_hsl(142_30%_30%/0.2)]">
      <CardContent className="p-8 md:p-12 text-center">
        <div className="flex justify-center gap-1.5 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-6 h-6 fill-[hsl(40_90%_55%)] text-[hsl(40_90%_55%)] drop-shadow-md"
            />
          ))}
        </div>
        <blockquote className="text-lg md:text-xl text-foreground/90 mb-6 italic font-light leading-relaxed">
          "{review.text}"
        </blockquote>
        <cite className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary via-[hsl(145_40%_40%)] to-secondary bg-clip-text text-transparent">
          — {review.author}
        </cite>
      </CardContent>
    </Card>
  </div>
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
    <section className="py-20 sm:py-24 bg-gradient-to-br from-[hsl(45_30%_98%)] via-[hsl(140_25%_97%)] to-[hsl(28_40%_96%)] relative overflow-hidden min-h-screen flex items-center">
      {/* Soft organic gradient backgrounds */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-gradient-to-br from-primary/15 via-secondary/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] bg-gradient-to-tr from-[hsl(28_85%_58%)]/15 via-primary/8 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-bl from-secondary/12 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-60 h-60 bg-gradient-to-tr from-primary/15 to-transparent rounded-full blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-10 h-10 fill-[hsl(40_90%_55%)] text-[hsl(40_90%_55%)] drop-shadow-lg"
                />
              ))}
            </div>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight px-4 py-2">
            <span className="bg-gradient-to-r from-primary via-[hsl(145_40%_40%)] to-secondary bg-clip-text text-transparent">Vad våra kunder säger</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            <span className="font-bold text-foreground">5/5 stjärnor på alla våra recensioner sedan 2021!</span> Vi är stolta över vårt perfekta betyg på Google och håller alltid högsta standard för våra kunder. 
            Här är vad några av våra nöjda kunder säger om oss.
          </p>
        </div>

        {/* Review Carousel */}
        <div className="mb-16 px-4 sm:px-8">
          <Carousel 
            setApi={setApi}
            className="w-full"
            opts={{
              align: "center",
              loop: true,
            }}
          >
            <CarouselContent className="py-8">
              {reviews.map((review, index) => (
                <CarouselItem key={index}>
                  <div className="flex justify-center px-4">
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
                className={`transition-all duration-400 rounded-full ${
                  index === current 
                    ? 'w-8 h-3 bg-gradient-to-r from-primary to-secondary shadow-lg' 
                    : 'w-3 h-3 bg-primary/25 hover:bg-primary/40'
                }`}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviewsSection;