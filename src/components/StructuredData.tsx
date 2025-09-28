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
    "telephone": "+46-8-123-45-67",
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
    "openingHours": [
      "Mo-Fr 08:00-17:00"
    ],
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
    "currenciesAccepted": "SEK"
  };

  const getStructuredData = () => {
    switch (type) {
      case 'products':
        return [
          baseOrganization,
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Fruktkorgar och kontorsprodukter",
            "description": "Vårt sortiment av färska fruktkorgar, drycker och snacks för kontoret",
            "numberOfItems": "50+",
            "itemListElement": [
              {
                "@type": "Product",
                "name": "Fruktkorg Premium",
                "description": "Premium fruktkorg med handplockade säsongsfrukter",
                "category": "Fruktkorgar",
                "brand": "Vitaminkorgen"
              },
              {
                "@type": "Product",
                "name": "Fruktkorg Standard",
                "description": "Standard fruktkorg med färska frukter för kontoret",
                "category": "Fruktkorgar",
                "brand": "Vitaminkorgen"
              }
            ]
          }
        ];
      
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