import { Suspense, lazy, useEffect, type ReactNode } from "react";
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { HelmetProvider } from "react-helmet-async";

import appCss from "../styles.css?url";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import { PublicCartProvider } from "@/contexts/PublicCartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminAuthProvider } from "@/admin/contexts/AdminAuthContext";
import { ResellerAuthProvider } from "@/reseller/contexts/ResellerAuthContext";
import { ResellerCustomerAuthProvider } from "@/reseller/contexts/ResellerCustomerAuthContext";
import CookieConsent from "@/components/CookieConsent";
import ErrorBoundary from "@/components/ErrorBoundary";
import ScrollToTop from "@/components/ScrollToTop";
import NotFound from "@/pages/NotFound";
import { reportLovableError } from "@/lib/lovable-error-reporting";

const ExitIntentPopup = lazy(() => import("@/components/ExitIntentPopup"));

const SITE_TITLE = "Fruktkorg på jobbet Stockholm | Vitaminkorgen";
const SITE_DESCRIPTION =
  "Färska fruktkorgar levererade till kontoret i Stockholm. Gratis leverans, flexibla abonnemang. 150+ företag litar på oss sedan 2021.";

// Google Tag Manager + Analytics + Tidio: deferred to after page load or first interaction (performance)
const THIRD_PARTY_LOADER = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-JZJV317Q2E');
(function () {
  var loaded = false;
  function inject(src) {
    var s = document.createElement('script');
    s.src = src;
    s.async = true;
    document.head.appendChild(s);
  }
  var tidioLoaded = false;
  function loadTidio() {
    if (tidioLoaded) return;
    tidioLoaded = true;
    inject('https://code.tidio.co/ffjk1fjdgbfkvm0p9chrzcceqng2n1zk.js');
  }
  function loadThirdParty() {
    if (loaded) return;
    loaded = true;
    window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
    inject('https://www.googletagmanager.com/gtm.js?id=GTM-56Z5QZHQ');
    inject('https://www.googletagmanager.com/gtag/js?id=G-JZJV317Q2E');
  }
  window.addEventListener('load', function () {
    setTimeout(loadThirdParty, 3500);
    setTimeout(loadTidio, 6000);
  });
  ['pointerdown', 'keydown', 'touchstart', 'scroll'].forEach(function (evt) {
    window.addEventListener(evt, function () { loadThirdParty(); loadTidio(); }, { once: true, passive: true });
  });
})();
`;

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://vitaminkorgen.se/#organization",
      name: "Vitaminkorgen AB",
      alternateName: "Vitaminkorgen",
      url: "https://vitaminkorgen.se/",
      logo: "https://vitaminkorgen.se/opengraph-image.png",
      image: "https://vitaminkorgen.se/opengraph-image.png",
      description:
        "Vitaminkorgen levererar färska fruktkorgar och fruktlådor till företag och kontor i Stockholm, Södertälje och Uppsala.",
      email: "info@vitaminkorgen.se",
      telephone: "+46101839836",
      foundingDate: "2021",
      areaServed: [
        { "@type": "City", name: "Stockholm" },
        { "@type": "City", name: "Södertälje" },
        { "@type": "City", name: "Uppsala" },
      ],
      address: { "@type": "PostalAddress", addressLocality: "Stockholm", addressCountry: "SE" },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+46101839836",
        contactType: "customer service",
        areaServed: "SE",
        availableLanguage: ["Swedish", "English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://vitaminkorgen.se/#website",
      url: "https://vitaminkorgen.se/",
      name: "Vitaminkorgen",
      inLanguage: "sv-SE",
      publisher: { "@id": "https://vitaminkorgen.se/#organization" },
    },
  ],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { httpEquiv: "X-Content-Type-Options", content: "nosniff" },
      { name: "google-site-verification", content: "3SrrgJPyzJjimRlKkyreCjVOkSsJYUbI7KxNfxH83RQ" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "author", content: "Vitaminkorgen AB" },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://vitaminkorgen.se/opengraph-image.png" },
      { property: "og:site_name", content: "Vitaminkorgen" },
      { property: "og:locale", content: "sv_SE" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "twitter:image", content: "https://vitaminkorgen.se/opengraph-image.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico?v=7" },
      { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon.png?v=7" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon.png?v=7" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon.png?v=7" },
      { rel: "shortcut icon", href: "/favicon.ico?v=7" },
      { rel: "apple-touch-icon", href: "/favicon.png?v=7" },
      { rel: "preconnect", href: "https://www.googletagmanager.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://www.google-analytics.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://code.tidio.co", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://ad.doubleclick.net" },
      { rel: "dns-prefetch", href: "https://googleads.g.doubleclick.net" },
    ],
    scripts: [
      { children: THIRD_PARTY_LOADER },
      { type: "application/ld+json", children: JSON.stringify(ORGANIZATION_JSON_LD) },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: RootErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-56Z5QZHQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

// Minimal loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <AuthProvider>
            <AdminAuthProvider>
              <ResellerAuthProvider>
                <ResellerCustomerAuthProvider>
                  <PublicCartProvider>
                    <CartProvider>
                      <TooltipProvider>
                        <Toaster />
                        <Sonner />
                        <ScrollToTop />
                        <Suspense fallback={<PageLoader />}>
                          <Outlet />
                        </Suspense>
                        <CookieConsent />
                        <Suspense fallback={null}>
                          <ExitIntentPopup />
                        </Suspense>
                      </TooltipProvider>
                    </CartProvider>
                  </PublicCartProvider>
                </ResellerCustomerAuthProvider>
              </ResellerAuthProvider>
            </AdminAuthProvider>
          </AuthProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

function RootErrorComponent({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold mb-2">This page didn't load</h1>
        <p className="text-muted-foreground mb-6">
          Något gick fel. Försök igen eller gå tillbaka till startsidan.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground"
            onClick={() => {
              void router.invalidate();
              reset();
            }}
          >
            Try again
          </button>
          <Link to="/" className="px-4 py-2 rounded-md border border-border">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
