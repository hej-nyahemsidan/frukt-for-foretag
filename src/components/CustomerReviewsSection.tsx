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
    {/* Abstract gradient art underneath */}
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-2 left-4 w-20 h-20 bg-gradient-to-br from-primary/40 to-secondary/30 rounded-full blur-lg"></div>
      <div className="absolute bottom-3 right-6 w-16 h-16 bg-gradient-to-tl from-secondary/50 to-primary/20 rounded-full blur-md"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-gradient-to-r from-primary/30 to-transparent rounded-full blur-sm"></div>
    </div>
    
    <Card className="bg-gradient-to-br from-white/95 via-white/90 to-primary/5 backdrop-blur-md border border-white/30 shadow-xl rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
      <CardContent className="p-8 md:p-10 text-center">
        <div className="flex justify-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-6 h-6 fill-yellow-400 text-yellow-400 drop-shadow-lg"
            />
          ))}
        </div>
        <blockquote className="text-lg md:text-xl text-foreground/90 mb-6 italic font-light leading-relaxed">
          "{review.text}"
        </blockquote>
        <cite className="text-lg md:text-xl font-bold text-primary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
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
    <section className="py-20 sm:py-24 bg-gradient-to-br from-background via-primary/3 to-secondary/5 relative overflow-hidden min-h-screen flex items-center">
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
          <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight px-4 py-2">
            Vad våra kunder säger
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            <span className="font-bold text-foreground">5/5 stjärnor på alla våra recensioner sedan 2021!</span> Vi är stolta över vårt perfekta betyg på{" "}
            <a 
              href="https://www.google.com/search?sca_esv=3bbeda8844e2ec09&tbm=lcl&sxsrf=AE3TifPln30D3Uui1vlTRajPRXNFp1pEtA:1760618770804&q=Vitaminkorgen+i+Stockholm+-+Frukt+p%C3%A5+jobbet+Recensioner&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNDU3sLSwMDOwMLCwMDS2tDS1tNzAyPiK0SIssyQxNzMvO78oPTVPIVMhuCQ_OTsjPydXQVfBrag0u0Sh4PBShaz8pKTUEoWg1OTUvOLM_LzUokWsZGsFANIybPSRAAAA&rldimm=15709886080881399599&hl=sv-SE&sa=X&ved=2ahUKEwjttayD4KiQAxVvFBAIHSa6A7UQ9fQKegQIURAF&biw=1600&bih=864&dpr=1.8#lkt=LocalPoiReviews"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline font-semibold"
            >
              Google
            </a>{" "}
            och håller alltid högsta standard för våra kunder. 
            Här är vad några av våra nöjda kunder säger om oss.
          </p>
        </div>

        {/* Review Carousel */}
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
      </div>
    </section>
  );
};

export default CustomerReviewsSection;