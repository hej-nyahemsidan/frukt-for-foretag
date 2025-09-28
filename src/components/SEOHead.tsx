import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import StructuredData from './StructuredData';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: 'homepage' | 'products' | 'contact' | 'about';
  noindex?: boolean;
}

const SEOHead = ({ 
  title, 
  description, 
  keywords,
  image = '/opengraph-image.png',
  type = 'homepage',
  noindex = false 
}: SEOHeadProps) => {
  const location = useLocation();
  const baseUrl = 'https://vitaminkorgen.se';
  const fullUrl = `${baseUrl}${location.pathname}`;
  
  // Default SEO values based on page type
  const getDefaultSEO = () => {
    const defaults = {
      homepage: {
        title: 'Fruktkorgar Stockholm - Fruktkorg på kontoret | Vitaminkorgen',
        description: 'Vi levererar färska fruktkorgar på jobbet i Stockholm. Handplockade fruktkorgar direkt till kontoret varje vecka. Sedan 2021 har vi hjälpt över 150 företag att öka välmående och produktivitet.',
        keywords: 'fruktkorgar på jobbet, fruktkorgar stockholm, fruktkorg, fruktkorg på kontoret, frukt till företag, kontorsfrukt, företagsfrukt, vitaminkorgen'
      },
      products: {
        title: 'Produkter - Fruktkorgar och Kontorsprodukter | Vitaminkorgen',
        description: 'Upptäck vårt sortiment av färska fruktkorgar, drycker och snacks för kontoret. Premium kvalitet levererad direkt till ert företag i Stockholm.',
        keywords: 'fruktkorgar sortiment, kontorsprodukter, premium fruktkorgar, företagsfrukt stockholm, kontorstillbehör'
      },
      contact: {
        title: 'Kontakt - Få offert på fruktkorgar | Vitaminkorgen Stockholm',
        description: 'Kontakta oss för personlig offert på fruktkorgar till ert kontor. Gratis leverans i Stockholm. Ring 08-123-45-67 eller fyll i vårt kontaktformulär.',
        keywords: 'kontakt vitaminkorgen, offert fruktkorgar, fruktkorgar stockholm kontakt, företagsfrukt offert'
      },
      about: {
        title: 'Om Oss - Stockholms ledande leverantör av fruktkorgar | Vitaminkorgen',
        description: 'Sedan 2021 har Vitaminkorgen varit Stockholms pålitliga partner för kontorsfrukt. Över 150 nöjda företagskunder och tusentals levererade fruktkorgar.',
        keywords: 'om vitaminkorgen, fruktkorgar stockholm historia, kontorsfrukt leverantör, företagsfrukt stockholm'
      }
    };
    return defaults[type] || defaults.homepage;
  };

  const defaultSEO = getDefaultSEO();
  const finalTitle = title || defaultSEO.title;
  const finalDescription = description || defaultSEO.description;
  const finalKeywords = keywords || defaultSEO.keywords;

  useEffect(() => {
    // Update document title
    document.title = finalTitle;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', finalDescription);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', finalDescription);
      document.head.appendChild(metaDescription);
    }
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', finalKeywords);
    } else {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      metaKeywords.setAttribute('content', finalKeywords);
      document.head.appendChild(metaKeywords);
    }

    // Update Open Graph tags
    const ogTags = [
      { property: 'og:title', content: finalTitle },
      { property: 'og:description', content: finalDescription },
      { property: 'og:url', content: fullUrl },
      { property: 'og:image', content: `${baseUrl}${image}` },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Vitaminkorgen' },
      { property: 'og:locale', content: 'sv_SE' }
    ];

    ogTags.forEach(({ property, content }) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (ogTag) {
        ogTag.setAttribute('content', content);
      } else {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', property);
        ogTag.setAttribute('content', content);
        document.head.appendChild(ogTag);
      }
    });

    // Update Twitter Card tags
    const twitterTags = [
      { name: 'twitter:title', content: finalTitle },
      { name: 'twitter:description', content: finalDescription },
      { name: 'twitter:image', content: `${baseUrl}${image}` },
      { name: 'twitter:card', content: 'summary_large_image' }
    ];

    twitterTags.forEach(({ name, content }) => {
      let twitterTag = document.querySelector(`meta[name="${name}"]`);
      if (twitterTag) {
        twitterTag.setAttribute('content', content);
      } else {
        twitterTag = document.createElement('meta');
        twitterTag.setAttribute('name', name);
        twitterTag.setAttribute('content', content);
        document.head.appendChild(twitterTag);
      }
    });

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', fullUrl);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', fullUrl);
      document.head.appendChild(canonical);
    }

    // Handle noindex
    let robotsTag = document.querySelector('meta[name="robots"]');
    if (noindex) {
      if (robotsTag) {
        robotsTag.setAttribute('content', 'noindex, nofollow');
      } else {
        robotsTag = document.createElement('meta');
        robotsTag.setAttribute('name', 'robots');
        robotsTag.setAttribute('content', 'noindex, nofollow');
        document.head.appendChild(robotsTag);
      }
    } else {
      if (robotsTag) {
        robotsTag.setAttribute('content', 'index, follow');
      }
    }
  }, [finalTitle, finalDescription, finalKeywords, fullUrl, image, noindex]);

  return <StructuredData type={type} />;
};

export default SEOHead;