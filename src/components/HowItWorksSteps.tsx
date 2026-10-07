import { Link } from "@/lib/router-compat";
import { Button } from "@/components/ui/button";

const steps = [
  { n: 1, title: "Välj korg och storlek", text: "Original, Premium eller Banan i 4, 6, 9 eller 11 kg – efter hur många ni är på kontoret." },
  { n: 2, title: "Välj leveransdag", text: "Vi levererar måndag–fredag till den plats ni önskar. Första leveransen sker normalt inom 3–5 vardagar." },
  { n: 3, title: "Vi levererar – ni får månadsfaktura", text: "Fri leverans varje vecka och en samlad faktura per månad. Ändra eller pausa enkelt." },
];

const HowItWorksSteps = ({ heading = "Så går det till" }: { heading?: string }) => (
  <section className="py-16 md:py-20 bg-green-50" aria-labelledby="how-heading">
    <div className="container mx-auto px-6 max-w-5xl">
      <h2 id="how-heading" className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-10">{heading}</h2>
      <ol className="grid md:grid-cols-3 gap-6">
        {steps.map((s) => (
          <li key={s.n} className="bg-white rounded-2xl p-6 shadow-md">
            <div className="h-10 w-10 rounded-full bg-yellow-400 text-green-900 font-bold flex items-center justify-center mb-4">{s.n}</div>
            <h3 className="text-xl font-bold text-green-900 mb-2">{s.title}</h3>
            <p className="text-gray-700">{s.text}</p>
          </li>
        ))}
      </ol>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
        <Link to="/kontakt"><Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold">Begär gratis offert</Button></Link>
        <Link to="/provkorg"><Button size="lg" variant="outline" className="border-green-700 text-green-800">Beställ gratis provkorg</Button></Link>
      </div>
    </div>
  </section>
);

export default HowItWorksSteps;
