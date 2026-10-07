import { useLocation } from "@/lib/router-compat";
import Breadcrumbs, { type BreadcrumbItem } from "@/components/Breadcrumbs";
import { STATIC_SEO } from "@/lib/seo";
import { getAreaBySlug } from "@/data/areas";
import { getCompanySizeBySlug } from "@/data/companySizes";
import { fruktkorgProducts } from "@/data/fruktkorg-products";

/** Site-wide breadcrumbs for sub pages; blog pages render their own. */
function crumbsFor(path: string): BreadcrumbItem[] | null {
  if (path === "/" || path.startsWith("/blogg") || path.startsWith("/admin") || path.startsWith("/af")) return null;
  const s = STATIC_SEO[path];
  if (s) return s.noindex || !s.crumb ? null : [{ label: s.crumb }];
  const parts = path.split("/").filter(Boolean);
  if (parts[0] === "fruktkorg" && parts[1] === "anstallda" && parts[2]) {
    const c = getCompanySizeBySlug(parts[2]);
    return [{ label: "Fruktkorg Stockholm", href: "/fruktkorg-stockholm" }, { label: c?.label ?? parts[2] }];
  }
  if (parts[0] === "fruktkorg" && parts[1]) {
    const a = getAreaBySlug(parts[1]);
    return [{ label: "Fruktkorg Stockholm", href: "/fruktkorg-stockholm" }, { label: `Fruktkorg ${a?.name ?? parts[1]}` }];
  }
  if (parts[0] === "produkt" && parts[1]) {
    const p = fruktkorgProducts.find((x) => x.slug === parts[1]);
    return [{ label: "Produkter", href: "/produkter" }, { label: p?.name ?? parts[1] }];
  }
  if (parts[0] === "jamfor") return [{ label: "Jämförelse" }];
  return null;
}

const AutoBreadcrumbs = () => {
  const { pathname } = useLocation();
  const items = crumbsFor(pathname.replace(/\/$/, "") || "/");
  if (!items) return null;
  return (
    <div className="container mx-auto px-6 pt-3">
      <Breadcrumbs items={items} />
    </div>
  );
};

export default AutoBreadcrumbs;
