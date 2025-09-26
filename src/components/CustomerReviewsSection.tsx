import React from 'react';
import { Star, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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

const StarRating = () => (
  <div className="flex gap-1 mb-4">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className="w-5 h-5 fill-yellow-400 text-yellow-400"
      />
    ))}
  </div>
);

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
  <Card className="h-full bg-gradient-to-br from-white to-fresh/5 backdrop-blur-sm border border-fresh/20 shadow-lg hover:shadow-xl hover:shadow-fresh/20 transition-all duration-300 hover:scale-105">
    <CardContent className="p-6">
      <StarRating />
      <blockquote className="text-charcoal/90 mb-4 italic font-medium">
        "{review.text}"
      </blockquote>
      <cite className="text-sm font-semibold text-forest">
        - {review.author}
      </cite>
    </CardContent>
  </Card>
);

const CustomerReviewsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-accent-lightgreen via-fresh/5 to-lightgreen relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-fresh rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-forest rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-accent-orange rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-8 h-8 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-forest mb-4">
            Vad våra kunder säger
          </h2>
          <p className="text-xl text-charcoal/80 max-w-2xl mx-auto font-medium">
            Vi är stolta över våra 5 stjärnor på Google och håller alltid hög standard för våra kunder. 
            Här är vad några av våra nöjda kunder säger om oss.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden mb-12">
          <Carousel className="w-full">
            <CarouselContent>
              {reviews.map((review, index) => (
                <CarouselItem key={index} className="pl-4">
                  <ReviewCard review={review} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>

        {/* Google Reviews Button */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-fresh to-forest hover:from-forest hover:to-fresh text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl hover:shadow-fresh/30 transition-all duration-300 hover:scale-105"
          >
            <a
              href="https://share.google/zH6hgOZS7XGevWsZ5"
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