import { Link } from 'react-router-dom';
import { Phone, FileText } from 'lucide-react';

/**
 * Sticky bottom bar on mobile with the two highest-intent actions:
 * request a free quote, or call directly.
 */
const MobileCtaBar = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-[0_-4px_20px_-6px_rgba(0,0,0,0.2)]">
      <div className="flex items-stretch gap-2 px-3 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
        <Link
          to="/kontakt"
          className="flex-1 flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-base font-bold text-primary-foreground"
        >
          <FileText className="h-5 w-5" aria-hidden="true" />
          Begär gratis offert
        </Link>
        <a
          href="tel:+4610183 98 36"
          aria-label="Ring oss på 010-183 98 36"
          className="flex items-center justify-center gap-2 rounded-full border-2 border-primary/40 px-4 py-3 text-base font-bold text-primary"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          Ring
        </a>
      </div>
    </div>
  );
};

export default MobileCtaBar;
