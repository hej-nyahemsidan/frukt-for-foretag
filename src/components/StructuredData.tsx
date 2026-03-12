import { useLocation } from 'react-router-dom';

interface StructuredDataProps {
  type?: 'homepage' | 'products' | 'contact' | 'about';
}

const StructuredData = ({ type = 'homepage' }: StructuredDataProps) => {
  const location = useLocation();

  const baseOrganization = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Vitaminkorgen AB",
    "alternateName": "Fruktexperten",
    "description": "Vi levererar färska fruktkorgar på jobbet i Stockholm. Handplockade fruktkorgar direkt till kontoret varje vecka.",
    "url": "https://vitaminkorgen.se",
    "telephone": "+46-10-183-98-36",
    "email": "info@vitaminkorgen.se",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Varuvägen 9",
      "addressLocality": "Älvsjö",
      "postalCode": "125 30",
      "addressRegion": "Stockholm",
      "addressCountry": "SE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "59.2472",
      "longitude": "17.9918"
    },
    "openingHours": ["Mo-Fr 08:00-17:00"],
    "areaServed": {
      "@type": "City",
      "name": "Stockholm"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "59.3293",
        "longitude": "18.0686"
      },
      "geoRadius": "50"
    },
    "sameAs": [
      "https://www.facebook.com/vitaminkorgen",
      "https://www.instagram.com/vitaminkorgen",
      "https://www.linkedin.com/company/vitaminkorgen"
    ],
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Credit Card", "Invoice"],
    "currenciesAccepted": "SEK",
    "image": "https://vitaminkorgen.se/fruktexperten-logo.png",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "47",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Anna Svensson" },
        "datePublished": "2025-09-15",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Fantastisk service! Fruktkorgar levereras alltid i tid och frukterna är så färska. Våra medarbetare älskar dem!"
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Lars Andersson" },
        "datePublished": "2025-10-02",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Har använt Vitaminkorgen i över ett år. Otroligt bra kvalitet och professionell leverans varje vecka."
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Maria Johansson" },
        "datePublished": "2025-11-10",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Bästa fruktleveransen i Stockholm! Handplockat urval och alltid perfekt mogna frukter. Rekommenderar starkt!"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Hur fungerar fruktkorgar på jobbet från Vitaminkorgen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vi levererar färska fruktkorgar direkt till ert kontor i Stockholm varje vecka. Ni väljer storlek och leveransdag, sedan sköter vi resten. Flexibla avtal som kan pausas vid semester."
        }
      },
      {
        "@type": "Question",
        "name": "Vilka områden levererar ni fruktkorgar till?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vi levererar fruktkorgar på jobbet till hela Stockholm, Södertälje och Uppsala – fri leverans överallt."
        }
      },
      {
        "@type": "Question",
        "name": "Kan vi få en provleverans av fruktkorg på kontoret?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolut! Testa våra fruktkorgar i två veckor helt gratis. Inget krångel."
        }
      },
      {
        "@type": "Question",
        "name": "Hur mycket kostar fruktkorgar från Vitaminkorgen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Priserna för våra fruktkorgar på jobbet börjar från 230 kr per vecka. Se alla priser på vår hemsida eller kontakta oss för en skräddarsydd offert baserad på antal medarbetare."
        }
      },
      {
        "@type": "Question",
        "name": "Kan man anpassa fruktkorgar efter allergier?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Självklart! Vi skapar skräddarsydda fruktkorgar där vi tar bort specifika frukter och ersätter dem med andra. Bara meddela oss vid beställning eller i kundportalen."
        }
      },
      {
        "@type": "Question",
        "name": "Kan man lägga till andra varor som mjölk eller kaffe till leveranserna?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, det går utmärkt! Du kan enkelt lägga till andra varor via din inloggning till kundportalen eller kontakta vår kundservice så hjälper vi dig."
        }
      },
      {
        "@type": "Question",
        "name": "Vad är minsta beställning för fruktkorgar på jobbet?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vår minsta leverans är en fruktkorg från 4kg per vecka."
        }
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Fruktkorgar till kontor",
    "name": "Fruktabonnemang för företag",
    "description": "Veckovis leverans av färska, handplockade fruktkorgar direkt till ert kontor i Stockholm. Flexibla abonnemang som kan pausas när ni vill.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Vitaminkorgen AB",
      "url": "https://vitaminkorgen.se",
      "telephone": "+46-10-183-98-36",
      "priceRange": "$$",
      "image": "https://vitaminkorgen.se/fruktexperten-logo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Varuvägen 9",
        "addressLocality": "Älvsjö",
        "postalCode": "125 30",
        "addressRegion": "Stockholm",
        "addressCountry": "SE"
      }
    },
    "areaServed": [
      { "@type": "City", "name": "Stockholm" },
      { "@type": "City", "name": "Södertälje" },
      { "@type": "City", "name": "Uppsala" }
    ],
    "termsOfService": "https://vitaminkorgen.se/villkor",
    "offers": {
      "@type": "Offer",
      "description": "Testa gratis i 2 veckor",
      "price": "0",
      "priceCurrency": "SEK",
      "eligibleDuration": { "@type": "QuantitativeValue", "value": "2", "unitCode": "WEE" }
    }
  };

  const productSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Fruktkorg Original",
      "description": "Fruktkorg med blandade säsongsfrukter, ca 4 kg. Perfekt för mindre kontor.",
      "image": "https://vitaminkorgen.se/assets/fruktkorg-standard-new.jpg",
      "sku": "VK-ORIGINAL-4KG",
      "brand": { "@type": "Brand", "name": "Vitaminkorgen" },
      "category": "Fruktkorgar",
      "url": "https://vitaminkorgen.se/produkter",
      "offers": {
        "@type": "Offer",
        "price": "230",
        "priceCurrency": "SEK",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2026-12-31",
        "url": "https://vitaminkorgen.se/produkter",
        "seller": { "@type": "Organization", "name": "Vitaminkorgen AB" }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "47",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Anna Svensson" },
        "datePublished": "2025-09-15",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Fantastisk service! Fruktkorgar levereras alltid i tid och frukterna är så färska."
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Fruktkorg Premium",
      "description": "Premium fruktkorg med handplockade exotiska och lokala frukter, ca 6 kg.",
      "image": "https://vitaminkorgen.se/assets/fruktkorg-premium-new.jpg",
      "sku": "VK-PREMIUM-6KG",
      "brand": { "@type": "Brand", "name": "Vitaminkorgen" },
      "category": "Fruktkorgar",
      "url": "https://vitaminkorgen.se/produkter",
      "offers": {
        "@type": "Offer",
        "price": "340",
        "priceCurrency": "SEK",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2026-12-31",
        "url": "https://vitaminkorgen.se/produkter",
        "seller": { "@type": "Organization", "name": "Vitaminkorgen AB" }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "47",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Lars Andersson" },
        "datePublished": "2025-10-02",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Har använt Vitaminkorgen i över ett år. Otroligt bra kvalitet och professionell leverans varje vecka."
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Fruktkorg Supreme",
      "description": "Premium ekologisk fruktkorg med certifierade KRAV-frukter, ca 5 kg.",
      "image": "https://vitaminkorgen.se/assets/fruktkorg-eko-new.jpg",
      "sku": "VK-SUPREME-5KG",
      "brand": { "@type": "Brand", "name": "Vitaminkorgen" },
      "category": "Fruktkorgar",
      "url": "https://vitaminkorgen.se/produkter",
      "offers": {
        "@type": "Offer",
        "price": "295",
        "priceCurrency": "SEK",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2026-12-31",
        "url": "https://vitaminkorgen.se/produkter",
        "seller": { "@type": "Organization", "name": "Vitaminkorgen AB" }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "47",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Maria Johansson" },
        "datePublished": "2025-11-10",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Bästa fruktleveransen i Stockholm! Handplockat urval och alltid perfekt mogna frukter."
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Fruktkorg Banan",
      "description": "Fruktkorg med enbart bananer, ca 5 kg. Populärt val för aktiva kontor.",
      "image": "https://vitaminkorgen.se/assets/fruktkorg-banan-new.jpg",
      "sku": "VK-BANAN-5KG",
      "brand": { "@type": "Brand", "name": "Vitaminkorgen" },
      "category": "Fruktkorgar",
      "url": "https://vitaminkorgen.se/produkter",
      "offers": {
        "@type": "Offer",
        "price": "199",
        "priceCurrency": "SEK",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2026-12-31",
        "url": "https://vitaminkorgen.se/produkter",
        "seller": { "@type": "Organization", "name": "Vitaminkorgen AB" }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "47",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Erik Lindberg" },
        "datePublished": "2025-12-05",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Perfekt för vårt gym-kontor! Bananerna är alltid fräscha och leveransen pålitlig."
      }
    }
  ];

  const getStructuredData = () => {
    switch (type) {
      case 'products':
        return [baseOrganization, serviceSchema, faqSchema, ...productSchemas];

      case 'contact':
        return [
          baseOrganization,
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Kontakta Vitaminkorgen",
            "description": "Kontakta oss för offert på fruktkorgar till ert kontor i Stockholm"
          }
        ];

      case 'about':
        return [
          baseOrganization,
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "Om Vitaminkorgen",
            "description": "Sedan 2021 har vi hjälpt över 150 företag att öka välmående och produktivitet genom färska fruktkorgar."
          }
        ];

      default:
        return [
          baseOrganization,
          faqSchema,
          serviceSchema,
          ...productSchemas,
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Vitaminkorgen - Fruktkorgar Stockholm",
            "url": "https://vitaminkorgen.se",
            "description": "Vi levererar färska fruktkorgar på jobbet i Stockholm. Handplockade fruktkorgar direkt till kontoret varje vecka.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://vitaminkorgen.se/produkter?search={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        ];
    }
  };

  const structuredDataArray = getStructuredData();

  return (
    <>
      {structuredDataArray.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
};

export default StructuredData;
