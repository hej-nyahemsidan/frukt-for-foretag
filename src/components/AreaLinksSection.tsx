
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { areas } from '@/data/areas';

const featuredAreas = [
  'stockholm', 'sodermalm', 'ostermalm', 'kungsholmen', 'solna', 
  'sundbyberg', 'nacka', 'bromma', 'hammarby-sjostad', 'taby',
  'huddinge', 'haninge'
];

const AreaLinksSection = () => {
  const featured = areas.filter(a => featuredAreas.includes(a.slug));
  const remaining = areas.filter(a => !featuredAreas.includes(a.slug));

  return (
    <section className="py-16 bg-green-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-3">
          Fruktkorgar till kontor i hela Stockholm
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Vi levererar färska fruktkorgar till företag i över 35 områden i Stockholmsregionen – alltid med fri leverans.
        </p>

        {/* Featured areas as cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
          {featured.map(area => (
            <Link
              key={area.slug}
              to={`/fruktkorg/${area.slug}`}
              className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl text-sm font-medium text-green-800 hover:bg-green-100 hover:shadow-md transition-all shadow-sm border border-green-100"
            >
              <MapPin className="h-4 w-4 text-green-600 flex-shrink-0" />
              <span>Fruktkorg {area.name}</span>
            </Link>
          ))}
        </div>

        {/* Remaining areas as text links */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
          {remaining.map(area => (
            <Link
              key={area.slug}
              to={`/fruktkorg/${area.slug}`}
              className="text-green-700 hover:text-green-900 hover:underline transition-colors"
            >
              Fruktkorg {area.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AreaLinksSection;
