import { Link } from "@/lib/router-compat";
import { Truck, MapPin } from "lucide-react";

/** Homepage block pointing to the two main service hubs. */
const HomeHubLinks = () => (
  <section className="py-12 md:py-16 bg-white" aria-labelledby="hubs-heading">
    <div className="container mx-auto px-6 max-w-5xl">
      <h2 id="hubs-heading" className="text-2xl md:text-3xl font-bold text-center text-green-900 mb-8">
        Fruktleverans i Stockholm, Södertälje och Uppsala
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Link to="/fruktkorg-stockholm" className="block bg-green-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
          <MapPin className="h-6 w-6 text-green-700 mb-2" aria-hidden="true" />
          <h3 className="text-xl font-bold text-green-900 mb-1">Fruktkorg Stockholm</h3>
          <p className="text-gray-700">Priser för 4, 6, 9 och 11 kg, leveransområden och vanliga frågor.</p>
        </Link>
        <Link to="/fruktbud-stockholm" className="block bg-green-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
          <Truck className="h-6 w-6 text-green-700 mb-2" aria-hidden="true" />
          <h3 className="text-xl font-bold text-green-900 mb-1">Fruktbud Stockholm</h3>
          <p className="text-gray-700">Så fungerar vår veckoleverans av frukt till kontoret, måndag–fredag.</p>
        </Link>
      </div>
    </div>
  </section>
);

export default HomeHubLinks;
