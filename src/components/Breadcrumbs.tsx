import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Accessible breadcrumb navigation that also emits a JSON-LD BreadcrumbList
 * schema for Google rich results. Always include "Hem" as the implicit root –
 * pass items starting from the next level (e.g. [{label:"Blogg",href:"/blogg"},
 * {label:"Tips",href:"/blogg/tips"},{label:postTitle}]).
 */
const Breadcrumbs = ({ items, className = "" }: BreadcrumbsProps) => {
  const baseUrl = "https://vitaminkorgen.se";

  const all: BreadcrumbItem[] = [{ label: "Hem", href: "/" }, ...items];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${baseUrl}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav
        aria-label="Brödsmulor"
        className={`flex items-center text-sm text-muted-foreground mb-6 ${className}`}
      >
        <ol className="flex flex-wrap items-center gap-1">
          {all.map((item, index) => {
            const isLast = index === all.length - 1;
            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-1">
                {index > 0 && (
                  <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                )}
                {isLast || !item.href ? (
                  <span
                    className="text-foreground font-medium line-clamp-1"
                    aria-current={isLast ? "page" : undefined}
                  >
                    {index === 0 ? (
                      <Home className="h-3.5 w-3.5 inline" aria-label="Hem" />
                    ) : (
                      item.label
                    )}
                  </span>
                ) : (
                  <Link
                    to={item.href}
                    className="hover:text-primary hover:underline transition-colors"
                  >
                    {index === 0 ? (
                      <Home className="h-3.5 w-3.5 inline" aria-label="Hem" />
                    ) : (
                      item.label
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;