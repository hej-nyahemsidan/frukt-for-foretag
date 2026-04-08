import mentimeterLogo from '@/assets/logos/mentimeter.png';
import viasalesLogo from '@/assets/logos/viasales.png';
import isalesLogo from '@/assets/logos/isales.png';
import riserankLogo from '@/assets/logos/riserank.png';
import alfaluxLogo from '@/assets/logos/alfalux.png';
import mecaLogo from '@/assets/logos/meca.png';
import coffeumLogo from '@/assets/logos/coffeum.png';

const clients = [
  { name: 'Mentimeter', logo: mentimeterLogo, url: 'https://www.mentimeter.com' },
  { name: 'ViaSales', logo: viasalesLogo, url: 'https://www.viasales.com' },
  { name: 'iSales', logo: isalesLogo, url: 'https://isales.se' },
  { name: 'RiseRank', logo: riserankLogo, url: 'https://www.riserank.com' },
  { name: 'Alfalux', logo: alfaluxLogo, url: 'https://alfalux.se' },
  { name: 'MECA', logo: mecaLogo, url: 'https://www.meca.se' },
  { name: 'Coffeum', logo: coffeumLogo, url: 'https://www.coffeum.se' },
];

const TrustedBySection = () => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest mb-8">
          Företag som valt Vitaminkorgen
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
          {clients.map((client) => (
            <a
              key={client.name}
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-50 hover:opacity-100 transition-opacity duration-300"
            >
              <img
                src={client.logo}
                alt={`${client.name} logotyp`}
                loading="lazy"
                width={512}
                height={512}
                className="h-12 md:h-16 w-auto object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
