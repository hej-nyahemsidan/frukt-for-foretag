
import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { PublicCartProvider } from "@/contexts/PublicCartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminAuthProvider } from "@/admin/contexts/AdminAuthContext";
import { ResellerAuthProvider } from "@/reseller/contexts/ResellerAuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminProtectedRoute from "@/admin/components/AdminProtectedRoute";
import ResellerProtectedRoute from "@/reseller/components/ResellerProtectedRoute";
import CookieConsent from "@/components/CookieConsent";
import ErrorBoundary from "@/components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";

// Eagerly load the homepage for fastest initial render
import Index from "./pages/Index";

// Lazy load all other pages - only loaded when navigated to
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Products = lazy(() => import("./pages/Products"));
const CustomerPortal = lazy(() => import("./pages/CustomerPortal"));
const QuoteRequest = lazy(() => import("./pages/QuoteRequest"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const Checkout = lazy(() => import("./pages/Checkout"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CustomerDashboard = lazy(() => import("./pages/CustomerDashboard"));
const AdminLogin = lazy(() => import("./admin/pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./admin/pages/AdminDashboard"));
const BlogHome = lazy(() => import("./pages/BlogHome"));
const BlogList = lazy(() => import("./pages/BlogList"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const LegacyBlogRedirect = lazy(() => import("./pages/LegacyBlogRedirect"));
const Blommor = lazy(() => import("./pages/Blommor"));
const Varuautomat = lazy(() => import("./pages/Varuautomat"));
const FruktkorgStockholm = lazy(() => import("./pages/FruktkorgStockholm"));
const FruktkorgForetag = lazy(() => import("./pages/FruktkorgForetag"));
const FruktkorgPaJobbet = lazy(() => import("./pages/FruktkorgPaJobbet"));
const AreaLanding = lazy(() => import("./pages/AreaLanding"));
const ResellerLogin = lazy(() => import("./reseller/pages/ResellerLogin"));
const ResellerDashboard = lazy(() => import("./reseller/pages/ResellerDashboard"));
const ExitIntentPopup = lazy(() => import("./components/ExitIntentPopup"));

const queryClient = new QueryClient();

// Minimal loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
    <AuthProvider>
      <AdminAuthProvider>
        <ResellerAuthProvider>
        <PublicCartProvider>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
              <ScrollToTop />
              <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/produkter" element={<Products />} />
                <Route path="/om-oss" element={<About />} />
                <Route path="/kontakt" element={<Contact />} />
                <Route path="/kundportal" element={<CustomerPortal />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <CustomerDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/mina-sidor" element={
                  <ProtectedRoute>
                    <CustomerDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/offertforfragan" element={<QuoteRequest />} />
                <Route path="/integritetspolicy" element={<PrivacyPolicy />} />
                <Route path="/cookiepolicy" element={<CookiePolicy />} />
                <Route path="/villkor" element={<Terms />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/blogg" element={<BlogHome />} />
                <Route path="/blogg/:category" element={<BlogList />} />
                <Route path="/blogg/:category/:slug" element={<BlogPost />} />
                {/* Legacy URL support */}
                <Route path="/blog/:slug" element={<LegacyBlogRedirect />} />
                <Route path="/blommor" element={<Blommor />} />
                <Route path="/varuautomat" element={<Varuautomat />} />
                {/* Redirect old URLs to prevent duplicate indexing */}
                <Route path="/varuautomater-kaffemaskin" element={<VaruautomatRedirect />} />
                <Route path="/fruktkorg-stockholm" element={<FruktkorgStockholm />} />
                <Route path="/fruktkorg-foretag" element={<FruktkorgForetag />} />
                <Route path="/fruktkorg-pa-jobbet" element={<FruktkorgPaJobbet />} />
                <Route path="/fruktkorg/:area" element={<AreaLanding />} />
                
                {/* Reseller Routes */}
                <Route path="/af/login" element={<ResellerLogin />} />
                <Route path="/af" element={
                  <ResellerProtectedRoute>
                    <ResellerDashboard />
                  </ResellerProtectedRoute>
                } />
                <Route path="/af/dashboard" element={
                  <ResellerProtectedRoute>
                    <ResellerDashboard />
                  </ResellerProtectedRoute>
                } />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={
                  <AdminProtectedRoute>
                    <AdminDashboard />
                  </AdminProtectedRoute>
                } />
                <Route path="/admin/dashboard" element={
                  <AdminProtectedRoute>
                    <AdminDashboard />
                  </AdminProtectedRoute>
                } />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              </Suspense>
              <CookieConsent />
              <Suspense fallback={null}>
                <ExitIntentPopup />
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </PublicCartProvider>
      </ResellerAuthProvider>
      </AdminAuthProvider>
    </AuthProvider>
    </ErrorBoundary>
  </QueryClientProvider>
);

export default App;
