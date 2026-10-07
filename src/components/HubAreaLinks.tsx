import { Link } from "@/lib/router-compat";
import { MapPin } from "lucide-react";
import { areas, PRIORITY_AREA_SLUGS } from "@/data/areas";

const HubAreaLinks = () => {
  const list = PRIORITY_AREA_SLUGS.map((s) => areas.find((a) => a.slug === s)).filter(
    (a): a is (typeof areas)[number] => !!a,
  );
  return (
    <section className="py-12 md:py-16" aria-labelledby="areas-heading">
      <div className="container mx-auto px-6 max-w-5xl text-center">
        <h2 id="areas-heading" className="text-2xl md:text-3xl font-bold text-green-900 mb-3">Leveransområden i Stockholm</h2>
        <p className="text-gray-600 mb-6">Fri leverans i hela Stockholm, Södertälje och Uppsala. Läs mer om fruktkorgar i ert område:</p>
        <ul className="flex flex-wrap justify-center gap-3">
          {list.map((a) => (
            <li key={a.slug}>
              <Link to={`/fruktkorg/${a.slug}`} className="inline-flex items-center gap-1 bg-white border border-green-200 rounded-full px-4 py-2 text-green-800 hover:bg-green-50">
                <MapPin className="h-4 w-4" aria-hidden="true" /> Fruktkorg {a.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HubAreaLinks;
