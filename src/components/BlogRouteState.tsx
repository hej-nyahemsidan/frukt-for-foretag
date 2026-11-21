import { Link, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export function BlogNotFound() {
  return <><Header /><main className="container mx-auto px-4 py-16 text-center"><h1 className="text-3xl font-bold mb-4">Inlägget hittades inte</h1><Button asChild><Link to="/blogg">Tillbaka till bloggen</Link></Button></main><Footer /></>;
}

export function BlogLoadError() {
  const router = useRouter();
  return <><Header /><main className="container mx-auto px-4 py-16 text-center" role="alert"><h1 className="text-3xl font-bold mb-4">Bloggen kunde inte laddas</h1><p className="mb-6">Försök igen om en stund.</p><Button onClick={() => { void router.invalidate(); }}>Försök igen</Button></main><Footer /></>;
}