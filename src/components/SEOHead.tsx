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
        title: 'Fruktkorg på jobbet Stockholm | Fruktkorgar till kontoret - Vitaminkorgen',
        description: 'Fruktkorg på jobbet Stockholm ✓ Vi levererar färska fruktkorgar direkt till ert kontor. Fruktkorgar Stockholm med gratis leverans. Sedan 2021 har vi hjälpt 150+ företag.',
        keywords: 'fruktkorg på jobbet stockholm, fruktkorgar stockholm, fruktkorg stockholm, frukt på jobbet, fruktkorgar till jobbet, fruktkorgar på kontoret, kontorsfrukt stockholm, företagsfrukt'
      },
      products: {
        title: 'Produkter - Fruktkorgar till jobbet och Kontorsprodukter | Vitaminkorgen',
        description: 'Upptäck vårt sortiment av färska fruktkorgar på jobbet, drycker och snacks för kontoret. Premium fruktkorgar Stockholm levererad direkt till ert företag.',
        keywords: 'fruktkorgar, frukt på jobbet, fruktkorgar till jobbet, fruktkorgar sortiment, kontorsprodukter, premium fruktkorgar, företagsfrukt stockholm'
      },
      contact: {
        title: 'Kontakt - Få offert på fruktkorgar till jobbet | Vitaminkorgen Stockholm',
        description: 'Kontakta oss för personlig offert på fruktkorgar till ert kontor. Frukt på jobbet Stockholm - Gratis leverans. Ring 010-183 98 36 eller fyll i vårt kontaktformulär.',
        keywords: 'kontakt vitaminkorgen, offert fruktkorgar, fruktkorgar till jobbet, frukt på jobbet stockholm, fruktkorgar stockholm kontakt, företagsfrukt offert'
      },
      about: {
        title: 'Om Oss - Leverantör av fruktkorgar på jobbet i Stockholm | Vitaminkorgen',
        description: 'Sedan 2021 har Vitaminkorgen varit Stockholms pålitliga partner för frukt på jobbet. Över 150 nöjda företagskunder och tusentals levererade fruktkorgar till jobbet.',
        keywords: 'om vitaminkorgen, fruktkorgar stockholm, frukt på jobbet, fruktkorgar till jobbet, kontorsfrukt leverantör, företagsfrukt stockholm'
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