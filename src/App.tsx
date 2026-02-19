
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { PublicCartProvider } from "@/contexts/PublicCartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminAuthProvider } from "@/admin/contexts/AdminAuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminProtectedRoute from "@/admin/components/AdminProtectedRoute";
import CookieConsent from "@/components/CookieConsent";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import AccessibilityEnhancer from "@/components/AccessibilityEnhancer";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import CustomerPortal from "./pages/CustomerPortal";
import QuoteRequest from "./pages/QuoteRequest";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import Terms from "./pages/Terms";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import BlogHome from "./pages/BlogHome";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import LegacyBlogRedirect from "./pages/LegacyBlogRedirect";
import Blommor from "./pages/Blommor";
import Varuautomat from "./pages/Varuautomat";
import FruktkorgStockholm from "./pages/FruktkorgStockholm";
import FruktkorgForetag from "./pages/FruktkorgForetag";
import FruktkorgPaJobbet from "./pages/FruktkorgPaJobbet";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
    <AuthProvider>
      <AdminAuthProvider>
        <PublicCartProvider>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <PerformanceMonitor />
              <BrowserRouter>
              <ScrollToTop />
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
                <Route path="/fruktkorg-stockholm" element={<FruktkorgStockholm />} />
                <Route path="/fruktkorg-foretag" element={<FruktkorgForetag />} />
                <Route path="/fruktkorg-pa-jobbet" element={<FruktkorgPaJobbet />} />
                
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
              <CookieConsent />
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </PublicCartProvider>
      </AdminAuthProvider>
    </AuthProvider>
    </ErrorBoundary>
  </QueryClientProvider>
);

export default App;
